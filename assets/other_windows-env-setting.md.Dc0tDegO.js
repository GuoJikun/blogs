import{av as i,o as s,c as a,aR as l,bS as e,bT as t,bU as n,bV as o}from"./chunks/framework.BlZS6pWm.js";const v=JSON.parse('{"title":"Web 前端工程的装机必备软件","description":"","frontmatter":{},"headers":[],"relativePath":"other/windows-env-setting.md","filePath":"other/windows-env-setting.md","lastUpdated":1716254632000}'),h={name:"other/windows-env-setting.md"},p=l('<h1 id="web-前端工程的装机必备软件" tabindex="-1">Web 前端工程的装机必备软件 <a class="header-anchor" href="#web-前端工程的装机必备软件" aria-label="Permalink to &quot;Web 前端工程的装机必备软件&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>最近作者的电脑 C 盘变红了，这让我很难受(有点小强迫症)，所以准备重新安装下系统，顺便把 C 盘扩大点。</p><div class="tip custom-block"><p class="custom-block-title">注意</p><p>操作系统是 windows 11 23H2。<br> 所有的命令行都是使用 Windows Terminal 中进行的。</p></div><h2 id="安装-windows-terminal" tabindex="-1">安装 Windows Terminal <a class="header-anchor" href="#安装-windows-terminal" aria-label="Permalink to &quot;安装 Windows Terminal&quot;">​</a></h2><p>由于我们所有的命令行操作都是在 Windows Terminal 中进行的， 所以第一步先按章配置 Windows Terminal（win11 是自带的，其他系统可以在系统商店搜索 terminal 进行安装）； Windows Terminal 默认支持多种 shell 环境（<code>cmd</code>、<code>powershell</code>、<code>Azure Cloud Shell</code>）， 另外还支持自定义添加其他的 shell 环境（如：git 自带的 git-bash；wsl 等等）</p><p><img src="'+e+`" alt="windows terminal"></p><blockquote><p>关于 Windows Terminal 美化可以参考<a href="/other/terminal-config.html">这个</a></p><p>如果执行脚本提示此系统禁止运行脚本可以执行 <code>set-ExecutionPolicy RemoteSigned</code> 解除禁制</p></blockquote><h2 id="安装-nvm-node-版本管理工具" tabindex="-1">安装 <code>nvm</code> - node 版本管理工具 <a class="header-anchor" href="#安装-nvm-node-版本管理工具" aria-label="Permalink to &quot;安装 \`nvm\` - node 版本管理工具&quot;">​</a></h2><p>作为 web 前端开发工程师，nodejs 肯定是必不可少的， nvm（Node Version Manager）是一个用于管理 Node.js 版本的工具，它提供了一些常用的命令来操作 Node.js 版本。 所以我们先来安装 <code>nvm</code>， 由于 win11 自带了 <code>winget</code> 包管理工具，所有下面我们使用 <code>winget</code> 来安装 <code>nvm</code>。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CoreyButler.NVMforWindows</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装前需要先使用 winget search 进行搜索，找到对应的 id（如上面的 CoreyButler.NVMforWindows）</span></span></code></pre></div><blockquote><p>具体的安装步骤可以参考作者的<a href="https://juejin.cn/post/7119439575654596616" target="_blank" rel="noreferrer">这篇博文</a></p></blockquote><p><strong>以下是一些常用的 nvm 命令：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [version] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装指定版本的Node.js。如果未指定版本，则默认安装最新版本。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [version] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到指定版本的Node.js。如果未指定版本，则默认切换到最新版本。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> uninstall</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [version] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 卸载指定版本的Node.js。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 列出已安装的所有 Node.js版本。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> current</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 显示当前正在使用的Node.js版本。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> alias</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [from] [to] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建或修改别名，以方便切换不同版本的Node.js。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [version] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置默认的Node.js版本。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> node_mirror</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [url] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置Node.js的镜像源地址。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm_mirror</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [url] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置npm的镜像源地址。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 开启Node.js版本管理。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> off</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 关闭Node.js版本管理。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> proxy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [url] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置下载代理。</span></span></code></pre></div><h2 id="安装-nodejs" tabindex="-1">安装 NodeJS <a class="header-anchor" href="#安装-nodejs" aria-label="Permalink to &quot;安装 NodeJS&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lts</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 安装nodeJs 最新的 lts 版本</span></span></code></pre></div><p>安装完成后就可以执行 <code>node -v</code> 查看当前的 node 版本了。</p><p>node 安装完成后，也可以安装一些常用的工具：</p><ul><li>nrm / yrm 用来管理包管理器的源地址，nrm-npm；yrm-yarn</li><li>pnpm / yarn / cnpm 包管理器-喜欢哪个装哪个，也可以全部安装。</li><li>@vue/cli vue cli 用来创建管理 vue 项目（老项目需要）</li></ul><h2 id="源码管理" tabindex="-1">源码管理 <a class="header-anchor" href="#源码管理" aria-label="Permalink to &quot;源码管理&quot;">​</a></h2><p>这里我们使用的 git，git 的安装也是使用 winget， 和安装 nvm 的步骤一致。不习惯的可以去<a href="https://git-scm.com/download/win" target="_blank" rel="noreferrer">官网下载</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Git.Git</span></span></code></pre></div><h2 id="安装-vscode" tabindex="-1">安装 vscode <a class="header-anchor" href="#安装-vscode" aria-label="Permalink to &quot;安装 vscode&quot;">​</a></h2><p>vscode 的安装也是使用 winget， 和安装 nvm 的步骤一致。不习惯的可以去<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">官网下载</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">winget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Microsoft.VisualStudioCode</span></span></code></pre></div><p><img src="`+t+'" alt="vscode"></p><p>vscode 插件：</p><ul><li>Better Comments</li><li>Can I Use</li><li>Vite</li><li>JavaScript standardjs styled snippets</li><li>Path Intellisense</li><li>markdownlint</li><li>ESLint</li><li>Git History</li><li>EditorConfig for VS Code</li><li>Prettier - Code formatter</li><li>Auto Close Tag</li><li>Auto Rename Tag</li><li>Code Runner</li><li>GitHub Copilot</li><li>GitHub Copilot Chat</li><li>GitHub Copilot Labs</li><li>Draw.io Integration</li><li>SVG</li><li>CodeMetrics</li><li>Image preview</li><li>Noctis</li><li>DotENV</li><li>Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code</li><li>Dev Containers</li><li>Remote - SSH</li><li>Remote - SSH: Editing Configuration Files</li><li>WSL</li><li>Remote Development</li><li>Live Preview</li><li>Remote Explorer</li><li>Remote Repositories</li><li>Remote - Tunnels</li><li>Nx Console</li><li>indent-rainbow</li><li>CSS Peek</li><li>git-commit-plugin</li><li>JavaScript Booster</li><li>Auto Import</li><li>Code Spell Checker</li><li>Formatting Toggle</li><li>IntelliCode</li><li>vscode-icons</li><li>Vue Language Features (Volar)</li><li>TypeScript Vue Plugin (Volar)</li><li>Quokka.js</li><li>Import Cost</li><li>IntelliSense for CSS class names in HTML</li></ul><h2 id="内网穿透" tabindex="-1">内网穿透 <a class="header-anchor" href="#内网穿透" aria-label="Permalink to &quot;内网穿透&quot;">​</a></h2><p>免费的工具， <a href="https://www.cpolar.com/" target="_blank" rel="noreferrer">cpolar</a> 和 <a href="https://natapp.cn/" target="_blank" rel="noreferrer">netapp</a> 一共两个。</p><h2 id="github-加速" tabindex="-1">Github 加速 <a class="header-anchor" href="#github-加速" aria-label="Permalink to &quot;Github 加速&quot;">​</a></h2><p>Watt Toolkit-瓦特工具箱 （原 Steam++）现可在 windows store 中下载</p><p><img src="'+n+'" alt="Alt text"></p><p>当然也可以使用使用 v2rayN (可在 <a href="https://justmysocks.net/" target="_blank" rel="noreferrer">just my sockets</a> 购买)。</p><h2 id="浏览器" tabindex="-1">浏览器 <a class="header-anchor" href="#浏览器" aria-label="Permalink to &quot;浏览器&quot;">​</a></h2><p>win11 自带的 Edge 浏览器很不错，支持账号同步，功能非常全面（喜欢 Chrome、Firefox 可以自行安装），不管使用哪种浏览器一些必要的插件还是需要安装的。</p><p>下面是我常用的一些插件：</p><ul><li>FeHelper 前端助手：提供一些常用的工具</li><li>Wappalyzer：查看当前访问网站使用的框架/库</li><li>AdBlock： 拦截广告</li><li>vue.js devtools：vue 开发者工具</li><li>Window Resizer：调整浏览器的大小</li><li>移动模拟器：模拟移动端，方便调试移动端网页</li><li>沉浸式翻译：一款翻译插件，可以提供双语对照，可以设置翻译源，功能挺不错</li></ul><p><img src="'+o+'" alt="Alt text"></p><h2 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h2><p>除了开发之外还有其他的一些软件：</p><ul><li>Github Desktop：github 客户端</li><li>Foxmail：邮箱</li><li>snipaste：截图</li><li>网易云音乐：听歌</li><li>有道翻译：翻译软件，ctrl+alt+d 截图翻译非常方便</li><li>WPS：办公软件</li><li>nginx：反向代理工具</li><li>toDesk：远程访问工具</li><li>LICEcap：Gif 录制工具-简单好用</li><li>阿里云：可以同步一些文件</li><li>powerToys：增强 windows，功能很全面，微软开发</li><li>360 极速版：清理垃圾、下载软件的不二选择</li><li>Doctor Desktop：doctor 客户端</li><li>HBuilderX：跨端开发很方便，特别是有多个平台的小程序开发时，使用的是 vue 语法</li><li>Motrix: 下载功能</li><li>微信/QQ：聊天工具</li><li>企业微信/钉钉：办公软件</li></ul>',42),r=[p];function d(k,c,g,m,u,F){return s(),a("div",null,r)}const y=i(h,[["render",d]]);export{v as __pageData,y as default};
