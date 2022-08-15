import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import zhCn from "element-plus/lib/locale/zh-cn.js";

import Copy from "../directives/copy.js";
import "@jkun/contextmenu/dist/style.css";

export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    app.use(ElementPlus);
    // app.use(ElementPlus, { locale: zhCn });

    app.use(Copy);
    if (!import.meta.SSR) {
      const ContentMenus = await import("@jkun/contextmenu");
      app.use(ContentMenus.default, { type: "both" });
      const Barcode = await import("yak-barcode");
      app.use(Barcode.default);
    }
  },
};
