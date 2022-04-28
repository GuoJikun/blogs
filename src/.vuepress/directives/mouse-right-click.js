import { findBrothersElement } from "../utils/dom.js";
import { isFunction, isObject } from "../utils/type.js";

/**
 * 给元素添加样式
 * @param {HTMLElement} el 元素
 * @param {Object} styleObject 样式
 */
const bindStyle = (el, styleObject = {}) => {
  const tmp = Object.entries(styleObject);
  for (let [key, value] of tmp) {
    el.style[key] = value || null;
  }
};

/**
 * 设置事件和hover样式
 * @param {*} contentMenu 右键菜单的根元素
 * @param {Object} hoverStyle 右键菜单hover的样式-backgroundColor:背景色;color: 字体颜色
 * @param {*} fn 右键菜单项的点击事件的回调
 */
function addEvents(contentMenu, hoverStyle, fn) {
  contentMenu.addEventListener("click", (ev) => {
    const target = ev.target;
    const nodeName = target.nodeName.toLowerCase();
    if (nodeName === "li") {
      const command = target.getAttribute("command");
      const name = target.textContent;
      if (fn) {
        fn({ command, name });
      }
      document.body.removeChild(contentMenu);
    }
  });
  contentMenu.addEventListener("mouseover", (ev) => {
    const target = ev.target;
    const nodeName = target.nodeName.toLowerCase();
    if (nodeName === "li") {
      const brothers = findBrothersElement(target);
      brothers.map((ele) => {
        ele.style.backgroundColor = "#ffffff";
        ele.style.color = "#333";
      });
      target.style.backgroundColor = hoverStyle.backgroundColor;
      target.style.color = hoverStyle.color;
    } else {
      const lis = [...document.querySelectorAll("#ivyMouseRightMenus li")];
      lis.map((el) => {
        el.style.backgroundColor = "#ffffff";
        el.style.color = "#333";
      });
    }
  });
  contentMenu.addEventListener("mouseleave", (ev) => {
    const lis = [...document.querySelectorAll("#ivyMouseRightMenus li")];
    lis.map((el) => {
      el.style.backgroundColor = "#ffffff";
      el.style.color = "#333";
    });
  });
}
/**
 * 给contentMenu元素设置默认样式和位置
 * @param {Object} point 鼠标右键时的坐标
 */
function createRootEle(point) {
  const defaultStyle = {
    position: "fixed",
    top: point.y ? point.y + "px" : 0,
    left: point.x ? point.x + "px" : 0,
    zIndex: 9999,
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.3)",
    padding: "2px 0",
  };
  const contentMenu = document.createElement("div");
  bindStyle(contentMenu, defaultStyle);
  contentMenu.id = "ivyMouseRightMenus";
  return contentMenu;
}

function createMenu(arr, hoverStyle) {
  const menuList = arr.map((item, i) => {
    let command = i;
    let name = "";
    if (item.command) {
      command = item.command;
    }
    if (item.name) {
      name = item.name;
    }
    return `<li style="line-height: 32px;padding: 0 12px;transition: color 0.3s, background-color 0.3s;background-color: transparent;cursor: pointer;" command="${command}">${name}</li>`;
  });

  return [
    '<ul style="list-style: none;margin: 0;padding: 0;">',
    ...menuList,
    `</ul>`,
  ].join("");
}

function render(opts) {
  const menuList = opts.menus || [];
  const point = opts.point || { x: 0, y: 0 };
  const cb = isFunction(opts.callback) ? opts.callback : { x: 0, y: 0 };
  const rootStyle = isObject(opts.style) ? opts.style : null;
  const defaultHoverStyle = { color: "#333333", backgroundColor: "#f3f3f3" };
  const hoverStyle = isObject(opts.hoverStyle)
    ? Object.assign(defaultHoverStyle, opts.hoverStyle)
    : defaultHoverStyle;

  const rootEle = createRootEle(point);
  addEvents(rootEle, hoverStyle, cb);
  if (rootStyle) {
    bindStyle(rootEle, rootStyle);
  }

  const menuEle = createMenu(menuList);
  rootEle.innerHTML = menuEle;
  document.body.appendChild(rootEle);
}

function bodyClick(ev) {
  const target = document.getElementById("ivyMouseRightMenus");
  if (target) document.body.removeChild(target);
}

export const contentMenu = {
  mounted(el, binding) {
    const data = binding.value;
    el.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      const point = {
        x: ev.pageX,
        y: ev.pageY,
      };
      data.point = point;
      const target = document.getElementById("ivyMouseRightMenus");
      if (target) document.body.removeChild(target);
      render(data);
    });
    document.body.addEventListener("click", bodyClick);
  },
  unmounted() {
    const target = document.getElementById("ivyMouseRightMenus");
    if (target) document.body.removeChild(target);
    document.body.removeEventListener("click", bodyClick);
  },
};

export default {
  install(app) {
    app.directive("contentMenus", contentMenu);
  },
};
