# 使用 verdaccio + docker 搭建 npm 私有仓库及使用

::: tip 前言
公司内部前端组件或库的共享等，搭建一个`npm`私有库就很方便，现在中大型公司也基本都有自己的`npm`私有库，这篇文章，和大家一起共同搭建一个`npm`私有库，共同学习
:::

## 前置条件

1. 一台电脑
2. 可以联网

## 一、安装 docker

使用的 windows 版本的 `docker Desktop`, 可以直接去 docker Desktop [官方网站](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module)去下载，下载完成后正常安装就可以了。

或者使用 `winget` 安装

```bash
winget install Docker.DockerDesktop
```

### linux 下的安装

直接使用各个发行版对应的 pkg manangment 安装，由于本人最熟悉 ubuntu，下面给出 ubuntu 下的安装命令

```bash
#Ubuntu
apt install docker
apt install docker-compose # 如需要使用docker-compose可以使用此命令安装
```

## 二、基于 Docker 安装 Verdaccio

### 1、创建相关的目录

```bash
mkdir /opt/Docer-container/verdaccio
cd /opt/Docer-container/verdaccio
mkdir conf && mkdir storage && mkdir plugins
cd ./storage && mkdir data && touch htpasswd
cd ../conf touch config.yaml
vim config.yaml
```

### 2、创建配置文件

```yaml
# 存放软件所有软件包的目录
storage: /verdaccio/storage/data
# 存放所有插件的目录
plugins: /verdaccio/plugins

web:
  # 网站Title
  title: Verdaccio
  # 禁用Gravatar头像
  # gravatar: false
  # 排序方式 asc|desc
  # sort_packages: asc
  # 是否启用暗黑模式
  # darkMode: true
  # logo地址
  # logo: http://somedomain/somelogo.png
  # favicon地址
  # favicon: http://somedomain/favicon.ico | /path/favicon.ico

# i18n翻译配置
# i18n:
# 可用列表见：https://github.com/verdaccio/ui/tree/master/i18n/translations
#   web: en-US

auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
    # 最大注册用户数，默认为 "+inf".
    # 可用通过设置为-1禁止注册
    # max_users: 1000

# 上游npm库，可以设置多个
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npmmirror.com/

packages:
	# 作用域包
  '@*/*':
    # 允许所有人访问
    access: $all
    # 注册用户可访问
    publish: $authenticated
    # 注册用户可访问
    unpublish: $authenticated
    proxy: npmjs

  '**':
    # 默认情况下所有用户 (包括未授权用户) 都可以查看和发布任意包
    # 你可以指定 用户名/分组名 (取决于你使用什么授权插件，默认的授权插件是内置的 htpasswd)
    # 访问权限有三个关键词: "$all", "$anonymous", "$authenticated"
    # $all 表示不限制，任何人可访问；
    # $anonymous 表示未注册用户可访问；
    # $authenticated 表示只有注册用户可访问
    access: $all

    # 允许所有注册用户发布/撤销已发布的软件包
    # (注意：默认情况下任何人都可以注册)
    publish: $authenticated
    unpublish: $authenticated

    # 如果私有包服务不可用在本地，则会代理请求到'npmjs'
    # proxy 可以有多个值，多个值用空格分开
    proxy: taobao npmjs

# 您可以指定传入连接的HTTP /1.1服务器保持活动超时（以秒为单位）。
# 值为0会使http服务器的行为类似于8.0.0之前的Node.js版本，后者没有保持活动超时。
# 解决方法：通过给定的配置可以解决以下问题
server:
  keepAliveTimeout: 60
# 中间件
middlewares:
  audit:
    enabled: true

# 日志设置
logs: { type: stdout, format: pretty, level: http }

# 开放远程访问，允许所有IP
listen:
  - 0.0.0.0:4873
```

### 3、安装运行 Verdaccio

```bash
docker run -it --name verdaccio \
-p 4873:4873 \
-v /opt/Docker-container/Verdanccio/conf:/verdaccio/conf \
-v /opt/Docker-container/Verdanccio/storage:/verdaccio/storage \
-v /opt/Docker-container/Verdanccio/plugins:/verdaccio/plugins \
verdaccio/verdaccio
```

> 运行成功后就可以通过`http://服务器ip:4873`访问`npm`私有库了。

报错处理：

如果提示 `fatal--- cannot open config file /verdaccio/conf/config.yaml: Error: CONFIG: it does not look like a valid config file`, 可以执行下面的命令

```bash
chcon -Rt container_file_t ./conf
```

更多解决方法请查看[官方文档](https://verdaccio.org/zh-CN/docs/docker)

## 三、管理 npn、yarn、pnpm 源

### 1、替换 npn、yarn、pnpm 源为 `http://192.168.188.164:4873/`

```bash
# npm 和 pnpm 设置（pnpm 使用 npm 配置的源）
npm config set registry http://192.168.188.164:4873/
# yarn 设置
yarn config set registry http://192.168.188.164:4873/ # -g是全局设置
```

直接把默认的 `npm` 源替换为我们私有库，但是多个源的时候不太好管理。所以推荐使用 `nrm` 来管理我们的 `npm` 源。

### 2、使用 `nrm` 管理 `npm` 源

```bash
# 全局安装 nrm
$ npm i -g nrm

# 添加私有库
$ nrm add vnpm http://192.168.188.164:4873

# 查看现有的 npm 源
$ nrm ls

  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
  private ------ http://192.168.188.164:10086/repository/npm/
* vnpm --------- http://192.168.188.164:4873/

# 设置npm源
$ nrm use vnpm
```

> 管理 `yarn` 的源，可以使用 `yrm` 来管理；用法同 `nrm`

## 四、注册用户和发布 npm 包

### 1、注册私有库用户

```bash
# 注册用户
$ npm adduser
```

### 2、登陆私有库用户

```bash
# 登录用户
$ npm login

# 查看当前登录用户
$ npm who am i
```

### 3、在私有库发布包

```bash
# 发布当前包
$ npm publish
```

> 到此，所有的安装，注册用户，发布包流程都已经完成了，各位小伙伴如果有什么问题可以私聊/留言。
