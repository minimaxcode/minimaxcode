## Strapi Cloud 部署手册（v5）

> 本文面向：将现有 Strapi v5 项目部署到 Strapi Cloud，并与前端（Vercel）对接。
> 计费与功能会更新，建议在实施前核对官方说明（Pricing/Usage & Billing）。

### 1. 免费额度与收费策略（概览）
- 免费计划典型限制（以官方最新为准）：
  - API 请求：约 10,000 次/月
  - 资产带宽：约 10GB/月
  - 资产存储：约 10GB
  - 数据库条目：约 500
  - 邮件发送：约 100 封/月
  - 备份/自定义域/多环境：免费计划通常不包含
- 超限行为：免费计划超限会暂停项目直至下月重置；付费计划可发生超额计费（示例：每 25,000 次 API 请求约 $1.5；每 100GB 带宽约 $30；每 1GB 存储约 $0.6/月）。
- 冷启动：免费计划长时间不活跃会冷启动，再次访问会有延迟。

> 请以官方定价与使用政策为准（“Strapi Cloud Usage & Billing / Pricing”）。

### 2. 项目准备
- 代码仓库：建议仓库根目录即为 Strapi 项目根（非 monorepo 子目录）。
- Node/包管理器：按本地能正常 `build` 为准。
- 环境变量与密钥：若已有自托管环境，准备好以下（Cloud 可一键生成）：
  - `APP_KEYS`
  - `API_TOKEN_SALT`
  - `ADMIN_JWT_SECRET`
  - `TRANSFER_TOKEN_SALT`

### 3. 在 Strapi Cloud 创建项目
1) 访问并登录 Strapi Cloud 控制台。
2) New Project → 选择计划（Free/Essential/Pro/Scale）。
3) 连接 GitHub/GitLab/Bitbucket，选择仓库与分支。
4) 选择区域，确认创建。

### 4. 配置环境变量
- 在 Cloud 控制台 → Settings → Environment Variables：
  - 若无密钥，使用“Generate keys/secrets”自动生成。
  - 如需第三方存储/外部数据库，按供应商文档设置连接串（免费计划默认提供托管 Postgres 与资产存储，一般无需外部资源）。
- CORS：允许你的前端域名与本地开发地址（如 `http://localhost:5173`、Vercel 生产域名）。

### 5. 权限与 API Token
- Cloud 控制台 → Strapi Admin → Settings → API Tokens：
  - 新建 Token，类型选 Read-Only（内容 API 只读）。
  - 保存后复制 Token 值。
  - 前端通过 `Authorization: Bearer <token>` 访问（详见前端配置文档）。

### 6. 首次部署与访问
1) 触发 Deploy（首次创建时会自动部署）。
2) 部署完成后获得 Cloud 提供的域名（用于 Admin 与 API）。
3) 测试 API：
   - GET `https://<your-cloud-domain>/api/articles`
   - 如需关系数据，使用 `populate`；如需过滤/分页，使用 `filters`/`pagination`/`sort`。

### 7. 常见问题与排查
- 403/401：检查是否携带 Bearer Token；Token 是否已过期/权限不足。
- 400：检查 `fields`/`populate` 字段名大小写与 schema 一致（如 `Title/Date`）。
- CORS：确保将前端域名加入允许列表。
- 冷启动：首次访问较慢属正常，升级计划可避免。
- 超限暂停：项目将暂停直至下月或升级计划。

### 8. 变更与回滚
- 通过 Git 提交触发新部署。
- 备份与回滚能力在高阶付费计划更完善（如周/日备份）。

### 9. 安全与最佳实践
- 使用只读 API Token；不要在前端仓库明文提交 Token，放入部署平台的环境变量中。
- 定期轮换 Token，并清理不再使用的 Token。
- 最小化 `fields` 与 `populate`，降低带宽与泄露风险。
- 明确多语言默认 `locale` 与 `documentId` 的使用策略。