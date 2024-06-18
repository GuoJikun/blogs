import DefaultTheme from "vitepress/theme";
import Layout from "./layout.vue";
import "./index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import { Copy } from "../directives/copy/index.js";
import contextmenu from "@jkun/contextmenu";
import "@jkun/contextmenu/dist/style.css";

export default {
    ...DefaultTheme,
    Layout,
    async enhanceApp(ctx) {
        // extend default theme custom behaviour.
        DefaultTheme.enhanceApp(ctx);

        // register your custom global components
        ctx.app.use(ElementPlus, { locale: zhCn });
        ctx.app.directive("copy", Copy);
        ctx.app.use(contextmenu, { type: "both" });
    },
};
