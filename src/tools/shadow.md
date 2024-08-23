# 阴影生成工具

阴影效果以及 CSS 代码：

<div style="padding: 20px 12px;display:flex;border: 1px solid #dfdfdf;margin-top: 8px;">
    <div style="flex: 0 0 40%;">
        <div :style="applyShadowStyle" style="height: 100px;margin-right: 20px;"></div>
    </div>
    <code style="flex: 0 0 60%;padding: 12px;background-color: #efefef;border-radius: 4px;">
        box-shadow: {{ shadowStyle }};
    </code>
</div>

工具栏：

<div class="margin-top-12px flex flex-wrap flex-justify-content-between">
    <div class="flex align-items-center" style="flex: 0 0 50%;margin: 10px 0;">
        <span style="flex: 0 0 140px;">水平阴影的位置：</span>
        <el-input-number v-model="hShadow" />
    </div>
    <div class="flex align-items-center" style="flex: 0 0 50%;margin: 10px 0;">
        <span style="flex: 0 0 140px;">垂直阴影的位置：</span>
        <el-input-number v-model="vShadow" />
    </div>
    <div class="flex align-items-center" style="flex: 0 0 50%;margin: 10px 0;">
        <span style="flex: 0 0 140px;">模糊距离-可选：</span>
        <el-input-number v-model="blur" />
    </div>
    <div class="flex align-items-center" style="flex: 0 0 50%;margin: 10px 0;">
        <span style="flex: 0 0 140px;">阴影的大小-可选：</span>
        <el-input-number v-model="spread" />
    </div>
    <div class="flex align-items-center" style="flex: 0 0 50%;margin: 10px 0;">
        <span style="flex: 0 0 140px;">阴影的颜色-可选：</span>
        <el-color-picker v-model="color" show-alpha></el-color-picker>
    </div>
    <div class="flex align-items-center" style="flex: 0 0 50%;margin: 10px 0;">
        <span style="flex: 0 0 140px;">是否内阴影-可选：</span>
        <el-checkbox v-model="inset" :true-label="1" :false-label="0"></el-checkbox>
    </div>
</div>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return {
            hShadow: 0, // 必需的。水平阴影的位置。允许负值
            vShadow: 0, // 必需的。垂直阴影的位置。允许负值
            blur: 5, // 可选。模糊距离
            spread: 1, // 可选。阴影的大小
            color: 'rgba(99, 93, 225, 0.96)', // 可选。阴影的颜色。在CSS颜色值寻找颜色值的完整列表
            inset: 0, // 可选。从外层的阴影（开始时）改变阴影内侧阴影
        }
    },
    computed:{
        shadowStyle(){
            if(this.inset === 0){
                return `${this.hShadow}px ${this.vShadow}px ${this.blur}px ${this.spread}px ${this.color}`
            }else{
                return `${this.hShadow}px ${this.vShadow}px ${this.blur}px ${this.spread}px ${this.color} inset`
            }
        },
        applyShadowStyle(){
            return {boxShadow: this.shadowStyle}
        }
    }
})
</script>
