# windows 上 Tauri 开发环境配置

Tauri 是一个构建适用于所有主流桌面和移动平台的轻快二进制文件的框架。
开发者们可以集成任何用于创建用户界面的可以被编译成 HTML、JavaScript 和 CSS 的前端框架，同时可以在必要时使用 Rust、Swift 和 Kotlin 等语言编写后端逻辑。

Tauri 使用 Microsoft C++ 构建工具进行开发以及 Microsoft Edge WebView2。这些都是在 Windows 上进行开发所必需的。

按照以下步骤安装所需的依赖项。

:::tip
请注意：Tauri 要求操作系统需要为 Win7 及其以上版本\
Tauri v2 rc 版本已发布，功能基本稳定
:::

## Microsoft C++ 构建工具

-   下载 [Microsoft C++ 生成工具 - Visual Studio](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)
    安装程序并打开它以开始安装。
-   在安装过程中，选中“使用 C++ 进行桌面开发”选项。

![1.png](/images/framework/tauri/env/1.png)

## Webview2

:::tip
WebView 2 已安装在 Windows 10（从版本 1803 开始）和更高版本的 Windows 上。
如果你正在这些版本之一上进行开发，则可以跳过此步骤并直接转到  [下载并安装 Rust](#rust)。
:::

Tauri 使用 Microsoft Edge WebView2 在 Windows 上呈现内容。

通过访问 [WebView2 Runtime 下载区](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/?form=MA13LH#download-section)
安装 WebView2。下载“常青版独立安装程序（Evergreen Boostrapper）”并安装它。

## Rust {#rust}

Tauri 使用  [Rust](https://www.rust-lang.org/)  构建并需要它进行开发。使用以下方法之一安装 Rust。

:::tip
你可以在  [官方网站](https://www.rust-lang.org/zh-CN/tools/install)  查看更多安装方法。
:::

-   前往  <https://www.rust-lang.org/tools/install>  下载  `rustup`。
-   或者使用 `winget install Rustlang.Rustup` 命令

请务必重新启动终端（在某些情况下重新启动系统）以使更改生效。

## 总结

在本章节我们学习了在开发 Tauri 应用的之前的环境搭建，要学习其他操作系统的 tauri 环境如何搭建，请[查看官方网站](https://v2.tauri.app/zh-cn/start/prerequisites/#rust)了解更多。
