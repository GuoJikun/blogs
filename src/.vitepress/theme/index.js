import DefaultTheme from "vitepress/theme";
import Layout from "./layout.vue";
import "./index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// import watermark from "@jkun/watermark-vue/dist/watermark.js";
import "@jkun/watermark-vue/dist/index.css";

export default {
  ...DefaultTheme,
  Layout,
  async enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx);

    // register your custom global components
    ctx.app.use(ElementPlus, { locale: zhCn });
    if (!import.meta.env.SSR) {
      const watermark = await import("@jkun/watermark-vue/dist/watermark.js");
      ctx.app.use(watermark);
    }
  },
};
