import { defineConfig } from "vitepress";
import sidebar from "./config/sidebar.js";
import navbar from "./config/nav.js";

export default defineConfig({
  lang: "zh-CN",
  title: "前端小栈",
  description: "这是我的第一个 VuePress 站点",
  lastUpdated: true,
  outDir: "../docs",
  themeConfig: {
    home: "/index.md",
    logo: "https://vuejs.org/images/logo.png",
    lastUpdatedText: "最后更新时间",
    editLink: {
      pattern: "https://github.com/GuoJikun/blog-vuepress/edit/main/src/:path",
      text: "在 GitHub 上编辑此页",
    },
    outline: [2, 3],
    outlineTitle: "目录",
    nav: navbar,
    socialLinks: [
      { icon: "github", link: "https://github.com/GuoJikun/blog-vuepress" },
    ],
    sidebar: sidebar,
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2022-present GuoJiKun",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
