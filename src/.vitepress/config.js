import { defineConfig } from "vitepress";
import sidebar from "./config/sidebar.js";
import navbar from "./config/nav.js";

export default defineConfig({
    base: "/",
    lang: "zh-CN",
    title: "前端小栈",
    description: "这是我的第一个 VuePress 站点",
    outDir: "../dist",
    lastUpdated: true,
    themeConfig: {
        home: "/index.md",
        logo: "https://vuejs.org/images/logo.png",
        repo: "GuoJikun/blog-vuepress",
        docsRepo: "https://github.com/GuoJikun/blog-vuepress",
        docsBranch: "main",
        docsDir: "src",
        editLinkPattern: ":repo/edit/:branch/:path",
        editLink: true,
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: true,
        lastUpdatedText: "最后更新时间",
        outline: [2, 3],
        outlineTitle: "目录",
        nav: navbar,
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/GuoJikun/blog-vuepress",
            },
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
    vue: {
        template: {
            compilerOptions: {
                customElements: ["water-marker"],
            },
        },
    },
});
// plugins: [
//     docsearchPlugin({
//       appId: "6I9889IGXP",
//       apiKey: "b3f542816b2bf2a8b4e86d783e4e6369",
//       indexName: "jikun",
//     }),
//   ],