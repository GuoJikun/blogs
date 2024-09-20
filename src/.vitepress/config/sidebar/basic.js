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

const rust = {
    text: "Rust",
    collapsed: false,
    items: [
        { text: "Rust 之环境搭建", link: "/basic/rust/env" },
        { text: "Rust 之构建 wasm", link: "/basic/rust/wasm" },
    ],
};

export default [
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
            { text: "获取滚动条宽度", link: "/basic/js/scrollbar-width" },
            {
                text: "在 Web 中判断页面是不是刷新",
                link: "/basic/js/page-is-refresh",
            },
            {
                text: "使用 Wake Lock API：保持设备唤醒的最佳实践",
                link: "/basic/js/webapi-wakelock",
            },
            {
                text: "使用 Wake Lock API：保持设备唤醒的最佳实践",
                link: "/basic/js/webapi-page-visibility",
            },
        ],
    },
    rust,
    ecma,
];
