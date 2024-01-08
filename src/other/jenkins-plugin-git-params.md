# 在 jenkins 中添加参数化构建

在之前的文章中，我们介绍了如何安装 Jenkins 并使用其构建 Vue.js 项目。然而，有时候我们希望构建不同的分支，而不是固定于一个特定的分支。
为了实现这个目标，我们可以使用 Jenkins 插件 - Git Parameter。这个插件允许我们在构建过程中动态地选择 Git 仓库中的分支，使得构建过程更加灵活。

## 步骤一：安装 Git Parameter 插件

首先，确保你已经在 Jenkins 中安装了 Git Parameter 插件。如果尚未安装，请按照以下步骤进行：

1. 登录 Jenkins 控制台。

2. 转到“Manage Jenkins” > “Manage Plugins” > “Available”选项卡。

3. 在搜索框中输入 “Git Parameter” 查找插件。

4. 找到 Git Parameter 插件并选中它。

5. 单击“Install without restart”按钮安装插件。

## 步骤二：配置参数化构建

现在，我们将配置一个新的 Jenkins Job，并添加 Git Parameter 以实现参数化构建。

1. 在 Jenkins 控制台，单击“New Item”创建一个新的 Freestyle 项目。

2. 在项目配置页面中，找到“General”部分，勾选“This project is parameterized”。

3. 单击“Add Parameter”并选择“Git Parameter”。

4. 在 “Name” 字段中输入参数名称，例如 “branch”。

5. 在“Parameter Type”中选择 “branch”.

![Alt text](/assets/other/jenkins-plugin-git-params/image.png)

## 步骤三：配置构建脚本

在构建脚本中，你可以使用`${branch}`这样的变量来引用 Git Parameter 中定义的分支参数。例如，你可以在构建步骤中使用以下命令：

```bash
# 清理工作空间
git clean -fdx

# 拉取指定分支
git checkout ${branch}
git pull origin ${branch}

# 在此添加你的构建步骤
npm install
npm run build
```

## 步骤四：保存并构建

保存项目配置后，你可以触发一次构建。在构建过程中，Jenkins 将提示选择分支名称，这个分支名称将作为参数传递给构建脚本。

通过这种方式，你就成功地实现了参数化构建，并使用 Git Parameter 插件动态选择要构建的分支。这对于具有多个分支的项目以及需要按需构建不同分支的情况非常有用。

通过上述步骤，你可以方便地扩展你的 Jenkins 构建，实现更加灵活和可定制的构建流程。希望这篇博客能帮助你更好地使用 Git Parameter 插件进行参数化构建。
