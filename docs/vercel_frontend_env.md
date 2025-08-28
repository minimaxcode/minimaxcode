## Vercel 前端部署与环境配置（Vite + React）

> 本文说明如何在 Vercel 部署 Vite 前端并连接 Strapi Cloud。

### 1. 必备环境变量
在 Vercel 项目 → Settings → Environment Variables 中按环境分别设置：

- `VITE_STRAPI_URL`：你的 Strapi Cloud 基础地址（例如：`https://<your-cloud-domain>`）
- `VITE_STRAPI_TOKEN`：在 Strapi Admin → Settings → API Tokens 创建的只读 Token
- （可选）`VITE_SITE_URL`：前端站点对外完整地址（用于生成绝对链接）

> 注意：Vite 只会暴露以 `VITE_` 开头的变量到客户端。

### 2. 本地开发
在项目根目录创建 `.env.local`（不会被提交）：

```env
VITE_STRAPI_URL=https://<your-cloud-domain>
VITE_STRAPI_TOKEN=<your-readonly-token>
VITE_SITE_URL=http://localhost:5173
```

### 3. Vercel 项目创建与构建
1) 连接 Git 仓库（GitHub/GitLab/Bitbucket）。
2) Vercel 会自动识别 Vite：
   - Build Command：`pnpm run build` 或 `npm run build`
   - Output Directory：`dist`
   - Install Command：自动（可改为 `pnpm i --frozen-lockfile`）
3) 提交代码即触发部署。

### 4. 代码对接要点
- SDK 认证：前端通过 `strapi.setToken(import.meta.env.VITE_STRAPI_TOKEN)` 携带 Bearer Token。
- API 基址：使用 `import.meta.env.VITE_STRAPI_URL` 拼接资源（我们已在请求与渲染处做了 `/uploads` 绝对化处理）。
- 字段最小化：列表页请求仅传必需 `fields` 与 `populate`，降低带宽与错误风险。

### 5. 多环境管理
- Vercel 支持 Production / Preview / Development 三套变量：
  - Production：主分支（如 `main`）
  - Preview：其他分支或 PR
  - Development：本地 `vercel dev`
- 为不同环境分别设置 `VITE_STRAPI_URL` 与 `VITE_STRAPI_TOKEN`。

### 6. CORS 配置
- 在 Strapi Cloud 允许来源中添加：
  - 本地开发：`http://localhost:5173`
  - 线上域名：`https://<your-vercel-domain>`

### 7. 常见问题排查
- 403 Forbidden：Token 缺失/无效；检查 Vercel 环境变量是否配置，并确保前端构建后变量已生效（重新部署）。
- 400 Bad Request：`fields` 名称与大小写必须与 Strapi schema 一致（如 `Title/Date`）。
- 图片不显示：确认返回的图片 URL 为可访问的绝对地址；或确保我们对 `/uploads` 的绝对化逻辑生效，且 `VITE_STRAPI_URL` 正确。
- 冷启动缓慢：Strapi Cloud 免费计划正常现象。

### 8. 示例：最小化 `.env`（生产）
```env
VITE_STRAPI_URL=https://<your-cloud-domain>
VITE_STRAPI_TOKEN=<your-readonly-token>
```

完成以上配置后，前端即可在 Vercel 正常访问 Strapi Cloud 的内容 API。