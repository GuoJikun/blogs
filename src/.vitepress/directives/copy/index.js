import CopyElement from "./src/index.js";

export const Copy = CopyElement;

export default {
  install(app) {
    app.directive("copy", CopyElement);
  },
};
