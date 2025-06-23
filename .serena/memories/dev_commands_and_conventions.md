## 开发常用命令
- 本地开发：`pnpm dev`
- 生产构建：`pnpm build`
- 预览构建：`pnpm preview`
- 代码检查：`pnpm lint`

## 代码风格与规范
- 采用 ESLint 进行代码风格检查，推荐开启 type-aware 规则
- 组件、函数、hook、工具函数需补全 JSDoc 风格注释
- 变量、函数、组件命名采用小驼峰/大驼峰（CamelCase/PascalCase）
- 目录、文件命名采用小写+中划线或驼峰
- 多语言文本统一放在 src/locales/
- 样式优先使用 TailwindCSS 工具类

## 其他
- 推荐使用 VSCode/JetBrains 等现代IDE，利用其未用代码、类型、注释等提示功能
- 重要变更建议先新建分支，遵循分支命名规范（如 feature/xxx、fix/xxx）