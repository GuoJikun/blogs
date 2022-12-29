import { isFunction } from "@/utils/type.js";

export default {
  created(el, { value }) {
    const cb = value;

    if (!isFunction(cb)) {
      throw new Error("vClickOutside指令的参数只能是Function类型");
    }
    el.handler = () => {
      cb();
    };
  },
  mounted(el) {
    document.body.addEventListener("click", el.handler);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.handler);
  },
};
