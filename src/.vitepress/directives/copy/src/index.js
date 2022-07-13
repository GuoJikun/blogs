import { copyNode, copyText } from "./clipboard";

async function copy(button) {
  const id = button.getAttribute("for");
  const text = button.getAttribute("value");
  function trigger() {
    button.dispatchEvent(new CustomEvent("clipboard-copy", { bubbles: true }));
  }

  if (text) {
    await copyText(text);
    trigger();
  } else if (id) {
    const root =
      "getRootNode" in Element.prototype
        ? button.getRootNode()
        : button.ownerDocument;
    if (
      !(
        root instanceof Document ||
        ("ShadowRoot" in window && root instanceof ShadowRoot)
      )
    )
      return;
    const node = root.getElementById(id);
    if (node) {
      await copyTarget(node);
      trigger();
    }
  } else {
    await copyNode(button);
    trigger();
  }
}

function copyTarget(content) {
  if (
    content instanceof HTMLInputElement ||
    content instanceof HTMLTextAreaElement
  ) {
    return copyText(content.value);
  } else if (
    content instanceof HTMLAnchorElement &&
    content.hasAttribute("href")
  ) {
    return copyText(content.href);
  } else {
    return copyNode(content);
  }
}

function keydown(event) {
  if (event.key === " " || event.key === "Enter") {
    const button = event.currentTarget;
    if (button instanceof HTMLElement) {
      event.preventDefault();
      copy(button);
    }
  }
}

function focused(event) {
  event.currentTarget.addEventListener("keydown", keydown);
}

function blurred(event) {
  event.currentTarget.removeEventListener("keydown", keydown);
}

export default {
  created(el, binding) {
    console.log(binding, "binding");
    if (!el.hasAttribute("tabindex")) {
      el.setAttribute("tabindex", "0");
    }

    if (!el.hasAttribute("role")) {
      el.setAttribute("role", "button");
    }

    el.clicked = async function copy(ev) {
      const button = ev.currentTarget;
      const id = button.getAttribute("for");
      const text = binding.value || button.getAttribute("value");
      function trigger() {
        button.dispatchEvent(
          new CustomEvent("clipboard-copy", { bubbles: true })
        );
      }

      if (text) {
        const val = await copyText(text);
        trigger(val);
      } else if (id) {
        const root =
          "getRootNode" in Element.prototype
            ? button.getRootNode()
            : button.ownerDocument;
        if (
          !(
            root instanceof Document ||
            ("ShadowRoot" in window && root instanceof ShadowRoot)
          )
        )
          return;
        const node = root.getElementById(id);
        if (node) {
          const val = await copyTarget(node);
          trigger(val);
        }
      } else {
        const val = await copyNode(button);
        trigger(val);
      }
    };
  },
  mounted(el, binding) {
    console.log(binding.value, "value");
    el.addEventListener("click", el.clicked);
    el.addEventListener("focus", focused);
    el.addEventListener("blur", blurred);
  },
  updated(el, binding) {
    console.log(binding.value, "value updated");
  },
  beforeUnmount(el) {
    el.removeEventListener("click", el.clicked);
  },
};
