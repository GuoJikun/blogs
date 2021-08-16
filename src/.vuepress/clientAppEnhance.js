import { defineClientAppEnhance } from "@vuepress/client";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import Copy from "./directives/copy.js";

export default defineClientAppEnhance(({ app }) => {
  // ...
  app.use(ElementPlus);
  app.use(Copy);
});
