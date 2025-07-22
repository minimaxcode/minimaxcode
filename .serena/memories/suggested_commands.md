## 推荐开发命令
- 启动开发环境：`pnpm dev`
- 构建生产包：`pnpm build`
- 预览生产包：`pnpm preview`
- 代码检查：`pnpm lint`
- 依赖安装：`pnpm install`
- 运行测试（如有）：`pnpm test` 或 `pnpm vitest`
- git 操作：`git status`、`git add`、`git commit`、`git push`、`git pull`
- 目录/文件操作：`ls`、`cd`、`cat`、`find`、`grep` 等（Darwin/macOS 环境）

## 说明
- 推荐在每次提交前运行 lint 检查
- 生产部署前务必本地 build 并 preview 验证
- 依赖变更后建议重新 install 并测试