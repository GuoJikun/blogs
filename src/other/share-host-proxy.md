---
title: VMware 虚拟机(Ubuntu 24.04)共享宿主机代理
---

:::success 环境
VMWare： 17
宿主机系统：win11 24H2
虚拟机内的系统：Ubuntu 24.04
:::

## 前言

由于需要在 Linux 环境下进行一些测试工作，于是决定使用 VMware 虚拟化软件来安装 Ubuntu 24.04 操作系统。
考虑到测试过程中需要访问 Github 等外部网络资源，因此产生了让 Ubuntu 虚拟机共享宿主机（即运行 VMware 的物理机器）代理设置的需求。

## 设置 V2rayN

-   打开 v2rayN 客户端。
-   进入“设置”选项卡下的“参数设置”。
-   找到“允许来自局域网的连接”选项并勾选它。
-   保存设置。

![v2rayN 配置](/images/other/share-host-proxy/1.png)

## VMWare 虚拟机配置

-   在 VMware 中创建或打开您的 Ubuntu 24.04 虚拟机。
-   进入虚拟机的`设置`或`编辑虚拟机设置`。
-   寻找网络适配器设置。
-   将网络连接模式更改为 `NAT 模式`。
-   确认虚拟机网络适配器绑定到了 VMnet8。

![vmware 配置](/images/other/share-host-proxy/2.png)

## 读取宿主机 ip{#host_vmnet8-ip}

-   在宿主机上打开命令行工具(Powershell/CMD)。
-   输入命令 `ipconfig`
-   查找与 VMnet8 相关的 IP 地址。通常格式为 `192.168.x.x`。

![alt text](/images/other/share-host-proxy/4.png)

:::info Note
由于 VMWare 网络设置为 `NAT 模式` 后走的是 `VMnet8`，所以查询这个适配器的 `ip`
:::

## ubuntu 配置

-   在 Ubuntu 虚拟机中打开 `设置`。
-   转到`网络`设置。
-   选择`代理`选项。
-   在代理设置界面中，选择手动代理配置。
-   在 HTTP 和 HTTPS 代理服务器地址栏中输入宿主机的 VMnet8 IP 地址（例如：192.168.x.x），端口保持与 v2rayN 一致。
-   保存代理设置

![ubuntu 网络配置](/images/other/share-host-proxy/3.png)

## 结束语

完成上述步骤后，您的 Ubuntu 虚拟机应该能够通过宿主机的代理访问互联网。如果在实施过程中遇到任何问题，可以尝试重启虚拟机或者检查代理服务器的端口号是否正确。
请注意，这里的步骤假定您已经在宿主机上配置好了 v2rayN 代理服务，并且宿主机的操作系统支持这些操作。如果您使用的是不同的代理软件或者操作系统，部分步骤可能有所不同。

如果您在实施过程中遇到任何问题或有进一步的疑问，请随时在下方留言区交流。
