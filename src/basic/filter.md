# CSS 滤镜

## 语法：

```css
img {
  filter: none | blur() | brightness() | contrast() | drop-shadow() | grayscale(

    ) | hue-rotate() | invert() | opacity() | saturate() | sepia() | url();
}
```

## 效果：

<div class="flex-space-between filter">
    <div class="filter-item filter-item-even">
        <p class="filter-item-title">blur(px)</p>
        <p class="filter-item-dec">
            给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起，
            所以值越大越模糊；如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值。
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `blur(${value1}px)` }"
        />
        <el-slider v-model="value1" class="filter-item-slider" show-input></el-slider>
    </div>
    <div class="filter-item">
        <p class="filter-item-title">brightness(%)</p>
        <p class="filter-item-dec">
            给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，则图像无变化。其他的值对应线性乘数效果。值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1。
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `brightness(${value2}%)` }"
        />
        <el-slider v-model="value2" class="filter-item-slider" show-input :max="300"></el-slider>
    </div>
    <div class="filter-item">
        <p class="filter-item-title">contrast(%)</p>
        <p class="filter-item-dec">
            调整图像的对比度。值是0%的话，图像会全黑。值是100%，图像不变。值可以超过100%，意味着会运用更低的对比。若没有设置值，默认是1。
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `contrast(${value3}%)` }"
        />
        <el-slider v-model="value3" class="filter-item-slider" show-input :max="300"></el-slider>
    </div>
    <div class="filter-item">
        <p class="filter-item-title">grayscale(%)</p>
        <p class="filter-item-dec">
            将图像转换为灰度图像。值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0；
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `grayscale(${value4}%)` }"
        />
        <el-slider v-model="value4" class="filter-item-slider" show-input></el-slider>
    </div>
    <div class="filter-item filter-item-even">
        <p class="filter-item-title">hue-rotate(deg)</p>
        <p class="filter-item-dec">
            给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈。
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `hue-rotate(${value5}deg)` }"
        />
        <el-slider v-model="value5" class="filter-item-slider" show-input :max="720"></el-slider>
    </div>
    <div class="filter-item">
        <p class="filter-item-title">invert(%)</p>
        <p class="filter-item-dec">
            反转输入图像。值定义转换的比例。100%的价值是完全反转。值为0%则图像无变化。值在0%和100%之间，则是效果的线性乘子。
            若值未设置，值默认是0。
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `invert(${value6}%)` }"
        />
        <el-slider v-model="value6" class="filter-item-slider" show-input></el-slider>
    </div>
    <div class="filter-item filter-item-even">
        <p class="filter-item-title">opacity(%)</p>
        <p class="filter-item-dec">
            转化图像的透明程度。值定义转换的比例。值为0%则是完全透明，值为100%则图像无变化。值在0%和100%之间，则是效果的线性乘子，也相当于图像样本乘以数量。
            若值未设置，值默认是1。该函数与已有的opacity属性很相似，不同之处在于通过filter，一些浏览器为了提升性能会提供硬件加速。
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `opacity(${value7}%)` }"
        />
        <el-slider v-model="value7" class="filter-item-slider" show-input :max="100"></el-slider>
    </div>
    <div class="filter-item">
        <p class="filter-item-title">saturate(%)</p>
        <p class="filter-item-dec">
            转换图像饱和度。值定义转换的比例。值为0%则是完全不饱和，值为100%则图像无变化。其他值，则是效果的线性乘子。超过100%的值是允许的，则有更高的饱和度。
            若值未设置，值默认是1。
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `saturate(${value8}%)` }"
        />
        <el-slider v-model="value8" class="filter-item-slider" show-input :max="300"></el-slider>
    </div>
    <div class="filter-item filter-item-even">
        <p class="filter-item-title">sepia(px)</p>
        <p class="filter-item-dec">
            将图像转换为深褐色。值定义转换的比例。值为100%则完全是深褐色的，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0；
        </p>
        <img
            class="filter-item-img"
            :src="withBase('/images/basic/filter.jpg')"
            :style="{ filter: `sepia(${value9}%)` }"
        />
        <el-slider v-model="value9" class="filter-item-slider" show-input></el-slider>
    </div>
</div>

<script>
import {defineComponent, reactive, toRefs} from 'vue';
import { withBase } from '@vuepress/client'
export default defineComponent({
    setup() {
        const data = reactive({
            value1: 0,
            value2: 100,
            value3: 100,
            value4: 0,
            value5: 0,
            value6: 0,
            value7: 100,
            value8: 0,
            value9: 0,
        })
        return {
            ...toRefs(data),
            withBase
        }
    }
})
</script>

<style lang="scss" scoped>
.filter {
    display: flex;
    padding: 10px 0;
    overflow: hidden;
    box-sizing: border-box;
    flex-wrap: wrap;
    &-item {
        flex: 0 0 50%;
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        &-even {
            border-right: 1px solid #ebeef5;
        }
        &-title {
            font-weight: 700;
            font-size: 18px;
            flex: 0 0 30px;
        }
        &-dec {
            color: #666666;
            flex: auto;
            padding: 0px 0 10px;
        }
        &-img {
            width: 100%;
            flex: 0 0 262px;
            margin-bottom: 10px;
        }
        &-slider {
            flex: 0 0 38px;
        }
    }
}
</style>
