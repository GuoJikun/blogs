# 创建 Tauri 项目

在上一篇中，我们详细介绍了如何[在 Windows 上搭建 Tauri 开发环境](/framework/tauri/env)，包括安装所需的依赖项、配置开发工具以及处理常见的问题。
这为我们顺利开始 Tauri 开发提供了坚实的基础。

在本章中，我们将更进一步，学习如何创建一个全新的 Tauri 项目，并探讨如何将 Tauri 集成到一个已经存在的 Web 项目中。
Tauri 的灵活性使得它可以轻松地与现有的前端框架协作，无论是 Vue、React 还是其他 JavaScript 框架，帮助开发者将 Web 应用打包成轻量级的桌面应用程序。

## 1. 创建一个全新的 Tauri 项目

我们将首先学习如何从头开始创建一个全新的 Tauri 项目。
这是一个非常简单的过程，Tauri 提供了丰富的 CLI 工具来帮助开发者快速启动并运行应用程序。
你只需要几条命令，就可以生成一个包含前端和后端结构的完整 Tauri 项目。

### 创建项目的步骤

1.  **创建新项目**：
    使用 Tauri 提供的创建工具，运行以下命令启动一个新的项目：

    ```bash
    pnpm create tauri-app --rc
    ```

    你将会被要求选择前端框架（如 Vue、React 或纯 HTML/JavaScript），然后工具会为你自动生成一个基础项目。

    ![1.png](/images/framework/tauri/create/1.png)

2.  **运行项目**：
    进入项目目录后，运行以下命令以启动开发环境：

    ```bash
    pnpm tauri dev
    ```

    这样就会启动 Tauri 开发环境，Tauri 会自动生成一个桌面应用程序，并在 Windows 系统上运行。

    ![2.png](/images/framework/tauri/create/2.png)

## 2. 将 Tauri 添加到现有的 Web 项目

如果你已经有了一个 Web 项目，并且想要将其打包成一个桌面应用程序，那么将 Tauri 集成到现有项目中是一个不错的选择。Tauri 可以非常容易地集成到现有的项目中，而不需要进行大量的修改。

### 集成 Tauri 的步骤

1.  **进入现有项目目录**：
    首先，进入你的 Web 项目根目录，确保项目已经初始化为一个 Node.js 项目，并且有 `package.json` 文件。

2.  **安装 Tauri**：
    使用 npm 安装 Tauri 相关的依赖包：

    ```bash
    pnpm add -D @tauri-apps/cli@next
    ```

3.  **初始化 Tauri**：
    在项目中初始化 Tauri 环境，运行以下命令：

    ```bash
    npx tauri init
    ```

    你将被提示进行一些配置选择，比如应用的名字、窗口的标题、web 应用程序的目录、web 项目开发环境的运行地址等等。具体如下图

    ![3.png](/images/framework/tauri/create/3.png)

    Tauri 会在项目目录下生成一个 `src-tauri` 文件夹，其中包含所有的 Tauri 配置和 Rust 代码。

    **src-tauri** 目录结构如下图

    ![4.png](/images/framework/tauri/create/4.png)

4.  **运行项目**：
    完成集成后，你可以通过以下命令启动项目，并在桌面应用中查看你的 Web 应用：

    ```bash
    pnpm tauri dev
    ```

    运行成功效果图：
    ![5.png](/images/framework/tauri/create/5.png)
    通过这种方式，你可以将已有的 Web 应用打包为桌面应用，使用 Tauri 的 API 访问本地操作系统功能，从而实现更多的应用场景。

## 结论

通过学习这两种创建 Tauri 应用的方式，你已经能够在 Windows 上快速构建和运行桌面应用程序。
无论是全新创建的项目，还是将 Tauri 添加到现有 Web 项目中，这都为你的开发工作提供了巨大的便利。
在接下来的章节中，我们将进一步探索 Tauri 的 API，学习如何与操作系统交互，如何使用 Tauri 提供的后端 Rust 代码增强应用功能。

## 参考

-   [官网文档](https://beta.tauri.app/start/create-project/)
