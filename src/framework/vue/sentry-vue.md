# vue 项目接入 Sentry

## 背景

公司 web 项目长期处于裸奔状态，大部分问题定位和复现困难，故想引入个的异常监控系统来解决。

Sentry 有 [开源版](https://github.com/getsentry/self-hosted) 和 [Sass](https://sentry.io/) 版 ，可根据自身需要去选择。

## Sentry 简介

Sentry 是一个开发人员优先的错误跟踪和性能监控平台。

如何充分利用 Sentry：

-   连接代码库，确保还设置了源代码管理集成和源映射（如果适用）。这将允许 Sentry 通过可读的堆栈跟踪和可疑提交将错误和性能问题直接链接到有问题的代码行。
-   设置警报，以确保您知道您关心的事情何时出错。您可以选择通过我们的聊天集成之一（如 Slack 或 Discord）接收提醒。查看我们的警报最佳做法，了解如何仅接收相关通知。
-   自定义发现、仪表板和查询，以更好地控制应用出现问题时获得的见解类型。最后，创建针对您的用例量身定制的自定义标签，以便进行更精细的搜索和查询。

## Sentry 私有化部署

私有化部署官方推荐方式是通过 Docker 和 Docker Compose 部署，具体参考[官方文档](https://develop.sentry.dev/self-hosted/)

### 前置条件

-   Docker 19.03.6+
-   Compose 2.19.0+
-   4 CPU Cores
-   16 GB RAM
-   20 GB Free Disk Space

### 下载和安装

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

:::warning 注意
如果在 wsl2 中执行 `install.sh` 失败，可以尝试在 wsl2 中的 `/etc/wsl.conf` 中添加如下配置

```ini
[boot]
systemd=true
```

:::

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
import { createApp } from "vue";
import router from "./router";
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
