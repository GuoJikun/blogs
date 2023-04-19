export default [
  // NavbarItem
  {
    text: "Basic",
    link: "/basic/filter",
  },
  // NavbarGroup
  {
    text: "Vue",
    link: "/vue/directives/copy",
  },
  {
    text: "数据结构与算法",
    link: "/data-structure/list",
  },
  {
    text: "组件文档",
    link: "/docs/readme",
    children: [
      {
        text: "watermark 水印",
        link: "/docs/watermark-vue",
      },
    ],
  },
  {
    text: "小工具",
    link: "/tools/readme",
  },
  {
    text: "其他",
    link: "/other/wsl",
  },
];
