# Strapi v4 集成手册（MiniMaxCode Website）

面向：将 Strapi v4 作为当前 React + Vite 项目的 Headless CMS，管理博客/新闻等内容。
目标：本周准备、下周按清单实施；小流量、先用本地磁盘，后续可平滑切到对象存储。

---

## 1. 架构与仓库策略
- 独立部署是必须：Strapi 需要持久化存储与长生命周期进程，不适合直接跑在 Vercel。
- 仓库形态：
  - 推荐 monorepo 管理（便于统一脚本与 .env 模板），部署仍然各自独立。
  - 也可前后端分仓（团队/权限强隔离时）。

示例目录（monorepo）：
```
minimaxcode-website/
├─ apps/
│  ├─ web/            # 现有前端（Vite + React）
│  └─ cms/            # Strapi v4（独立部署）
└─ docs/              # 文档
```

## 2. 部署与环境约定
- CMS 域名（示例）：`https://cms.example.com`（生产），`http://localhost:1337`（本地）。
- 部署目标：
  - 本地/开发：Node 18+、SQLite/Postgres 任一均可。
  - 生产：VPS/Render/Railway 其一，建议 Postgres + 本地上传（`public/uploads`）。
- 数据库：Postgres（生产），SQLite（开发可用）。
- 存储策略：
  - 现阶段：本地磁盘（最省成本）。
  - 备份：建议 rclone 定时同步到 Cloudflare R2（成本极低，几毛~几美元/月级）。
  - 将来可切换到 S3/R2/Cloudinary，无需改前端。

## 3. Strapi 初始化
在项目根或 `apps/` 下创建 CMS：
```bash
cd apps
npx create-strapi-app@latest cms --quickstart
# 或：npx create-strapi-app@latest cms --no-run
```
首次启动按提示注册管理员账号（仅后台用）。

### 3.1 生产配置（关键文件）
- `config/server.js`
```js
module.exports = ({ env }) => ({
  url: env('PUBLIC_URL', 'https://cms.example.com'),
  proxy: true,
  app: { keys: env.array('APP_KEYS') },
});
```
- `config/database.js`（Postgres）
```js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```
- `config/middlewares.js`（CORS + 安全）
```js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://minimaxcode.com', 'http://localhost:5173'],
      methods: ['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'],
      headers: ['Content-Type','Authorization','Origin','Accept'],
    },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```
- `config/plugins.js`（上传 provider）
  - 本地磁盘（默认）：
  ```js
  module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'local',
        providerOptions: {
          sizeLimit: 10 * 1024 * 1024, // 10MB 示例
        },
      },
    },
  });
  ```
  - 可选：Cloudinary（后续平滑切换）
  ```js
  module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: '@strapi/provider-upload-cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: { upload: {}, delete: {} },
      },
    },
  });
  ```

### 3.2 Docker（可选）
`docker-compose.yml`（最简示例）
```yaml
services:
  cms:
    image: node:18
    working_dir: /srv/app
    volumes:
      - ./apps/cms:/srv/app
      - ./apps/cms/.cache:/srv/app/.cache
      - ./apps/cms/public/uploads:/srv/app/public/uploads
    command: sh -c "yarn install && yarn build && yarn start"
    environment:
      NODE_ENV: production
      PUBLIC_URL: https://cms.example.com
      DATABASE_CLIENT: postgres
      DATABASE_HOST: db
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
      APP_KEYS: key1,key2,key3,key4
      API_TOKEN_SALT: some_salt
      ADMIN_JWT_SECRET: some_secret
      JWT_SECRET: some_secret
    depends_on:
      - db
    ports:
      - "1337:1337"
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    ports:
      - "5432:5432"
```

## 4. 内容模型与多语言
启用插件：`i18n`（Languages：`ja`、`en`）。

建议 Collection Types：
- Post（文章）
  - title（String）
  - slug（UID，基于 title，唯一）
  - excerpt（Text）
  - coverImage（Media，单图）
  - content（Rich Text；如偏 Markdown，可装 `@strapi/plugin-ckeditor` 或选择 Markdown 组件）
  - publishedAt（DateTime）
  - seo: metaTitle / metaDescription（可用 `@strapi/plugin-seo` 或自定义 Component）
  - relations：category（1）、tags（多）、author（1）
  - 本地化：开启（ja/en 各自维护标题/slug/正文）
- Category（分类）：name、slug、本地化开启
- Tag（标签）：name、slug，本地化可选
- Author（作者）：name、avatar、bio

## 5. 权限与安全
- 角色（Public）：只开放 `post.find`、`post.findOne`、`category.find`（必要时）。严禁写接口对 Public 开放。
- 预览/草稿：如需读取草稿，使用 API Token 走服务端代理（不可在前端暴露 Token）。
- CORS：仅允许你的前端域名（见上 `middlewares`）。
- 上传限制：`maxFileSize` 与 MIME 白名单；如开放用户上传，务必鉴权。

## 6. 前端集成（apps/web）
### 6.1 环境变量
`.env`（开发） / Vercel 环境变量（生产）：
```
VITE_STRAPI_URL=https://cms.example.com
```

### 6.2 API 访问封装（示例）
```ts
// src/lib/strapi.ts
const BASE = import.meta.env.VITE_STRAPI_URL;

export async function fetchPosts({ page = 1, pageSize = 10, locale = 'ja' } = {}) {
  const url = new URL(`${BASE}/api/posts`);
  url.searchParams.set('populate', 'coverImage,category,tags');
  url.searchParams.set('sort', 'publishedAt:desc');
  url.searchParams.set('pagination[page]', String(page));
  url.searchParams.set('pagination[pageSize]', String(pageSize));
  url.searchParams.set('locale', locale);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPostBySlug(slug: string, locale = 'ja') {
  const url = new URL(`${BASE}/api/posts`);
  url.searchParams.set('filters[slug][$eq]', slug);
  url.searchParams.set('populate', 'coverImage,category,tags');
  url.searchParams.set('locale', locale);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch post');
  const data = await res.json();
  return data?.data?.[0] || null;
}
```

### 6.3 路由与国际化
- 新增页面：`/news`（列表）、`/news/:slug`（详情）。
- locale：从 `i18n.language` 读取并传给 Strapi 的 `locale` 查询参数。
- 富文本：Rich Text → 安全渲染（DOMPurify）；Markdown → `remark`/`rehype` 转换。

## 7. 静态资源与缓存
- 现阶段：直接由 Strapi 提供 `/uploads/*` 静态文件即可。
- 推荐：在 CMS 前加 Nginx/Caddy，针对 `/uploads/*` 设置强缓存（例如 30 天），并接入 Cloudflare 免费 CDN：
```nginx
location /uploads/ {
  expires 30d;
  add_header Cache-Control "public, immutable";
  try_files $uri @strapi;
}
location @strapi { proxy_pass http://cms:1337; }
```

## 8. 备份（本地→R2，建议）
- R2 计费低：存储 ~$0.015/GB·月，请求费用低，CDN 命中 egress $0。
- rclone 同步示例（日增量、周全量均可）：
```bash
# 首次配置：rclone config
# 同步 uploads 目录
rclone sync /srv/app/public/uploads r2:my-bucket/uploads \
  --fast-list --checksum --transfers=8 --checkers=8
# 同步 Postgres 备份（按你的备份目录）
rclone sync /backups/postgres r2:my-bucket/db-backups \
  --fast-list --transfers=4 --checkers=4
```
- R2 生命周期：保留最近 7/30 天版本，自动清理旧版本降低成本。

## 9. SEO 与发布联动
- 你的前端是 SPA，如需更强 SEO：
  - 选项 A：保留 SPA + 预渲染关键页面（Prerender/SSG）+ Webhook（Strapi 发布→触发 Vercel Hook 重新构建）。
  - 选项 B：长期考虑迁移到 SSR（如 Next.js），直接在服务端取 CMS 数据。

## 10. 安全基线与运维要点
- 不在前端暴露任何 Strapi Admin/API Token。
- 后台强密码 + 2FA（可选）+ 限制管理后台来源 IP（边缘层实现）。
- 定期升级 Strapi 与插件；开启最低必要权限。
- 观察指标：响应时间、5xx、磁盘占用、数据库连接数。

## 11. 实施清单（下周）
- 准备
  - [ ] 采购/准备一台运行 CMS 的环境（Render/Railway/VPS）
  - [ ] 申请子域 `cms.example.com` 并指向服务
  - [ ] 准备 Postgres 实例（或容器）
- CMS 初始化
  - [ ] 创建 Strapi 项目至 `apps/cms`
  - [ ] 配置 `server/database/middlewares/plugins`
  - [ ] 启用 `i18n`，设定 `ja/en`
  - [ ] 建立内容模型（Post/Category/Tag/Author）
  - [ ] 角色权限：Public 只读文章接口
- 部署
  - [ ] 构建并上线 CMS（生产）
  - [ ] 反向代理与缓存（可选）
  - [ ] 建立管理员账号与备份计划（rclone + R2 可后补）
- 前端接入
  - [ ] 配置 `VITE_STRAPI_URL`
  - [ ] 新增 `/news`、`/news/:slug` 页面并接入 API
  - [ ] 细化 UI/SEO（OG、面包屑、结构化数据可选）

## 12. 常见问题（FAQ）
- Q：小流量是否必须上对象存储？
  - A：否。先用本地磁盘 + CDN 缓存 + 定时备份即可。后期再迁移。
- Q：如何迁移到 S3/R2/Cloudinary？
  - A：换 `config/plugins.js` provider，拷贝 `public/uploads` 到新存储，校验 URL；短期保留旧路径兼容。
- Q：多实例扩容如何做？
  - A：迁移到对象存储；或使用共享卷（NFS/GlusterFS，不推荐互联网场景）。

---

如需，我可以在 `apps/web` 直接补一份 `src/lib/strapi.ts` 与两页路由的最小实现示例，便于你们本地联调。