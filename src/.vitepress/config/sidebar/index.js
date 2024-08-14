import basic from "./basic";
import dataStructure from "./data-structure";
import framework from "./framework";
import tools from "./tools";

const other = [
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
            { text: "decimal.js 的使用", link: "/other/decimal" },
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
];

const designPattern = [{ text: "单例模式", link: "/design-pattern/singleton" }];

export default {
    "/basic/": basic,
    "/framework/": framework,
    "/design-pattern/": designPattern,
    "/data-structure/": dataStructure,
    "/tools/": tools,
    "/other/": other,
};
