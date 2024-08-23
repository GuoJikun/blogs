import { defineConfig } from "vitepress";
import sidebar from "./config/sidebar/index.js";
import navbar from "./config/nav.js";

export default defineConfig({
    base: "/",
    lang: "zh-CN",
    title: "前端小栈",

    titleTemplate: false,

    lastUpdated: true,
    metaChunk: true,

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
        [
            "script",
            {},
            `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mvabepuoj9");`,
        ],
    ],

    themeConfig: {
        home: "/index.md",
        logo: "https://vuejs.org/images/logo.png",
        editLink: {
            text: "在 GitHub 上编辑此页",
            pattern:
                "https://github.com/GuoJikun/blog-vuepress/edit/main/src/:path",
        },
        lastUpdated: {
            text: "最后更新于",
            formatOptions: {
                dateStyle: "short",
                timeStyle: "medium",
            },
        },
        outline: {
            level: [2, 3],
            label: "章节目录",
        },
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

        langMenuLabel: "多语言",
        returnToTopLabel: "回到顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",
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

    markdown: {
        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息",
        },
    },
});
