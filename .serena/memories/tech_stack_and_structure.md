## 技术栈与结构
- 主体框架：React 18 + TypeScript
- 构建工具：Vite
- 样式：TailwindCSS、tailwind-merge
- UI组件：Radix UI、lucide-react、framer-motion、cmdk、sonner 等
- 表单：react-hook-form
- 国际化：i18next、react-i18next
- 其他：recharts（图表）、@vis.gl/react-google-maps（地图）、resend（邮件）

### 目录结构
- src/components/：通用组件与UI库
- src/pages/：页面级组件
- src/hooks/：自定义hooks
- src/data/：静态数据
- src/lib/：工具函数
- src/locales/：多语言资源
- public/：静态资源
- api/：后端接口（如邮件发送）

### 主要入口
- src/App.tsx：应用主入口
- src/main.tsx：渲染入口
- index.html：HTML模板