<template>
  <div class="ivy-content-menu" ref="wrapEl">
    <slot></slot>
    <transition>
      <div
        v-show="visible"
        class="ivy-content-menu-wrap"
        :class="menuWrapClass"
        :style="{ left: menuPosition.left, top: menuPosition.top }"
      >
        <slot name="menu">
          <span
            class="ivy-content-menu-wrap-item"
            :class="menuItemClass"
            v-for="item in menus"
            :key="item.command"
            @click="menuClick(item)"
          >
            {{ item.text }}
          </span>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  defineComponent,
} from "vue";
export default defineComponent({
  name: "ContextMenu",
  props: {
    menus: {
      type: Array,
      default() {
        return [];
      },
    },
    menuWrapClass: String,
    menuItemClass: String,
  },
  emits: ["menu-click"],
  setup(props, { emit }) {
    const wrapEl = ref(null);
    const visible = ref(false);

    const menuPosition = reactive({
      left: 0,
      top: 0,
    });

    const showContentMenuFn = (ev) => {
      ev.preventDefault();
      const rootPosition = wrapEl.value.getBoundingClientRect();
      const x = ev.x - rootPosition.left;
      const y = ev.y - rootPosition.top;
      menuPosition.top = `${y}px`;
      menuPosition.left = `${x}px`;
      visible.value = true;
    };

    const hideContentFn = () => {
      visible.value = false;
    };

    const menuClick = (item) => {
      emit("menu-click", item);
    };

    onMounted(() => {
      wrapEl.value.addEventListener("contextmenu", showContentMenuFn);
      wrapEl.value.addEventListener("click", hideContentFn);
    });

    onBeforeUnmount(() => {
      wrapEl.value.removeEventListener("contextmenu", showContentMenuFn);
      wrapEl.value.removeEventListener("click", hideContentFn);
    });

    return {
      wrapEl,
      visible,
      menuPosition,
      menuClick,
    };
  },
});
</script>

<style lang="scss">
.ivy-content-menu {
  position: relative;
  &-wrap {
    display: inline-block;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    box-shadow: 0 1px 6px rgba(0 0 0, 0.2);
    border-color: 1px solid #eee;
    border-radius: 4px;
    padding: 5px 0;
    min-width: 160px;
    &-item {
      cursor: pointer;
      display: block;
      line-height: 28px;
      font-size: 14px;
      padding: 0 24px;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
