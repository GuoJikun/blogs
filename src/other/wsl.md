# 如何在 windows 11 中安装 WSLG(WSL2)

## 什么是 WSL

WSL(Windows Subsystem for Linux)：`Windows`  系统中的一个子系统，在这个子系统上可以运行  `Linux`  操作系统。

可以让开发人员直接在  `Windows`  上按原样运行  `GNU/Linux`  环境（包括大多数命令行工具、实用工具和应用程序），且不会产生传统虚拟机或双启动设置开销。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45d50080824c40da96b269053664222a~tplv-k3u1fbpfcp-zoom-1.image)

## 什么是 WSL2？

`WSL2`  是适用于  `Linux`  的  `Windows`  子系统体系结构的一个新版本，它是对基础体系结构的一次重大改造。

它使用虚拟化技术和  `Linux`  内核来实现其新功能，主要目标是提高文件系统性能和添加完全的系统调用兼容性。

个人理解：

`WSL`：  并不是一个真正的  `Linux`  操作系统，仅仅是  `Linux`  应用程序与  `Windows`  操作系统之间的一个适配层。

在这个适配层之上，可以运行  `Linux`  应用程序，有点类似于以前的  `cygwin`  的方式。

`WSL2`：它就是一个虚拟机，类似于  `Vitual Box`，在这个虚拟机之上，运行一个完整的  `Linux`  操作系统。

相对于  `Virtual Box`、`VMWare`  来说，WSL2 提供更全面的兼容性、与  `Windows`  系统的互操作性更好、运行速度更快、占用系统资源更少。

## 激活 WSL 服务

> 开启`linux子系统`和`虚拟机平台`后，必须要重启系统才能生效。

### 开启方式 1-命令方式

按  `Win+X`, 启动  windows terminal (管理员)，注意：是带有管理员的这个啊。

或者直接在搜索窗口中输入  `windows terminal`, 然后选择以管理员方式运行：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1221a22ba054d9480a96713567ee734~tplv-k3u1fbpfcp-watermark.image)

`windows terminal`  的窗口是：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c78ca52f5b0451d8250a84ea82229c7~tplv-k3u1fbpfcp-watermark.image)

可以把  `windows terminal`  理解成升级版的、功能更强劲的  `PowerShell/cmd`。

在  `windows terminal`  窗口中，输入如下指令来激活  `WSL`  服务：

```bash
# 开启linux子系统
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
#开启虚拟机平台
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

### 开启方式 2-图形化

按下  `Win + R`，调出命令输入窗口。输入指令  `appwiz.cpl`。

点击左侧的  【启动或关闭 Windows 功能】：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3c481c6878e45beb65f27b326d97da1~tplv-k3u1fbpfcp-watermark.image)

弹出下面这个窗口：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/162fdc9d9ab0400c942f4fbb38b387c5~tplv-k3u1fbpfcp-watermark.image)

需要勾选【适用于 Linux 的 Windows 子系统】和【虚拟机平台】这两项。

接下来要做的事情，就是安装  `Ubuntu`  操作系统。

## 设置 WSL 的版本为 WSL2

```bash
wsl --set-default-version 2
```

## 执行更新 wsl 命令已确认 wsl 为最新版

```bash
wsl --update
wsl --install // 安装wslg
```

> 如果更新失败可以在更新设置中打开`接收其它Microsoft产品的更新`选项
>
> ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d28342e25a445e686cdaeb2885d6c15~tplv-k3u1fbpfcp-watermark.image)

## 安装 Ubuntu-20.04 操作系统

### 安装方式 1-命令安装

**查看可安装版本**

```bash
wsl --list --online // 列出所有可安装的linux版本
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a295c7db89d141e7a27ccfdb6d6262c4~tplv-k3u1fbpfcp-watermark.image)

**开始安装**

```bash
wsl --install -d Ubuntu-20.04 // 安装Ubuntu-20.04
```

### 安装方式 2-图形化（windows store）

启动 【Windows Store】并搜索  `Ubuntu`，然后选择要安装的系统

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/934fde56c8fc482b94ef3da24602b0c0~tplv-k3u1fbpfcp-watermark.image)

安装完成之后，点击【启动】按钮(图片-侵删)：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fc2cd342b6f4f54a92fb8d986958099~tplv-k3u1fbpfcp-zoom-1.image)

第一次打开速度稍微慢一些，大约 1 分钟左右吧，提示设置用户名、密码，然后就进入我们熟悉的窗口了(图片-侵删)：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e8b7a77d1f34fab8bd9ec0f7ee6bacb~tplv-k3u1fbpfcp-zoom-1.image)

这样，`Ubuntu-20.04`  系统就安装好了！

## 安装 GUI 程序并测试

```bash
sudo apt update
sudo apt upgrade
sudo apt install gedit // gnome桌面下的编辑器
```

命令执行完成功后会在开始菜单下生成`Ubuntu-20.04`文件下（如下图）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98a18d0226de44c68b337ca86deaa675~tplv-k3u1fbpfcp-watermark.image)

打开程序后如下图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f1f8fb44158460e86cf42091f8d1b8d~tplv-k3u1fbpfcp-watermark.image)

至此在 win11 下安装 wslg 教程完成。

## 参考

-   [在 Windows 10 上安装 WSL | Microsoft Docs](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)

-   [GUI 应用支持的初始预览现在可用于 Linux |的 Windows 子系统窗口命令行 (microsoft.com)](https://devblogs.microsoft.com/commandline/the-initial-preview-of-gui-app-support-is-now-available-for-the-windows-subsystem-for-linux-2/#getting-started-with-this-feature)
