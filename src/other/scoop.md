# Scoop 的安装

[scoop](https://scoop.sh/)是一个类似于 linux 下 apt、rpm、pacman 之类包管理器

## 前置条件

确保 PowerShell 5 (or later, include PowerShell Core) and .NET Framework 4.5 (or later) 已经安装。

## 默认安装

```bash
#默认安装目录：C:\Users\<user>\scoop
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
# or shorter
iwr -useb get.scoop.sh | iex
```

## 自定义安装 scoop 目录

```bash
[environment]::setEnvironmentVariable('SCOOP','D:\Applications\Scoop','User') #第二个参数是自定义目录
$env:SCOOP='D:\Applications\Scoop' #和上一条命令的自定义目录相同
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh') #如果执行此命令报错-->set-executionpolicy remotesigned -scope currentuser
```

## 使用（常用的）

```bash
scoop search <package> #搜索包

scoop install <package> #安装包

scoop checkup #检测scoop

scoop cleanup <package> #移除旧版本的包

scoop bucket known #查看有哪几个bucket(仓库)

scoop bucket list #查看已添加的 bucket (仓库)

scoop bucket add bucketName #添加bucket(仓库)

scoop bucket rm bucketName  #移除bucket(仓库)
```

全部的命令可以输入 `scoop` 查看
