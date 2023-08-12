## 运行turborepo

[**Supabase**](https://supabase.com)使用[**Turborepo**](https://turborepo.org/docs)来管理和运行此monorepo

1. 存储仓根目录中安装依赖项

   ```sh
   npm install # install dependencies
   ```

2. 之后，您可同时运行以下应用程序：
   ```sh
   npm run dev # start all the applications
   ```

然后访问并编辑以下任何站点：

| 站点 | 目录 | 名称 | 描述 | 本地访问地址 |
| --- | ------------ | ---------- | --------------- | --------------------- |
| 主站 | `/apps/www` | www | 网站首页/主站页面 | http://localhost:3000 |
| 平台 | `/studio` | studio | 系统平台/仪表板 | http://localhost:8082 |
| 文档 | `/apps/docs` | docs | 文档、指南与参考(基于Next.js) | http://localhost:3001/docs |

## 单独运行站点

您可单独运行站点，例如:

```sh
npm run dev:www
```
## Supabase介绍

[Supabase](https://supabase.com) 是一个开源的 Firebase 替代品。我们正在使用企业级的开源工具构建 Firebase 的功能。

- [x] Postgres数据库托管
- [x] 身份验证和授权
- [x] API自动生成
  - [x] REST
  - [x] GraphQL
  - [x] Realtime订阅
- [x] 函数。
  - [x] 数据库函数
  - [x] 边缘函数
- [x] 文件存储
- [x] 仪表板

![Supabase仪表板](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png)
