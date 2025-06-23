# MiniMaxCode Website

## 项目简介
MiniMaxCode Website 是一个基于 React + TypeScript + Vite 的多语言企业官网模板，支持高效开发、快速部署，适用于中小企业、品牌站点等场景。项目集成了丰富的 UI 组件、表单、地图、动画、国际化等功能。

## 功能模块概览
- 多语言支持（中/英/日）
- 响应式页面布局（首页、服务、价格、流程、案例、关于、隐私、条款、联系等）
- 丰富的 UI 组件库（Radix UI、TailwindCSS、自定义组件）
- 表单与邮件发送（Contact 页面）
- 动画与交互（framer-motion）
- 地图集成（Google Maps）
- 主题与暗黑模式

## 技术栈说明
- 框架：React 18 + TypeScript
- 构建工具：Vite
- 样式：TailwindCSS、tailwind-merge
- UI组件：Radix UI、lucide-react、framer-motion、cmdk、sonner
- 表单：react-hook-form
- 国际化：i18next、react-i18next
- 其他：recharts（图表）、@vis.gl/react-google-maps（地图）、resend（邮件）

## 安装与运行方式
```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 生产构建
pnpm build

# 预览生产包
pnpm preview

# 代码检查
pnpm lint
```

## 文件结构说明
```
minimaxcode-website/
├── api/                # 后端接口（如邮件发送）
├── public/             # 静态资源
├── src/
│   ├── components/     # 通用组件与UI库
│   ├── pages/          # 页面级组件
│   ├── hooks/          # 自定义hooks
│   ├── data/           # 静态数据
│   ├── lib/            # 工具函数
│   ├── locales/        # 多语言资源
│   ├── App.tsx         # 应用主入口
│   ├── main.tsx        # 渲染入口
│   └── index.css       # 全局样式
├── package.json        # 项目依赖与脚本
├── tailwind.config.js  # TailwindCSS 配置
├── postcss.config.js   # PostCSS 配置
└── README.md           # 项目说明
```

## 开发规范
- 采用 ESLint 进行代码风格检查，推荐开启 type-aware 规则
- 组件、函数、hook、工具函数需补全 JSDoc 风格注释
- 变量、函数、组件命名采用小驼峰/大驼峰（CamelCase/PascalCase）
- 目录、文件命名采用小写+中划线或驼峰
- 多语言文本统一放在 src/locales/
- 样式优先使用 TailwindCSS 工具类
- 重要变更建议先新建分支，遵循分支命名规范（如 feature/xxx、fix/xxx）

## 开发与维护者信息
- 维护者：MiniMaxCode 团队
- 官网：https://minimaxcode.com
- 邮箱：contact@minimaxcode.com

---
> 本项目支持 AI 辅助开发，欢迎贡献与反馈！

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
