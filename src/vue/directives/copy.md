# Copy 复制

## 用法 1

复制指令的 binding.value


<el-button type="primary" v-copy="`通过指令提供值`" @clipboard-copy="copySuccess">
通过指令提供值
</el-button>


## 用法 2

复制元素的 textContent


<el-button type="primary" v-copy @clipboard-copy="copySuccess">
通过 textContent 属性复制
</el-button>


<script>
// import Copy from '@/directives/copy.js'
import { defineComponent, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus'
export default defineComponent({
    // directives: { Copy },
    setup() {
        const data = reactive({
            loading: true,
            attrs: [
                {
                    attr: 'value',
                    desc: '要复制的文字，如果为空则复制内容为当前元素的innerText',
                    type: 'string',
                    isMust: 'false',
                },
            ],
        })

        const copySuccess = (ev) => {
            const val = ev.detail
            ElMessage.success(`复制成功，复制的内容：${val}`)
        }

        return {
            ...toRefs(data),
            copySuccess
        }
    },
})
</script>
