export const copy = {
  mounted(el, { value }) {
    el.$value = value || el.textContent;
    el.handler = () => {
      // 动态创建 textarea 标签
      const textarea = document.createElement("textarea");
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = "readonly";
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value;
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea);
      // 选中值并复制
      textarea.select();
      const result = document.execCommand("Copy");

      el.dispatchEvent(
        new CustomEvent("clipboard-copy", {
          detail: { status: result, value: el.$value },
        })
      );

      document.body.removeChild(textarea);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener("click", el.handler);
  },
  // 当传进来的值更新的时候触发
  updated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unmounted(el) {
    el.removeEventListener("click", el.handler);
  },
};

export default {
  install(app) {
    app.directive("copy", copy);
  },
};
