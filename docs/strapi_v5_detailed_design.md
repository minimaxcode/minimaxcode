# Strapi v5 集成详细设计（MiniMaxCode Website）

本文档给出在现有 React + Vite + i18next 项目中集成 Strapi v5 的详细技术方案，覆盖架构、数据模型、接口规范、SDK 访问层、部署与备份、前端改造、i18n/SEO、监控安全及迭代计划。严格对齐《strapiv5集成规范.md》要求与官方文档（安装/配置/i18n/SDK/SEO）。配套参考：`docs/strapi_v5_integration.md`、`docs/monorepo_cms_member.md`、`docs/strapiv5集成规范.md`。

---

## 1. 目标与范围
- 目标：将博客/新闻等动态内容从代码内置转为 Headless CMS 管理；站点保持 SPA 架构，首期由前端在运行时向 CMS 拉取；后续支持 SSG/SSR。
- 范围：Strapi v5（内容模型与接口）、Web 前端（i18n 拉取、路由/列表/详情）、部署（单机或托管）、备份与监控、安全与权限。

## 2. 总体架构
- 仓库形态：推荐 monorepo（见《同机部署指南》），目录：
```
apps/
  web/        # 现有网站（Vite+React）
  cms/        # Strapi v5 服务（独立进程/容器）
packages/
  shared/     # 可选：共享类型/SDK
infra/        # Nginx/Compose/脚本
```
- 域名：`cms.example.com`（生产）/ `http://localhost:1337`（本地）。
- 前端通过环境变量访问：`VITE_STRAPI_URL=https://cms.example.com`。
- 数据库：生产 Postgres；开发可 SQLite/Postgres。
- 上传：先用本地磁盘 `/public/uploads`，前置 Nginx/Cloudflare 缓存；rclone 定时同步到 R2。

### 2.1 Monorepo 与 Vercel（规范第 5 条）
- 前后端同仓 monorepo；前端继续由 Vercel 构建与托管；后端（Strapi）独立部署（VPS/Render/Railway）。
- 为避免后端改动触发 Vercel 端前端重建，根目录添加 `.vercelignore`：
```
# 仅前端 apps/web 参与构建，其余目录忽略
apps/cms/**
apps/member/**
docs/**
infra/**
```
- 也可将前端独立至单独 Vercel 项目（推荐）。

## 3. 内容模型与插件（多语言 + SEO）
启用 `i18n` 插件，Languages：`ja`、`en`（可扩展 zh）。

- Collection Type：`post`
  - `title` (String, localized, required)
  - `slug` (UID from title, unique, localized)
  - `excerpt` (Text, localized)
  - `coverImage` (Media, single)
  - `content` (RichText 或 Markdown 组件)
  - `category` (many-to-one)
  - `tags` (many-to-many)
  - `author` (many-to-one)
  - `publishedAt` (DateTime)
  - `seo` (Component 或插件：metaTitle/metaDescription)
- Collection Type：`category`（name、slug，本地化）
- Collection Type：`tag`（name、slug）
- Collection Type：`author`（name、avatar、bio）

权限：Public 仅开放 `post.find`、`post.findOne`、`category.find`；其余受保护。

### 3.1 插件安装与启用（规范第 4、7 条）
在 `apps/cms` 中安装并启用：
```bash
# i18n / SEO 插件（Strapi v5 官方插件）
npm install @strapi/plugin-seo
```

`config/plugins.js`：
```js
module.exports = ({ env }) => ({
  i18n: {
    enabled: true,
    config: { locales: ['ja', 'en'], defaultLocale: 'ja' },
  },
  seo: {
    enabled: true,
  },
  upload: {
    config: {
      provider: 'local',
      providerOptions: { sizeLimit: 10 * 1024 * 1024 },
    },
  },
});
```

> SEO 插件提供 metaTitle/metaDescription/OG 等字段 UI，也可结合自定义 Component。

## 4. API 规范
- 列表：
  - `GET /api/posts?populate=coverImage,category,tags&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=10&locale={ja|en}`
- 详情：
  - `GET /api/posts?filters[slug][$eq]={slug}&populate=coverImage,category,tags&locale={ja|en}`（前端取第一项）
- 分类/标签：`GET /api/categories` / `GET /api/tags`（按需开启）
- 草稿预览（可选）：服务端代理 + API Token，不在前端暴露。

## 5. 后端关键配置
- `config/server.js`：设置 `url`、`proxy`、`app.keys`。
- `config/database.js`：Postgres 连接（生产禁用 SQLite）。
- `config/middlewares.js`：仅放行前端域名 CORS（`https://minimaxcode.com`、`http://localhost:5173`）。
- `config/plugins.js`：上传 provider（默认 local；可平滑切换 Cloudinary/R2）。
- 环境变量：`PUBLIC_URL`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `DATABASE_*`。

### 5.1 数据库（规范第 3 条，PostgreSQL 5432）
生产使用 Postgres，建议“专库 + 专用账号”：
```sql
CREATE DATABASE strapi ENCODING 'UTF8';
CREATE USER strapi WITH ENCRYPTED PASSWORD 'your-strong-pass';
GRANT ALL PRIVILEGES ON DATABASE strapi TO strapi;
```
`.env` 示例：
```
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your-strong-pass
```

## 6. 部署与基础设施
- 同机最小部署：Nginx 反代 → `cms:1337`；`/uploads` 强缓存，见《同机部署指南》示例配置。
- Docker Compose（开发或小流量生产）包含 cms、db；卷挂载 `public/uploads` 保持持久化。
- 监控：健康检查（/admin 外部探测）、日志采集、磁盘与 DB 连接指标告警。

## 7. 备份方案（本地 → Cloudflare R2）
- 使用 `rclone` 定时将 `apps/cms/public/uploads` 与 Postgres 备份目录同步到 R2；设置对象生命周期保留 7/30 天。

## 8. 前端改造方案（规范第 2、6 条：使用官方 SDK + 新增博客页面）
### 8.1 环境变量
- `.env`/Vercel：`VITE_STRAPI_URL=https://cms.example.com`。

### 8.2 安装官方 SDK（符合规范 + 官方文档）
- SDK 文档：[Setup – strapi-sdk-js](https://strapi-sdk-js.netlify.app/getting-started/setup)
- 安装：
```bash
pnpm add strapi-sdk-js
# 或 npm install --save strapi-sdk-js
```

### 8.3 数据访问封装（基于 SDK，`src/lib/strapi.ts`）
```ts
import Strapi from 'strapi-sdk-js'

export const strapi = new Strapi({
  url: import.meta.env.VITE_STRAPI_URL,
})

export async function fetchPosts({ page = 1, pageSize = 10, locale = 'ja' } = {}) {
  return strapi.find('posts', {
    populate: ['coverImage', 'category', 'tags'],
    sort: 'publishedAt:desc',
    pagination: { page, pageSize },
    locale,
  })
}

export async function fetchPostBySlug(slug: string, locale = 'ja') {
  const res = await strapi.find('posts', {
    filters: { slug: { $eq: slug } },
    populate: ['coverImage', 'category', 'tags'],
    locale,
  })
  return res?.data?.[0] ?? null
}
```

> 异常处理可参考 SDK 文档“Handling Errors”。

### 8.3 路由与页面
- 新增：`/news`（列表）、`/news/:slug`（详情）。
- i18n：从 `i18n.language` 读取当前语言，传入 `locale` 参数。
- 富文本：Rich Text 用 DOMPurify 安全渲染；若使用 Markdown，配合 `remark/rehype` 渲染。

### 8.4 SEO/社交分享
- 详情页根据 Strapi `seo.metaTitle/metaDescription` 设置 `<title>`/`<meta>`；补齐 Open Graph/Twitter Card。
- SSG/预渲染（可选）：Strapi 发布后 Webhook 触发 Vercel Rebuild。

## 9. 安全与合规
- 后台 `/admin` 访问限制：IP 允许列表/Basic Auth/WAF（Nginx/Cloudflare）。
- 仅开放 Public 只读接口；所有 Token/Secrets 不在前端暴露。
- 上传白名单与体积限制；如开放用户上传务必鉴权。
- CORS 最小化：仅允许正式域名与本地开发源。

## 10. 里程碑与任务拆分
- M1（1–2 天）：初始化 `apps/cms`、启用 i18n、建立 Post/Category/Tag/Author；配置 Postgres、本地上传、CORS。
- M2（1–2 天）：安装 `strapi-sdk-js`，新增 `src/lib/strapi.ts` SDK 访问层；新增 `/news` 列表/详情；i18n 透传 locale 并联调；集成 SEO 插件字段到页面 `<head>`。
- M3（1 天）：Nginx/Cloudflare 缓存 `/uploads`，rclone 备份作业上线。
- M4（可选 1 天）：Webhook → Vercel 重建；SEO 元信息注入；监控告警完善。

## 11. 风险与回滚
- 风险：数据库/上传目录未备份导致数据丢失；CORS/权限配置不当导致越权；磁盘写满。
- 回滚：上线前验证备份恢复；预生产演练；异常时 DNS 回切旧站（前端在 CMS 不可用时降级为静态）。

## 12. 验收标准
- 后台能在 `ja/en` 维护文章；前端 `/news` 按语言分页展示；详情能正确渲染并注入 SEO 元信息。
- `/uploads/*` 可稳定访问且被 CDN 缓存命中。
- 备份任务按日完成并可回溯 7/30 天版本。

---

如需，我可以：
1) 直接初始化 `apps/cms` 与 `src/lib/strapi.ts`；
2) 提供可用的 Nginx 与 rclone 配置；
3) 补充基于子目录触发的 GitHub Actions CI/CD。


