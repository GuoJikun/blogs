# Copy 复制

## 基础用法

<el-button v-copy="'被复制的内容'" :copy-success="copySuccess" type="primary" size="small">点击复制</el-button>

<script>
// import Copy from '@/directives/copy.js'
import { defineComponent, reactive, toRefs } from 'vue';
import {ElMessage} from 'element-plus'
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

        const copySuccess = (val) => {
            ElMessage.success(`复制成功，复制的内容：${val}`)
        }

        return {
            ...toRefs(data),
            copySuccess
        }
    },
})
</script>
