import{av as s,o as i,c as a,aR as e,bw as n,bx as t,by as p,bz as h,bA as o,bB as l,bC as d,bD as r,bE as k,bF as c,bG as g,bH as F,bI as u,bJ as b,bK as _,bL as m,bM as v,bN as C}from"./chunks/framework.BlZS6pWm.js";const z=JSON.parse('{"title":"使用jenkins一键发布vue项目","description":"","frontmatter":{},"headers":[],"relativePath":"other/jenkins-vue.md","filePath":"other/jenkins-vue.md","lastUpdated":1716254632000}'),y={name:"other/jenkins-vue.md"},j=e(`<h1 id="使用jenkins一键发布vue项目" tabindex="-1">使用jenkins一键发布vue项目 <a class="header-anchor" href="#使用jenkins一键发布vue项目" aria-label="Permalink to &quot;使用jenkins一键发布vue项目&quot;">​</a></h1><h2 id="jenkins的安装" tabindex="-1">jenkins的安装 <a class="header-anchor" href="#jenkins的安装" aria-label="Permalink to &quot;jenkins的安装&quot;">​</a></h2><p>Jenkins是一款开源 CI&amp;CD 软件，用于自动化各种任务，包括构建、测试和部署软件。</p><p>Jenkins 支持各种运行方式，可通过系统包、Docker 或者通过一个独立的 Java 程序。</p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><p>这里的操作系统为WSL Ubuntu，其它系统的安装的请参考<a href="https://www.jenkins.io/zh/doc/book/installing/" target="_blank" rel="noreferrer">jenkins官方文档</a></p><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -q</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -O</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://pkg.jenkins.io/debian/jenkins.io.key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-key</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;echo deb http://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jenkins</span></span></code></pre></div><h3 id="更换端口号-默认运行在8080端口" tabindex="-1">更换端口号（默认运行在8080端口） <a class="header-anchor" href="#更换端口号-默认运行在8080端口" aria-label="Permalink to &quot;更换端口号（默认运行在8080端口）&quot;">​</a></h3><p>jenkins的配置文件在 <code>/etc/default/jenkins</code>；在其中找到<code>HTTP-PORT</code>并修改</p><p><img src="`+n+`" alt="企业微信截图_20210507124427.png"></p><h3 id="运行" tabindex="-1">运行 <a class="header-anchor" href="#运行" aria-label="Permalink to &quot;运行&quot;">​</a></h3><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jenkins</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># OR</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jenkins</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span></span></code></pre></div><p>如果要开机自动运行</p><div class="language-zsh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jenkins</span></span></code></pre></div><p>如果运行时碰到如下图的错误，请先安装jdk</p><p><img src="`+t+'" alt="企业微信截图_20210507124308.png"></p><h3 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h3><p>启动成功后输入对应的地址<code>(ip:port)</code>进入<code>jenkins管理界面</code>-如下图</p><p><img src="'+p+'" alt="企业微信截图_20210507124747.png"></p><p>在<code>上图中红色字体对应的文件</code>中拿到默认的管理员密码-具体命令</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/jenkins/secrets/initialAdminPassword</span></span></code></pre></div><p>命令执行完成后返回如下图</p><p><img src="'+h+'" alt="企业微信截图_20210507125217.png"></p><p>输入密码之后进入到<code>自定义Jenkins</code>界面（如下图）</p><p><img src="'+o+'" alt="企业微信截图_20210507125324.png"></p><p>在此界面我们选择<code>安装推荐的插件</code>就会开始安装插件；如下图</p><p><img src="'+l+'" alt="企业微信截图_20210507125519.png"></p><p><code>插件安装完成后</code>就会自动进入<code>设置用户名密码</code>界面（如下图）</p><p><img src="'+d+'" alt="企业微信截图_20210507125805.png"></p><p>输入完成后点击按钮<code>保存并完成</code>就会进入下一个界面<code>实例配置</code></p><p><img src="'+r+'" alt="企业微信截图_20210507130109.png"></p><p>点击按钮<code>保存并完成</code>就进入一个新界面，再点击其中的按钮<code>开始使用Jenkins</code>就进入了<code>jenkins的主界面</code>（如下图），至此就完成了jenkins的安装与基础配置。</p><p><img src="'+k+'" alt="企业微信截图_20210507130412.png"></p><h2 id="发布vue项目" tabindex="-1">发布vue项目 <a class="header-anchor" href="#发布vue项目" aria-label="Permalink to &quot;发布vue项目&quot;">​</a></h2><p>打包vue项目需要nodejs，打包完成后需要通过ssh把打包好的文件上传到目标服务器上。所以下面我们将会来安装jenkins的<code>nodejs</code>插件和<code>Publish Over SSH</code>插件。</p><h3 id="安装插件-nodejs" tabindex="-1">安装插件-nodejs <a class="header-anchor" href="#安装插件-nodejs" aria-label="Permalink to &quot;安装插件-nodejs&quot;">​</a></h3><p>在jenkins主界面<code>工作台</code>，依次点击<code>系统管理&gt;插件管理</code>进入插件管理界面(如下图)</p><p><img src="'+c+'" alt="企业微信截图_20210507142101.png"></p><p>搜索结果如下图</p><p><img src="'+g+'" alt="plugins nodejs.png"></p><p>勾选完插件并点击安装后进入到插件下载界面(如下图)</p><p><img src="'+F+'" alt="企业微信截图_20210508083514.png"></p><h3 id="配置nodejs插件" tabindex="-1">配置nodejs插件 <a class="header-anchor" href="#配置nodejs插件" aria-label="Permalink to &quot;配置nodejs插件&quot;">​</a></h3><p>在jenkins主界面<code>工作台</code>，依次点击<code>系统管理&gt;全局工具设置</code>进入插件管理界面并找到NodeJs选项(如下图)</p><p><img src="'+u+'" alt="企业微信截图_20210508084303.png"></p><h3 id="安装publish-over-ssh插件并配置" tabindex="-1">安装<code>Publish Over SSH</code>插件并配置 <a class="header-anchor" href="#安装publish-over-ssh插件并配置" aria-label="Permalink to &quot;安装`Publish Over SSH`插件并配置&quot;">​</a></h3><p><code>Publish Over SSH</code>插件的安装和<code>nodejs插件</code>是一样，安装完成后开始配置插件；</p><p>在jenkins主界面<code>工作台</code>，依次点击<code>系统管理&gt;系统配置</code>进入插件配置界面，滚动到<code>Publish over SSH</code>的位置，然后点击<code>SSH Servers</code>下面的<code>新增按钮</code>(如下图)</p><p><img src="'+b+'" alt="企业微信截图_20210508113827.png"> 点击按钮<code>高级</code>后出现的界面如下</p><p><img src="'+_+'" alt="企业微信截图_20210508114150.png"></p><h3 id="创建任务" tabindex="-1">创建任务 <a class="header-anchor" href="#创建任务" aria-label="Permalink to &quot;创建任务&quot;">​</a></h3><p>至此，打包vue所需的jenkins插件都已经安装完成，下面我们开始创建vue项目打包的任务。</p><p>具体操作如下图</p><p><img src="'+m+'" alt="企业微信截图_20210507135244.png"></p><p>点击按钮<code>确定</code>后，如下图</p><p><img src="'+v+'" alt="FireShot Pro Webpage Screenshot #002 - &#39;vue-test Config [Jenkins]&#39; - localhost.png"></p><p>安装上图所说的配置完成后点击<code>保存</code>按钮就会跳转到所创建任务的详情界面。</p><p><img src="'+C+'" alt="企业微信截图_20210508143239.png"></p><p>至此一个我们便实现了一个简单的一键打包前端项目的jenkins配置。</p><div class="warning custom-block"><p class="custom-block-title">结束语</p><p>如有疏漏，欢迎指出 <br> 您的点赞就是对我最大的认可。</p></div>',60),B=[j];function E(P,f,q,S,x,J){return i(),a("div",null,B)}const A=s(y,[["render",E]]);export{z as __pageData,A as default};
