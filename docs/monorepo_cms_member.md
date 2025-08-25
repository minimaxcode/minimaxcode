# Monorepo + 同机部署指南（Web + Strapi CMS + 会员系统）

适用场景：在同一台服务器部署 Strapi v4（CMS）与后续的“会员信息系统”，前端（Vite）保持静态托管/独立部署；仓库采用 monorepo 统一管理，服务进程独立发布。

---

## 1. 结论与总体建议
- 用一个仓库（monorepo）管理多个应用；每个服务进程独立、可分别部署与伸缩。
- 同机部署起步成本低，后续可平滑迁移到多机/多实例。
- 前端只与两个后端域名交互：`cms.example.com`（Strapi）与 `api.example.com`（会员系统）。

## 2. 仓库与目录结构（建议）
```
apps/
  web/            # 现有 Vite 前端（Vercel 或任意静态托管）
  cms/            # Strapi v4（独立进程/容器）
  member/         # 会员信息系统（NestJS/Express/FastAPI 等）
packages/
  shared/         # 可选：共享类型/SDK/常量
infra/
  docker-compose.yml  # 可选：本机编排 cms/member/postgres/redis/nginx
```

要点：
- 服务进程分离：各自 `Dockerfile`/启动脚本/环境变量，独立 CI/CD。
- 共享代码放 `packages/shared`（类型、常量、请求封装）。

## 3. 同机部署拓扑
```
Internet
  └── Cloudflare/CDN/WAF（可选）
       └── Nginx/Caddy 反向代理（同机）
            ├── cms.example.com  →  apps/cms:1337  (Strapi)
            ├── api.example.com  →  apps/member:PORT (会员服务)
            └── static (可选：转发到前端 CDN/托管)

DB/Cache（同机容器或托管）：
  Postgres（cms、member 分库/分 schema）
  Redis（会话/限流/队列，可选）
```

## 4. 域名与反向代理（Nginx 示例）
```nginx
# CMS（限制 /admin 访问来源可选）
server {
  listen 80;
  server_name cms.example.com;

  location / {
    proxy_pass http://127.0.0.1:1337;  # Strapi 进程
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # 媒体强缓存（可选）
  location /uploads/ {
    proxy_pass http://127.0.0.1:1337;
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}

# Member API
server {
  listen 80;
  server_name api.example.com;

  location / {
    proxy_pass http://127.0.0.1:4000;  # member 服务端口
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## 5. 环境变量与配置
- 各服务独立 `.env`：
  - `apps/cms/.env`：DB、APP_KEYS、JWT_SECRET、CORS 允许域名列表
  - `apps/member/.env`：DB、JWT/Session、第三方集成
  - `apps/web`：`VITE_STRAPI_URL`、`VITE_MEMBER_API`
- 最小权限：不同 DB 用户/密码；不同 Token/Secrets；不同 CORS 白名单。

## 6. CORS 与安全基线
- CMS 与 Member 在各自中间件层开启 CORS，仅放行前端域名（如 `https://minimaxcode.com`、`http://localhost:5173`）。
- 管理端 `/admin`：
  - 建议仅内网/VPN/IP 允许列表访问；或加简单防护（Basic Auth/WAF）。
- 不在前端暴露任何后台 Token（Strapi API Token、Admin 密钥等）。
- 上传安全：限制 MIME、文件大小、文件名清洗；如开放用户上传，务必鉴权。

## 7. 数据层建议
- Postgres：同实例分库或分 schema（如 `strapi`、`member`），账号最小权限。
- Redis（可选）：会话、限流、队列、缓存。
- 备份：见第 10 节。

## 8. 职责边界：何时用 Strapi 用户系统 vs 独立 Member
- 用 Strapi Users & Permissions（简单）
  - 场景：仅需基础注册/登录/角色、对 CMS 内容做权限控制。
  - 优点：开箱即用、成本低；缺点：与 CMS 强耦合、复杂业务扩展受限。
- 独立 Member 服务（推荐中长期）
  - 场景：需要复杂鉴权、第三方登录、订阅/账单（可接 Stripe）、风控、与其他系统对接。
  - 优点：清晰边界、可独立演进与扩容；缺点：初期多一套服务与运维。

## 9. CI/CD 与可观测性
- 按子目录触发发布：改动 `apps/cms` → 仅发布 CMS；`apps/member` → 仅发布会员服务；`apps/web` → 构建前端。
- 健康检查/日志/指标：
  - CMS 与 Member 暴露健康检查端点；日志入同机文件或外部服务（Loki/Elastic）。
  - 监控维度：响应时间、错误率、DB 连接、磁盘占用、CPU/内存。

## 10. 备份策略（同机本地 → R2，建议）
- 现阶段使用本地磁盘：`apps/cms/public/uploads` + 数据库备份。
- rclone 同步到 Cloudflare R2（成本极低）：
```bash
# 首次：rclone config（配置 R2）
# 同步上传目录
rclone sync /srv/apps/cms/public/uploads r2:my-bucket/uploads \
  --fast-list --checksum --transfers=8 --checkers=8
# 同步数据库备份目录（按你的备份路径）
rclone sync /backups/postgres r2:my-bucket/db-backups \
  --fast-list --transfers=4 --checkers=4
```
- R2 生命周期策略：仅保留最近 7/30 天版本，自动清理旧版本降低存储费。

## 11. 伸缩与迁移
- 单机 → 多机：直接将 `cms` 或 `member` 迁到新主机；DNS 或反代切换；monorepo 不受影响。
- 媒体从本地 → 对象存储（S3/R2/Cloudinary）：替换 Strapi upload provider + 数据迁移，前端无需改造。

## 12. 最小落地清单
- 仓库
  - [ ] 新建 `apps/member`（选择后端框架）
  - [ ] `packages/shared`（可选）规划公共类型/常量
- CMS
  - [ ] `apps/cms` 已就绪；配置 CORS：仅放行前端域名
  - [ ] 仅开放 Public 只读内容接口；管理员与编辑角色分权
- Member
  - [ ] 设计用户/角色/会话模型（或 JWT），准备健康检查与日志
  - [ ] CORS：仅放行前端域名
- 反代与域名
  - [ ] Nginx/Caddy 配置 `cms.example.com` 与 `api.example.com`
  - [ ] 可选：Cloudflare 代理 + 简易 WAF 规则
- 数据层
  - [ ] Postgres：分库/分 schema；账号最小权限
  - [ ] Redis（可选）
- 备份
  - [ ] 本地定时任务 + rclone → R2

## 13. 可选：本机编排（docker-compose 最简示例）
```yaml
version: "3.9"
services:
  reverse-proxy:
    image: nginx:stable
    volumes:
      - ./infra/nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "80:80"
    depends_on:
      - cms
      - member

  cms:
    build: ./apps/cms
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
      ADMIN_JWT_SECRET: some_secret
      JWT_SECRET: some_secret
    volumes:
      - ./apps/cms/public/uploads:/app/public/uploads
    expose:
      - "1337"

  member:
    build: ./apps/member
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://member:member@db:5432/member
      REDIS_URL: redis://redis:6379
    expose:
      - "4000"

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

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```
> 注意：生产环境建议将 Nginx 配置拆分为按域名的 `server` 块（见第 4 节示例），并使用 Let’s Encrypt/ACME 自动签发 HTTPS。

---

如需，我可以基于此文档，补充一份可直接使用的 `infra/nginx.conf`、`apps/member` 的最小骨架与 CI/CD 示例（GitHub Actions）。