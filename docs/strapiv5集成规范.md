1.需要集成strapiv5,集成方式请参考官方文档：https://docs.strapi.io/cms/intro，https://docs.strapi.io/cms/installation，https://docs.strapi.io/cms/configurations
2.strapi5 客户端调用使用官方sdk，https://strapi-sdk-js.netlify.app/getting-started/setup
3.strapi5 集成使用postgresql数据库,本地端口为5432，需要创建专用的数据库和用户
4.strapi5 集成使用strapi-plugin-i18n插件，用于多语言
5.项目集成strapi5的方式为Monorepo结构即前后端在同一项目中管理，需要考虑前端仍使用vercel,使用 .vercelignore 文件解决Vercel 部署时后端代码变更触发前端构建的问题
6.需要为前端增加博客展示页面，支持多语言
7.strapi5需要集成seo插件集成插件