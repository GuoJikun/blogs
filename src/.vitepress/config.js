import { defineConfig } from "vitepress";
import sidebar from "./config/sidebar.js";
import navbar from "./config/nav.js";

export default defineConfig({
    base: "/",
    lang: "zh-CN",
    title: "前端小栈",
    head: [
        [
            "script",
            {
                src: "//sdk.51.la/js-sdk-pro.min.js",
                charset: "UTF-8",
                id: "LA_COLLECT",
            },
        ],
        [
            "script",
            {},
            `LA.init({id:"3F6JYEKcOZnT1i9e",ck:"3F6JYEKcOZnT1i9e", hashMode: true})`,
        ],
    ],
    lastUpdated: true,
    themeConfig: {
        home: "/index.md",
        logo: "https://vuejs.org/images/logo.png",
        editLink: {
            text: "在 GitHub 上编辑此页",
            pattern:
                "https://github.com/GuoJikun/blog-vuepress/edit/main/src/:path",
        },
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
            copyright: "Copyright © 2023-present GuoJiKun",
        },
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },
        search: {
            provider: "algolia",
            options: {
                appId: "6I9889IGXP",
                apiKey: "b3f542816b2bf2a8b4e86d783e4e6369",
                indexName: "jikun",
            },
        },
    },
    vue: {
        template: {
            compilerOptions: {
                customElements: ["water-marker"],
            },
        },
    },
    sitemap: {
        hostname: "https://blog.jikun.dev/",
        transformItems: (items) => {
            // add new items or modify/filter existing items
            return items.filter(
                (item) => item.url !== "auth/cnblog/callback.html"
            );
        },
    },
});
