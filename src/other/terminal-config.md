# Windows Terminal 简单美化

## 需要用到的软件/插件

-   `oh-my-posh`
-   `posh-git`
-   `PSReadLine`

## 安装 `oh-my-posh`

`oh-my-posh` 是 shell 主题引擎，使用 `winget` 来安装 `oh-my-posh`

```bash
winget serach oh-my-posh # 找到对应的 id 方便在下一步使用（具体见下图）
winget install JanDeDobbeleer.OhMyPosh # 等该命令执行完成就安装好了
```

![image.png](/images/other/terminal-config/1.png)

## 安装字体

由于 `oh-my-posh` 主题一般都有一些比较特殊的符号，如果安装后 powershell 提示符出现方框类的字符就需要安装字体了。

```bash
oh-my-posh font install # 如果安装 oh-my-posh 时是全局安装则需要管理员权限去执行这条命令
```

![image.png](/images/other/terminal-config/2.png)

## 安装 posh-git

```bash
PowerShellGet\Install-Module posh-git -Scope CurrentUser # -Scope CurrentUser 表示当前用户
```

## 安装/升级 PSReadLine

```bash
PowerShellGet\Install-Module posh-git -Scope CurrentUser
# -Scope CurrentUser 表示当前用户
# Install-Module 安装模块
# Update-Module 升级模块
```

安装之后的效果（灰色部分为之前输入过的命令，可以按方向键的上下进行切换）：

![image.png](/images/other/terminal-config/3.png)

:::warning 注意
这个工具主要做命令提示管理等操作；安装操作可选的（ 这个模块是自带的，如果不可用时需要卸载并重新安装）
:::

## 配置文件

```bash
notepad $profile # 有 vscode 可以使用 code $prifile 来配置
```

在弹出的窗口中将下面的内容复制进入即可

```bash
Import-Module posh-git  # 在当前打开的 PowerShell 终端中引入 posh-git（已安装，这里只是引入）
Import-Module PSReadLine  # 这个工具主要做命令提示管理等操作，默认集成在 PowerShell 中，不需要安装
Set-PSReadlineKeyHandler -Key Tab -Function Complete  # 设置 Tab 键补全
Set-PSReadLineKeyHandler -Key "Ctrl+d" -Function MenuComplete  # 设置 Ctrl+D 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo  # 设置 Ctrl+Z 为撤销
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward  # 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward  # 设置向下键为前向搜索历史记录

# 启动时加载 ohMyPosh
# --config 是加载 oh-my-posh 配置的
oh-my-posh init pwsh --config D:\Software\oh-my-posh\conf\pure.omp.json | Invoke-Expression
Import-Module scoop-completion
```

最后重启终端就可以看到效果了。

## 参考/附录

-   [Windows 程序包管理器 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/package-manager/)
-   [Windows | Oh My Posh](https://ohmyposh.dev/docs/installation/windows)
-   [posh-git/README.md at v0 · dahlbyk/posh-git (github.com)](https://github.com/dahlbyk/posh-git/blob/v0/README.md)
