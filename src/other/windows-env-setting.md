# Web 前端工程的装机必备软件

## 前言

最近作者的电脑 C 盘变红了，这让我很难受(有点小强迫症)，所以准备重新安装下系统，顺便把 C 盘扩大点。

:::tip 注意
操作系统是 windows 11 23H2。<br>
所有的命令行都是使用 Windows Terminal 中进行的。
:::

## 安装 Windows Terminal

由于我们所有的命令行操作都是在 Windows Terminal 中进行的， 所以第一步先按章配置 Windows Terminal（win11 是自带的，其他系统可以在系统商店搜索 terminal 进行安装）；
Windows Terminal 默认支持多种 shell 环境（`cmd`、`powershell`、`Azure Cloud Shell`），
另外还支持自定义添加其他的 shell 环境（如：git 自带的 git-bash；wsl 等等）

![windows terminal](/images/other/windows-env-setting/window-terminal.png)

> 关于 Windows Terminal 美化可以参考[这个](/other/terminal-config)
>
> 如果执行脚本提示此系统禁止运行脚本可以执行 `set-ExecutionPolicy RemoteSigned` 解除禁制

## 安装 `nvm` - node 版本管理工具

作为 web 前端开发工程师，nodejs 肯定是必不可少的， nvm（Node Version Manager）是一个用于管理 Node.js 版本的工具，它提供了一些常用的命令来操作 Node.js 版本。
所以我们先来安装 `nvm`， 由于 win11 自带了 `winget` 包管理工具，所有下面我们使用 `winget` 来安装 `nvm`。

```bash
winget install CoreyButler.NVMforWindows
# 安装前需要先使用 winget search 进行搜索，找到对应的 id（如上面的 CoreyButler.NVMforWindows）
```

> 具体的安装步骤可以参考作者的[这篇博文](https://juejin.cn/post/7119439575654596616)

**以下是一些常用的 nvm 命令：**

```bash
nvm install [version] # 安装指定版本的Node.js。如果未指定版本，则默认安装最新版本。
nvm use [version] # 切换到指定版本的Node.js。如果未指定版本，则默认切换到最新版本。
nvm uninstall [version] # 卸载指定版本的Node.js。
nvm list # 列出已安装的所有 Node.js版本。
nvm current # 显示当前正在使用的Node.js版本。
nvm alias [from] [to] # 创建或修改别名，以方便切换不同版本的Node.js。
nvm default [version] # 设置默认的Node.js版本。
nvm node_mirror [url] # 设置Node.js的镜像源地址。
nvm npm_mirror [url] # 设置npm的镜像源地址。
nvm on # 开启Node.js版本管理。
nvm off # 关闭Node.js版本管理。
nvm proxy [url] # 设置下载代理。
```

## 安装 NodeJS

```bash
nvm install lts # 安装nodeJs 最新的 lts 版本
```

安装完成后就可以执行 `node -v` 查看当前的 node 版本了。

node 安装完成后，也可以安装一些常用的工具：

-   nrm / yrm 用来管理包管理器的源地址，nrm-npm；yrm-yarn
-   pnpm / yarn / cnpm 包管理器-喜欢哪个装哪个，也可以全部安装。
-   @vue/cli vue cli 用来创建管理 vue 项目（老项目需要）

## 源码管理

这里我们使用的 git，git 的安装也是使用 winget， 和安装 nvm 的步骤一致。不习惯的可以去[官网下载](https://git-scm.com/download/win)

```bash
winget install Git.Git
```

## 安装 vscode

vscode 的安装也是使用 winget， 和安装 nvm 的步骤一致。不习惯的可以去[官网下载](https://code.visualstudio.com/)

```bash
winget install Microsoft.VisualStudioCode
```

![vscode](/images/other/windows-env-setting/vscode.png)

vscode 插件：

-   Better Comments
-   Can I Use
-   Vite
-   JavaScript standardjs styled snippets
-   Path Intellisense
-   markdownlint
-   ESLint
-   Git History
-   EditorConfig for VS Code
-   Prettier - Code formatter
-   Auto Close Tag
-   Auto Rename Tag
-   Code Runner
-   GitHub Copilot
-   GitHub Copilot Chat
-   GitHub Copilot Labs
-   Draw.io Integration
-   SVG
-   CodeMetrics
-   Image preview
-   Noctis
-   DotENV
-   Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
-   Dev Containers
-   Remote - SSH
-   Remote - SSH: Editing Configuration Files
-   WSL
-   Remote Development
-   Live Preview
-   Remote Explorer
-   Remote Repositories
-   Remote - Tunnels
-   Nx Console
-   indent-rainbow
-   CSS Peek
-   git-commit-plugin
-   JavaScript Booster
-   Auto Import
-   Code Spell Checker
-   Formatting Toggle
-   IntelliCode
-   vscode-icons
-   Vue Language Features (Volar)
-   TypeScript Vue Plugin (Volar)
-   Quokka.js
-   Import Cost
-   IntelliSense for CSS class names in HTML

## 内网穿透

免费的工具， [cpolar](https://www.cpolar.com/) 和 [netapp](https://natapp.cn/) 一共两个。

## Github 加速

Watt Toolkit-瓦特工具箱 （原 Steam++）现可在 windows store 中下载

![Alt text](/images/other/windows-env-setting/watt-toolkit.png)

当然也可以使用使用 v2rayN (可在 [just my sockets](https://justmysocks.net/) 购买)。

## 浏览器

win11 自带的 Edge 浏览器很不错，支持账号同步，功能非常全面（喜欢 Chrome、Firefox 可以自行安装），不管使用哪种浏览器一些必要的插件还是需要安装的。

下面是我常用的一些插件：

-   FeHelper 前端助手：提供一些常用的工具
-   Wappalyzer：查看当前访问网站使用的框架/库
-   AdBlock： 拦截广告
-   vue.js devtools：vue 开发者工具
-   Window Resizer：调整浏览器的大小
-   移动模拟器：模拟移动端，方便调试移动端网页
-   沉浸式翻译：一款翻译插件，可以提供双语对照，可以设置翻译源，功能挺不错

![Alt text](/images/other/windows-env-setting/browser.png)

## 其他

除了开发之外还有其他的一些软件：

-   Github Desktop：github 客户端
-   Foxmail：邮箱
-   snipaste：截图
-   网易云音乐：听歌
-   有道翻译：翻译软件，ctrl+alt+d 截图翻译非常方便
-   WPS：办公软件
-   nginx：反向代理工具
-   toDesk：远程访问工具
-   LICEcap：Gif 录制工具-简单好用
-   阿里云：可以同步一些文件
-   powerToys：增强 windows，功能很全面，微软开发
-   360 极速版：清理垃圾、下载软件的不二选择
-   Doctor Desktop：doctor 客户端
-   HBuilderX：跨端开发很方便，特别是有多个平台的小程序开发时，使用的是 vue 语法
-   Motrix: 下载功能
-   微信/QQ：聊天工具
-   企业微信/钉钉：办公软件
