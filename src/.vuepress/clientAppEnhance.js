import { defineClientAppEnhance } from "@vuepress/client";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import Copy from "./directives/copy.js";
import ContentMenus from "./directives/mouse-right-click.js";
import Barcode from "yak-barcode";

export default defineClientAppEnhance(({ app }) => {
  // ...
  app.use(ElementPlus, { locale: zhCn });
  app.use(Barcode);
  app.use(Copy);
  app.use(ContentMenus);
});
