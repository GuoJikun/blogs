# vue-cli env 配置

## 前言

相信使用过 vueCli 开发项目的小伙伴有点郁闷，正常开发时会有三个接口环境（开发，测试，正式），但是 vueCli 只提供了两种 development,production(不包含 test-单测)模式。其实这是小伙伴们没有理解 vueCli 文档所导致的。

vueCli 命令中 `--mode` 对应的 `.env.[mode]`，而不是 `NODE_ENV`

::: tip 注意
除了 VUE_APP\_ 变量之外。<br>
还有两个特殊的变量：<br>
NODE_ENV： 是 `development`、`production`、`test` 中的一个。其值取决于应用运行的模式。<br>
BASE_URL： 和 vue.config.js 中的 `publicPath` 选项相符，即你的应用会部署到的基础路径。
:::

## 简介-官方

mode 是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式：

- development 模式用于 vue-cli-service serve
- test 模式用于 vue-cli-service test:unit
- production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e

你可以通过传递 --mode 选项参数为命令行覆写默认的模式。

当运行 `vue-cli-service` 命令时，所有的环境变量都从对应的环境文件中载入。如果文件内部不包含 `NODE_ENV` 变量，它的值将取决于模式，例如，在 `production` 模式下被设置为 "production"，在 `test` 模式下被设置为 "test"，默认则是 "development"。

`NODE_ENV` 将决定您的应用运行的模式，是开发，生产还是测试，因此也决定了创建哪种 webpack 配置。

例如通过将 `NODE_ENV` 设置为 "test"，Vue CLI 会创建一个优化过后的，并且旨在用于单元测试的 webpack 配置，它并不会处理图片以及一些对单元测试非必需的其他资源。

同理，`NODE_ENV=development` 创建一个 webpack 配置，该配置启用热更新，不会对资源进行 hash 也不会打出 vendor bundles，目的是为了在开发的时候能够快速重新构建。

当你运行 `vue-cli-service build` 命令时，无论你要部署到哪个环境，应该始终把 `NODE_ENV` 设置为 "production" 来获取可用于部署的应用程序。

## 示例配置

我们现在有三个配置文件，分别如下

```bash
#.env.development
NODE_ENV=development
VUE_APP_AXIOS_BASEURL=http://xxxx
```

```bash
#.env.preview 测试环境的配置
NODE_ENV=production
VUE_APP_AXIOS_BASEURL=http://xxxx
```

```bash
#.env.production
NODE_ENV=production
VUE_APP_AXIOS_BASEURL=http://xxxx
```

## 在 axios 中使用

```js
import axios from "axios";
const conf = {
  baseURL: process.env.VUE_APP_AXIOS_BASEURL,
};
return axios.create(conf);
```

## package.json 配置

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build --mode preview",
    "build:release": "vue-cli-service build"
  }
}
```

## 启动方式

```bash
npm run serve # 默认 dev
npm run build # 测试环境
npm run build:release # 正式环境
```
