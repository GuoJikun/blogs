# 更改wsl中系统的安装位置

wsl默认安装位置是C盘，众所周知C盘总是不够用的，所以才有了把wsl的系统迁移到其它位置的需求。[官网文档](https://learn.microsoft.com/zh-cn/windows/wsl/use-custom-distro)

## 首先查看所有分发版本

```bash
wsl -l --all -v
```

## 导出分发版为tar文件到D盘

```bash
wsl --export Ubuntu-20.04 D:\ubuntu20.04.tar
```

## 注销当前分发版

```bash
wsl --unregister Ubuntu-20.04
```

## 重新导入并安装分发版在D:\wsl\ubuntu

```bash
wsl --import Ubuntu-20.04 D:\wsl\ubuntu D:\ubuntu20.04.tar --version 2
```

## 设置默认登陆用户为安装时用户名

```bash
ubuntu2004 config --default-user Username
```

删除导出的tar文件(可选)

```bash
del D:\ubuntu20.04.tar
```
