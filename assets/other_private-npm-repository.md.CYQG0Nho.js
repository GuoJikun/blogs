import{av as s,o as i,c as a,aR as n}from"./chunks/framework.BlZS6pWm.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"other/private-npm-repository.md","filePath":"other/private-npm-repository.md","lastUpdated":1716254632000}'),p={name:"other/private-npm-repository.md"},l=n(`<div class="tip custom-block"><p class="custom-block-title">前言</p><p>公司内部前端组件或库的共享等，搭建一个<code>npm</code>私有库就很方便，现在中大型公司也基本都有自己的<code>npm</code>私有库，这篇文章，和大家一起共同搭建一个<code>npm</code>私有库，共同学习</p></div><h2 id="前置条件" tabindex="-1">前置条件 <a class="header-anchor" href="#前置条件" aria-label="Permalink to &quot;前置条件&quot;">​</a></h2><ol><li>一台电脑</li><li>可以联网</li></ol><h2 id="一、安装-docker" tabindex="-1">一、安装 docker <a class="header-anchor" href="#一、安装-docker" aria-label="Permalink to &quot;一、安装 docker&quot;">​</a></h2><p>使用的 windows 版本的 <code>docker Desktop</code>, 可以直接去 docker Desktop <a href="https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&amp;utm_medium=webreferral&amp;utm_campaign=dd-smartbutton&amp;utm_location=module" target="_blank" rel="noreferrer">官方网站</a>去下载，下载完成后正常安装就可以了。</p><p>或者使用 <code>winget</code> 安装</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Docker.DockerDesktop</span></span></code></pre></div><h3 id="linux-下的安装" tabindex="-1">linux 下的安装 <a class="header-anchor" href="#linux-下的安装" aria-label="Permalink to &quot;linux 下的安装&quot;">​</a></h3><p>直接使用各个发行版对应的 pkg manangment 安装，由于本人最熟悉 ubuntu，下面给出 ubuntu 下的安装命令</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#Ubuntu</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 如需要使用docker-compose可以使用此命令安装</span></span></code></pre></div><h2 id="二、基于-docker-安装-verdaccio" tabindex="-1">二、基于 Docker 安装 Verdaccio <a class="header-anchor" href="#二、基于-docker-安装-verdaccio" aria-label="Permalink to &quot;二、基于 Docker 安装 Verdaccio&quot;">​</a></h2><h3 id="_1、创建相关的目录" tabindex="-1">1、创建相关的目录 <a class="header-anchor" href="#_1、创建相关的目录" aria-label="Permalink to &quot;1、创建相关的目录&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /opt/Docer-container/verdaccio</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /opt/Docer-container/verdaccio</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> conf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> storage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> plugins</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./storage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> htpasswd</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ../conf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config.yaml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config.yaml</span></span></code></pre></div><h3 id="_2、创建配置文件" tabindex="-1">2、创建配置文件 <a class="header-anchor" href="#_2、创建配置文件" aria-label="Permalink to &quot;2、创建配置文件&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 存放软件所有软件包的目录</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">storage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/verdaccio/storage/data</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 存放所有插件的目录</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">plugins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/verdaccio/plugins</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">web</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 网站Title</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Verdaccio</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 禁用Gravatar头像</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # gravatar: false</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 排序方式 asc|desc</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # sort_packages: asc</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 是否启用暗黑模式</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # darkMode: true</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # logo地址</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # logo: http://somedomain/somelogo.png</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # favicon地址</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # favicon: http://somedomain/favicon.ico | /path/favicon.ico</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># i18n翻译配置</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># i18n:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可用列表见：https://github.com/verdaccio/ui/tree/master/i18n/translations</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   web: en-US</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">auth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  htpasswd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/verdaccio/storage/htpasswd</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 最大注册用户数，默认为 &quot;+inf&quot;.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 可用通过设置为-1禁止注册</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # max_users: 1000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 上游npm库，可以设置多个</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">uplinks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  npmjs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://registry.npmjs.org/</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  taobao</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://registry.npmmirror.com/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">packages</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# 作用域包</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &#39;@*/*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 允许所有人访问</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    access</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$all</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 注册用户可访问</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    publish</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$authenticated</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 注册用户可访问</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    unpublish</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$authenticated</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    proxy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">npmjs</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &#39;**&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 默认情况下所有用户 (包括未授权用户) 都可以查看和发布任意包</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 你可以指定 用户名/分组名 (取决于你使用什么授权插件，默认的授权插件是内置的 htpasswd)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 访问权限有三个关键词: &quot;$all&quot;, &quot;$anonymous&quot;, &quot;$authenticated&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # $all 表示不限制，任何人可访问；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # $anonymous 表示未注册用户可访问；</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # $authenticated 表示只有注册用户可访问</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    access</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$all</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 允许所有注册用户发布/撤销已发布的软件包</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # (注意：默认情况下任何人都可以注册)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    publish</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$authenticated</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    unpublish</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$authenticated</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 如果私有包服务不可用在本地，则会代理请求到&#39;npmjs&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # proxy 可以有多个值，多个值用空格分开</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    proxy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">taobao npmjs</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 您可以指定传入连接的HTTP /1.1服务器保持活动超时（以秒为单位）。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 值为0会使http服务器的行为类似于8.0.0之前的Node.js版本，后者没有保持活动超时。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 解决方法：通过给定的配置可以解决以下问题</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  keepAliveTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 中间件</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">middlewares</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  audit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 日志设置</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">logs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">stdout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">pretty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">level</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 开放远程访问，允许所有IP</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">listen</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0.0.0.0:4873</span></span></code></pre></div><h3 id="_3、安装运行-verdaccio" tabindex="-1">3、安装运行 Verdaccio <a class="header-anchor" href="#_3、安装运行-verdaccio" aria-label="Permalink to &quot;3、安装运行 Verdaccio&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> verdaccio</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-p </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">4873:4873</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-v </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/opt/Docker-container/Verdanccio/conf:/verdaccio/conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-v </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/opt/Docker-container/Verdanccio/storage:/verdaccio/storage</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-v </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/opt/Docker-container/Verdanccio/plugins:/verdaccio/plugins</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">verdaccio/verdaccio</span></span></code></pre></div><blockquote><p>运行成功后就可以通过<code>http://服务器ip:4873</code>访问<code>npm</code>私有库了。</p></blockquote><p>报错处理：</p><p>如果提示 <code>fatal--- cannot open config file /verdaccio/conf/config.yaml: Error: CONFIG: it does not look like a valid config file</code>, 可以执行下面的命令</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chcon</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -Rt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> container_file_t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./conf</span></span></code></pre></div><p>更多解决方法请查看<a href="https://verdaccio.org/zh-CN/docs/docker" target="_blank" rel="noreferrer">官方文档</a></p><h2 id="三、管理-npn、yarn、pnpm-源" tabindex="-1">三、管理 npn、yarn、pnpm 源 <a class="header-anchor" href="#三、管理-npn、yarn、pnpm-源" aria-label="Permalink to &quot;三、管理 npn、yarn、pnpm 源&quot;">​</a></h2><h3 id="_1、替换-npn、yarn、pnpm-源为-http-192-168-188-164-4873" tabindex="-1">1、替换 npn、yarn、pnpm 源为 <code>http://192.168.188.164:4873/</code> <a class="header-anchor" href="#_1、替换-npn、yarn、pnpm-源为-http-192-168-188-164-4873" aria-label="Permalink to &quot;1、替换 npn、yarn、pnpm 源为 \`http://192.168.188.164:4873/\`&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># npm 和 pnpm 设置（pnpm 使用 npm 配置的源）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://192.168.188.164:4873/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># yarn 设置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://192.168.188.164:4873/</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # -g是全局设置</span></span></code></pre></div><p>直接把默认的 <code>npm</code> 源替换为我们私有库，但是多个源的时候不太好管理。所以推荐使用 <code>nrm</code> 来管理我们的 <code>npm</code> 源。</p><h3 id="_2、使用-nrm-管理-npm-源" tabindex="-1">2、使用 <code>nrm</code> 管理 <code>npm</code> 源 <a class="header-anchor" href="#_2、使用-nrm-管理-npm-源" aria-label="Permalink to &quot;2、使用 \`nrm\` 管理 \`npm\` 源&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 全局安装 nrm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nrm</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加私有库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nrm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://192.168.188.164:4873</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看现有的 npm 源</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nrm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ls</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  npm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ----------</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://registry.npmjs.org/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  yarn</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ---------</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://registry.yarnpkg.com/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  tencent</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ------</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://mirrors.cloud.tencent.com/npm/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  cnpm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ---------</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://r.cnpmjs.org/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  taobao</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -------</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://registry.npmmirror.com/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  npmMirror</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ----</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://skimdb.npmjs.com/registry/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  private</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ------</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://192.168.188.164:10086/repository/npm/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> vnpm --------- http://192.168.188.164:4873/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置npm源</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nrm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> use</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vnpm</span></span></code></pre></div><blockquote><p>管理 <code>yarn</code> 的源，可以使用 <code>yrm</code> 来管理；用法同 <code>nrm</code></p></blockquote><h2 id="四、注册用户和发布-npm-包" tabindex="-1">四、注册用户和发布 npm 包 <a class="header-anchor" href="#四、注册用户和发布-npm-包" aria-label="Permalink to &quot;四、注册用户和发布 npm 包&quot;">​</a></h2><h3 id="_1、注册私有库用户" tabindex="-1">1、注册私有库用户 <a class="header-anchor" href="#_1、注册私有库用户" aria-label="Permalink to &quot;1、注册私有库用户&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 注册用户</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> adduser</span></span></code></pre></div><h3 id="_2、登陆私有库用户" tabindex="-1">2、登陆私有库用户 <a class="header-anchor" href="#_2、登陆私有库用户" aria-label="Permalink to &quot;2、登陆私有库用户&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 登录用户</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> login</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前登录用户</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> who</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> am</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span></span></code></pre></div><h3 id="_3、在私有库发布包" tabindex="-1">3、在私有库发布包 <a class="header-anchor" href="#_3、在私有库发布包" aria-label="Permalink to &quot;3、在私有库发布包&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 发布当前包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> publish</span></span></code></pre></div><blockquote><p>到此，所有的安装，注册用户，发布包流程都已经完成了，各位小伙伴如果有什么问题可以私聊/留言。</p></blockquote>`,37),h=[l];function t(k,e,r,d,c,o){return i(),a("div",null,h)}const y=s(p,[["render",t]]);export{F as __pageData,y as default};
