# atvv-imva-frontend

## Node环境

v16.16+

## 启动步骤

下载依赖 -> 启动项目 -> 打包项目

## 下载依赖

`pnpm install`

## 启动项目
`npm start`
## 打包项目
`npm run build`

## 代码结构

根目录：

- .eslintrc.cjs：代码规范配置
- tsconfig.json：ts配置
- index.html：单页面应用入口
- vite.config.ts：vite配置文件，包括根目录alias、本地server代理，css module驼峰式转换等
- src：主要功能代码

src：

- assets：静态资源目录
- css: 全局公共样式+reset样式+图标svg组件
- component：从页面抽离出来的单组件+公共组件
- hooks：自定义hooks
- pages：页面代码
- redux：redux相关数据（slice）
- routes: 侧边栏路由配置处理
- utils：工具方法（包括xgplayer自定义plugins）
- App.tsx：配置路由
- main.tsx：注入redux、antd、react-router

```plain
├── public
├── src 主要功能代码
│   ├── css 全局公共样式+reset样式+图标svg组件
│   ├── assets 静态资源目录
│   ├── components  从页面抽离出来的单组件+公共组件
│   ├── hooks 自定义hooks
│   ├── pages 页面代码
│   ├── redux redux相关数据（slice）
│   ├── routes 侧边栏路由配置处理
│   ├── utils 工具方法（包括xgplayer自定义plugins）
│   ├── main.tsx 注入redux、antd、react-router
│   ├── App.tsx 配置路由
├── .eslintrc.cjs 代码规范配置
├── tsconfig.json ts配置
├── vite.config.ts vite配置文件，包括根目录alias、本地server代理，css module驼峰式转换等
├── README.md 读我
├── index.html 单页面应用入口
├── package.json 项目依赖
```

