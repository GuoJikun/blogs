# Cursor 鼠标样式

> 请把鼠标移到单词上查看鼠标的变化

<div class="grid">
    <div
        v-for="item in cursors"
        :key="item.value"
        class="grid-item"
        :style="{ cursor: item.value }"
        :title="item.title"
    >
        {{ item.name }}
    </div>
    <!-- <div
        class="grid-item"
        :style="`cursor: url('${$withBase('/image/cursor.png')}'), pointer;`"
        title="需被使用的自定义光标的URL;注释：请在此列表的末端始终定义一种普通的光标，以防没有由URL 定义的可用光标。"
    >
        自定义
    </div> -->
</div>

<script>
import {defineComponent, reactive, toRefs} from 'vue';
export default defineComponent({
    setup() {
        const data = reactive({
            cursors: [
                {
                    name: 'auto',
                    value: 'auto',
                    title: '浏览器根据当前内容决定指针样式;例如当是内容是文字时使用text样式',
                },
                {
                    name: 'default',
                    value: 'default',
                    title: '默认指针，通常是箭头。',
                },
                { name: 'none', value: 'none', title: '无指针被渲染' },
                {
                    name: 'context-menu',
                    value: 'context-menu',
                    title: '指针下有可用内容目录。只有windows中的IE 10有效。',
                },
                {
                    name: 'help',
                    value: 'help',
                    title: '此光标指示可用的帮助（通常是一个问号或一个气球）。',
                },
                {
                    name: 'pointer',
                    value: 'pointer',
                    title: '光标呈现为指示链接的指针（一只手）',
                },
                {
                    name: 'progress',
                    value: 'progress',
                    title: '程序后台繁忙，用户仍可交互 (与wait不同).',
                },
                {
                    name: 'wait',
                    value: 'wait',
                    title: '此光标指示程序正忙（通常是一只表或沙漏）。',
                },

                {
                    name: 'cell',
                    value: 'cell',
                    title: '指示单元格可被选中',
                },
                {
                    name: 'crosshair',
                    value: 'crosshair',
                    title: '光标呈现为十字线。',
                },
                { name: 'text', value: 'text', title: '指示文字可被选中' },
                {
                    name: 'vertical-text',
                    value: 'vertical-text',
                    title: '指示垂直文字可被选中',
                },

                {
                    name: 'alias',
                    value: 'alias',
                    title: '复制或快捷方式将要被创建',
                },
                { name: 'copy', value: 'copy', title: '指示可复制' },
                {
                    name: 'move',
                    value: 'move',
                    title: '被悬浮的物体可被移动',
                },
                {
                    name: 'no-drop',
                    value: 'no-drop',
                    title: '当前位置不能扔下',
                },
                {
                    name: 'not-allowed',
                    value: 'not-allowed',
                    title: '不能执行',
                },
                {
                    name: 'grab',
                    value: 'grab',
                    title: '可抓取;译者注:grab和grabbing在比较后期才被支持，见浏览器兼容表',
                },
                { name: 'grabbing', value: 'grabbing', title: '抓取中' },

                {
                    name: 'all-scroll',
                    value: 'all-scroll',
                    title: '元素可任意方向滚动 （平移）',
                },
                {
                    name: 'row-resize',
                    value: 'row-resize',
                    title: '元素可被重设宽度。通常被渲染为中间有一条横线分割的上下两个箭头',
                },
                {
                    name: 'col-resize',
                    value: 'col-resize',
                    title: '元素可被重设宽度。通常被渲染为中间有一条竖线分割的左右两个箭头',
                },
                {
                    name: 'n-resize',
                    value: 'n-resize',
                    title: '此光标指示矩形框的边缘可被向上（北）移动。',
                },
                {
                    name: 'e-resize',
                    value: 'e-resize',
                    title: '此光标指示矩形框的边缘可被向右（东）移动。',
                },
                {
                    name: 's-resize',
                    value: 's-resize',
                    title: '此光标指示矩形框的边缘可被向下移动（北/西）。',
                },
                {
                    name: 'w-resize',
                    value: 'w-resize',
                    title: '此光标指示矩形框的边缘可被向左移动（西）。',
                },
                {
                    name: 'ne-resize',
                    value: 'ne-resize',
                    title: '此光标指示矩形框的边缘可被向上及向右移动（北/东）。',
                },
                {
                    name: 'nw-resize',
                    value: 'nw-resize',
                    title: '此光标指示矩形框的边缘可被向上及向左移动（北/西）。',
                },
                {
                    name: 'se-resize',
                    value: 'se-resize',
                    title: '此光标指示矩形框的边缘可被向下及向右移动（南/东）。',
                },
                {
                    name: 'sw-resize',
                    value: 'sw-resize',
                    title: '此光标指示矩形框的边缘可被向下及向左移动（南/西）。',
                },
                {
                    name: 'ew-resize',
                    value: 'ew-resize',
                    title: '指示双向重新设置大小',
                },
                {
                    name: 'ns-resize',
                    value: 'ns-resize',
                    title: '指示双向重新设置大小',
                },
                {
                    name: 'nesw-resize',
                    value: 'nesw-resize',
                    title: '指示双向重新设置大小',
                },
                {
                    name: 'nwse-resize',
                    value: 'nwse-resize',
                    title: '指示双向重新设置大小',
                },

                {
                    name: 'zoom-in',
                    value: 'zoom-in',
                    title: '指示可被放大',
                },
                {
                    name: 'zoom-out',
                    value: 'zoom-out',
                    title: '指示可被缩小',
                },

                // { name: "自定义", value: "url('assets/image/cursor.png'), pointer",title: "需被使用的自定义光标的URL;注释：请在此列表的末端始终定义一种普通的光标，以防没有由URL 定义的可用光标。"},
            ],
        })
        return {
            ...toRefs(data)
        }
    },
})
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(6, 100px);
    grid-template-rows: repeat(7, 100px);
    justify-content: start;
    align-items: center;
    grid-auto-flow: row;
    grid-gap: 30px 31px;
    margin: 0 auto;
}
.grid-item {
    height: 100px;
    display: inline-grid;
    text-align: center;
    align-items: center;
    font-size: 1.2em;
    border: 1px solid #fff;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #eaeaea;
}
</style>
