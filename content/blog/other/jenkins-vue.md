# 使用jenkins一键发布vue项目

## jenkins的安装

Jenkins是一款开源 CI&CD 软件，用于自动化各种任务，包括构建、测试和部署软件。

Jenkins 支持各种运行方式，可通过系统包、Docker 或者通过一个独立的 Java 程序。

### 安装

这里的操作系统为WSL Ubuntu，其它系统的安装的请参考[jenkins官方文档](https://www.jenkins.io/zh/doc/book/installing/)

```zsh
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```


### 更换端口号（默认运行在8080端口）

jenkins的配置文件在  `/etc/default/jenkins`；在其中找到`HTTP-PORT`并修改

![企业微信截图_20210507124427.png](/images/other/jenkins-vue/1.png)

### 运行

```zsh
sudo systemctl start jenkins
# OR
sudo service jenkins start
```

如果要开机自动运行
```zsh
sudo systemctl enable jenkins
```
如果运行时碰到如下图的错误，请先安装jdk

![企业微信截图_20210507124308.png](/images/other/jenkins-vue/2.png)

### 基础配置

启动成功后输入对应的地址`(ip:port)`进入`jenkins管理界面`-如下图

![企业微信截图_20210507124747.png](/images/other/jenkins-vue/3.png)

在`上图中红色字体对应的文件`中拿到默认的管理员密码-具体命令
```bash
cat /var/lib/jenkins/secrets/initialAdminPassword
```
命令执行完成后返回如下图

![企业微信截图_20210507125217.png](/images/other/jenkins-vue/4.png)

输入密码之后进入到`自定义Jenkins`界面（如下图）

![企业微信截图_20210507125324.png](/images/other/jenkins-vue/5.png)

在此界面我们选择`安装推荐的插件`就会开始安装插件；如下图

![企业微信截图_20210507125519.png](/images/other/jenkins-vue/6.png)

`插件安装完成后`就会自动进入`设置用户名密码`界面（如下图）

![企业微信截图_20210507125805.png](/images/other/jenkins-vue/7.png)

输入完成后点击按钮`保存并完成`就会进入下一个界面`实例配置`

![企业微信截图_20210507130109.png](/images/other/jenkins-vue/8.png)

点击按钮`保存并完成`就进入一个新界面，再点击其中的按钮`开始使用Jenkins`就进入了`jenkins的主界面`（如下图），至此就完成了jenkins的安装与基础配置。

![企业微信截图_20210507130412.png](/images/other/jenkins-vue/9.png)

## 发布vue项目

打包vue项目需要nodejs，打包完成后需要通过ssh把打包好的文件上传到目标服务器上。所以下面我们将会来安装jenkins的`nodejs`插件和`Publish Over SSH`插件。

### 安装插件-nodejs

在jenkins主界面`工作台`，依次点击`系统管理>插件管理`进入插件管理界面(如下图)

![企业微信截图_20210507142101.png](/images/other/jenkins-vue/10.png)

搜索结果如下图

![plugins nodejs.png](/images/other/jenkins-vue/11.png)

勾选完插件并点击安装后进入到插件下载界面(如下图)

![企业微信截图_20210508083514.png](/images/other/jenkins-vue/12.png)

### 配置nodejs插件

在jenkins主界面`工作台`，依次点击`系统管理>全局工具设置`进入插件管理界面并找到NodeJs选项(如下图)

![企业微信截图_20210508084303.png](/images/other/jenkins-vue/13.png)

### 安装`Publish Over SSH`插件并配置

`Publish Over SSH`插件的安装和`nodejs插件`是一样，安装完成后开始配置插件；

在jenkins主界面`工作台`，依次点击`系统管理>系统配置`进入插件配置界面，滚动到`Publish over SSH`的位置，然后点击`SSH Servers`下面的`新增按钮`(如下图)

![企业微信截图_20210508113827.png](/images/other/jenkins-vue/14.png)
点击按钮`高级`后出现的界面如下

![企业微信截图_20210508114150.png](/images/other/jenkins-vue/15.png)


### 创建任务

至此，打包vue所需的jenkins插件都已经安装完成，下面我们开始创建vue项目打包的任务。

具体操作如下图

![企业微信截图_20210507135244.png](/images/other/jenkins-vue/16.png)

点击按钮`确定`后，如下图

![FireShot Pro Webpage Screenshot #002 - 'vue-test Config [Jenkins]' - localhost.png](/images/other/jenkins-vue/17.png)

安装上图所说的配置完成后点击`保存`按钮就会跳转到所创建任务的详情界面。

![企业微信截图_20210508143239.png](/images/other/jenkins-vue/18.png)

至此一个我们便实现了一个简单的一键打包前端项目的jenkins配置。

::: warning 结束语
如有疏漏，欢迎指出 <br> 您的点赞就是对我最大的认可。
:::

