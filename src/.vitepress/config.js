import { defineConfig } from "vitepress";
import sidebar from "./config/sidebar.js";
import navbar from "./config/nav.js";

export default defineConfig({
  lang: "zh-CN",
  title: "前端小栈",
  description: "这是我的第一个 VuePress 站点",

  themeConfig: {
    home: "/index.md",
    logo: "https://vuejs.org/images/logo.png",
    repo: "GuoJikun/blog-vuepress",
    lastUpdatedText: "最后更新时间",
    nav: navbar,
    socialLinks: [
      { icon: "github", link: "https://github.com/GuoJikun/blog-vuepress" },
    ],
    sidebar: sidebar,
    footer: {
      message: "MIT Licensed",
      copyright: "Copyright © 2022-present GuoJiKun",
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ["element-plus"],
      },
    },
  },
});
