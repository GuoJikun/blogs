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

const tauri = {
    text: "Tauri 框架",
    collapsed: false,
    items: [
        { text: "windows 上 Tauri 开发环境配置", link: "/framework/tauri/env" },
        { text: "创建 Tauri 项目", link: "/framework/tauri/create" },
    ],
};

export default [
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
    tauri,
];
