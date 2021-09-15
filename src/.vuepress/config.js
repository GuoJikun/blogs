const sidebar = require("./config/sidebar.js");
const navbar = require("./config/nav.js");
const { path } = require("@vuepress/utils");

module.exports = {
  lang: "zh-CN",
  title: "前端小栈",
  description: "这是我的第一个 VuePress 站点",
  markdown: {
    anchor: {
      level: [2, 3],
    },
    extractHeaders: {
      level: [2, 3],
    },
  },
  themeConfig: {
    home: "/readme.md",
    logo: "https://vuejs.org/images/logo.png",
    sidebarDepth: 3,
    repo: "GuoJikun/blog-vuepress",
    repoLabel: "GITHUB",
    lastUpdatedText: "最后更新时间",
    contributors: false,
    contributorsText: "贡献者",
    editLinkText: "在 Github 上编辑",
    docsDir: "src",
    navbar: navbar,
    sidebar: sidebar,
  },
  dest: "docs",

  // 404 page
  notFound: [
    "这里什么都没有",
    "我们怎么到这来了？",
    "这是一个 404 页面",
    "看起来我们进入了错误的链接",
  ],
  backToHome: "返回首页",

  // a11y
  openInNewWindow: "在新窗口打开",
  toggleDarkMode: "切换夜间模式",
  toggleSidebar: "切换侧边栏",

  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components"),
      },
    ],
  ],
  bundlerConfig: {
    evergreen: true,
  },
};
