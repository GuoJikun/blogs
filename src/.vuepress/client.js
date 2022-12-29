import { defineClientConfig } from "@vuepress/client";
import watermark from "@jkun/watermark-vue/dist/watermark.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import barCode from "yak-barcode";
import Copy from "./directives/copy.js";
import contextmenu from "@jkun/contextmenu";
import "@jkun/contextmenu/dist/style.css";

export default defineClientConfig({
  enhance({ app }) {
    app.use(ElementPlus, { locale: zhCn });
    app.use(watermark);
    app.use(barCode);
    app.use(contextmenu, { type: "both" });
    app.use(Copy);
  },
});
