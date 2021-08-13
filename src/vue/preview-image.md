## 基础用法

![test](/images/a.jpg')

<img :src="a" alt="VuePress Logo">

<button class="button" @click="show">点击查看预览界面</button>

<!-- <fox-preview-image v-model="visible" :src="[a]"></fox-preview-image> -->

<script>
import {defineComponent, reactive, toRefs} from 'vue';
// import FoxPreviewImage from 'fox-preview-image'
import a from '../../../public/images/a.jpg'
export default defineComponent({
    // components: {FoxPreviewImage},
    setup(props, ctx){
        console.log(ctx)
        const data = reactive({
            visible: false,
            a: a
        })
        const show = ()=>{
            data.visible = true;
        }
        return {
            ...toRefs(data),
            show
        }
    }
})
</script>
