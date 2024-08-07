const topic = {
    text: "力扣题解",
    collapsed: false,
    items: [
        {
            text: "回文数",
            link: "/data-structure/topic/2023-05-17",
        },
        {
            text: "删除字符串中的所有相邻重复项",
            link: "/data-structure/topic/leetcode-2023-05-30",
        },
    ],
};

const ecma = {
    text: "ECMAScript 标准",
    collapsed: true,
    items: [
        { text: "ECMA 2024", link: "/basic/ecma/2024" },
        { text: "ECMA 2023", link: "/basic/ecma/2023" },
        { text: "ECMA 2022", link: "/basic/ecma/2022" },
        { text: "ECMA 2021", link: "/basic/ecma/2021" },
        { text: "ECMA 2020", link: "/basic/ecma/2020" },
        { text: "ECMA 2019", link: "/basic/ecma/2019" },
        { text: "ECMA 2018", link: "/basic/ecma/2018" },
        { text: "ECMA 2017", link: "/basic/ecma/2017" },
        { text: "ECMA 2016", link: "/basic/ecma/2016" },
    ],
};

const stencilJs = {
    text: "StencilJs",
    collapsed: false,
    items: [
        {
            text: "StencilJs 终章之组件开发",
            link: "/framework/stenciljs/learn",
        },
        {
            text: "StencilJs 学习之 JSX",
            link: "/framework/stenciljs/jsx",
        },
        {
            text: "StencilJs 学习之事件",
            link: "/framework/stenciljs/event",
        },
        {
            text: "StencilJs 学习之装饰器",
            link: "/framework/stenciljs/decorator",
        },
        {
            text: "StencilJs 学习之生命周期",
            link: "/framework/stenciljs/lifecycle",
        },
        {
            text: "StencilJs 学习之搭建项目",
            link: "/framework/stenciljs/create",
        },
    ],
};

export default {
    "/basic/": [
        {
            text: "HTML & CSS",
            collapsed: false,
            items: [
                { text: "Filter 滤镜", link: "/basic/filter" },
                { text: "Cursor 鼠标样式", link: "/basic/cursor" },
                {
                    text: "Intersection Observer",
                    link: "/basic/intersection-observer",
                },
                { text: "Canvas", link: "/basic/canvas" },
                { text: "WebComponent", link: "/basic/web-component" },
                { text: "Scss之extend和mixin", link: "/basic/p2021091401" },
                { text: "Css 之 contain", link: "/basic/contain" },
                { text: "自定义滚动条样式", link: "/basic/scrollbar" },
            ],
        },
        {
            text: "Javascript",
            collapsed: false,
            items: [
                {
                    text: "javascript 中的错误类型",
                    link: "/basic/js/error-type",
                },
                { text: "Cookie 缓存", link: "/basic/js/cookie" },
                { text: "Decorator 装饰器", link: "/basic/js/decorator" },
                { text: "编解码", link: "/basic/js/encode" },
                { text: "Utils 工具函数", link: "/basic/js/utils" },
                {
                    text: "浏览器多窗口通讯",
                    link: "/basic/js/multi-window-communication",
                },
                {
                    text: "MutationObserver API",
                    link: "/basic/js/mutation-observer",
                },
                {
                    text: "手写new,bind,call,apply",
                    link: "/basic/js/p2021091402",
                },
                { text: "获取滚动条宽度", link: "/basic/scrollbar-width" },
            ],
        },
        ecma,
    ],
    "/framework/": [
        {
            text: "Vue",
            collapsed: false,
            items: [
                { text: "env 配置文件", link: "/framework/vue/env" },
                {
                    text: "vueCli项目添加vite支持",
                    link: "/framework/vue/p202109101",
                },
                {
                    text: "vue 项目接入 Sentry",
                    link: "/framework/vue/sentry-vue",
                },
                {
                    text: "lottie 动画在 vue 中的使用",
                    link: "/framework/vue/lottie",
                },
            ],
        },

        stencilJs,
    ],
    "/design-pattern/": [
        {
            text: "单例模式",
            link: "/design-pattern/singleton",
        },
    ],
    "/data-structure/": [
        {
            text: "数据结构",
            collapsed: false,
            items: [
                { text: "List 列表", link: "/data-structure/list" },
                { text: "Queue 队列", link: "/data-structure/queue" },
                { text: "Stack 栈", link: "/data-structure/stack" },
                { text: "Set 集合", link: "/data-structure/set" },
                {
                    text: "Linked List 链表",
                    link: "/data-structure/linked-list",
                },
                {
                    text: "Tree 树",
                    link: "/data-structure/binary-search-tree",
                },
            ],
        },
        {
            text: "算法",
            items: [
                { text: "Sort 排序", link: "/data-structure/sort" },
                { text: "Tween 缓动动画", link: "/data-structure/tween" },
            ],
        },
        topic,
    ],
    "/tools/": [
        {
            text: "工具",
            items: [
                { text: "阴影生成器", link: "/tools/shadow" },
                { text: "文件转Base64", link: "/tools/file-to-base64" },
            ],
        },
    ],
    "/other/": [
        {
            text: "其它",
            items: [
                { text: "win11 安装 wslg", link: "/other/wsl" },
                {
                    text: "搭建私有 Npm 仓库",
                    link: "/other/private-npm-repository",
                },
                { text: "win10 激活", link: "/other/activation-win10" },
                { text: "Scoop 包管理器", link: "/other/scoop" },
                {
                    text: "linux 禁止指定软件升级",
                    link: "/other/disabled-upgrade",
                },
                { text: "Markdown 基础语法", link: "/other/md" },
                { text: "Windows 终端代理", link: "/other/terminal-proxy" },
                {
                    text: "更改 wsl 的安装位置",
                    link: "/other/move-wsl-install-dir",
                },
                {
                    text: "使用 jenkins 发布 vue 项目",
                    link: "/other/jenkins-vue",
                },
                {
                    text: "在 jenkins 中添加参数化构建",
                    link: "/other/jenkins-plugin-git-params",
                },
                {
                    text: "decimal.js 的使用",
                    link: "/other/decimal",
                },
                {
                    text: "Windows Terminal 简单美化",
                    link: "/other/terminal-config",
                },
                {
                    text: "Web 前端工程的装机必备软件",
                    link: "/other/windows-env-setting",
                },
                {
                    text: "VMware 虚拟机共享宿主机代理",
                    link: "/other/share-host-proxy",
                },
            ],
        },
    ],
};
