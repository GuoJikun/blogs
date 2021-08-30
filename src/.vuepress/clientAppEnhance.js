import { defineClientAppEnhance } from "@vuepress/client";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import Copy from "./directives/copy.js";
import ContentMenus from "./directives/mouse-right-click.js";

export default defineClientAppEnhance(({ app }) => {
  // ...
  app.use(ElementPlus);
  app.use(Copy);
  app.use(ContentMenus);
});
