import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// import Copy from "../directives/copy.js";
// import "@jkun/contextmenu/dist/style.css";

import "./index.css";

export default {
  ...DefaultTheme,
  async enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    const app = ctx.app;
    app.use(ElementPlus, { locale: zhCn });

    // app.use(Copy);
    if (!import.meta.SSR) {
      // const ContentMenus = await import("@jkun/contextmenu");
      // app.use(ContentMenus.default, { type: "both" });
      //   const Barcode = await import("yak-barcode");
      //   app.use(Barcode.default);
      const Watermark = await import("@jkun/watermark-vue/dist/watermark.js");
      app.use(Watermark.default);
    }
  },
};
