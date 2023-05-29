# vue 项目接入 Sentry

## 背景

公司web项目长期处于裸奔状态，大部分问题定位和复现困难，故想引入个的异常监控系统来解决。

Sentry有 [开源版](https://github.com/getsentry/self-hosted) 和 [Sass](https://sentry.io/) 版 ，可根据自身需要去选择。

## 部署

私有化部署官方推荐方式是通过 Docker 和 Docker Compose 部署，具体参考[官方文档](https://develop.sentry.dev/self-hosted/)

```zsh
# linux 环境
git clone https://github.com/getsentry/self-hosted.git
cd ./self-hosted
# 如果没有 docker 和 docker-compose 请自行安装
# Ubuntu 下安装 sudo apt install docker docker-compose 请自行安装
sudo ./install.sh
# 上一条命令安装成功后执行
docker-compose up -d
```

如果上面的命令没有报错，就可以通过 `localhost:9000` 来访问 sentry

## 在 vue 中使用

::: warning 项目说明
此项目是使用 vue-cli 创建的 vue3 项目
:::

### 安装 @sentry/vue

```zsh
npm i @sentry/vue
```

### 使用 @sentry/vue

```js
// main.js
import { createApp } from "vue"
import router from './router'
import * as Sentry from "@sentry/vue";

import { default as packages } from "../package.json";

const app = createApp(App);

// app.config.globalProperties.$sentry = Sentry;

Sentry.setUser({
    id: store.state.userInfo?.id || "vms-c-id",
    username: store.state.userInfo?.name || "vms-c-name",
});

Sentry.init({
    app,
    dsn: "your dsn",
    integrations: [
        new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        }),
        new Sentry.Replay(),
    ],
    environment: process.env.VUE_APP_MODE,
    release: `${packages.name}@${packages.version}`,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    trackComponents: true, // 跟踪组件
});
```