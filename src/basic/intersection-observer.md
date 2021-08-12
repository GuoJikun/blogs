判断目标元素是否进入视线--利用 intersectionObserver api

<div class="box" ref="boxEle">
    <div style="height: 1000px;"></div>
    <div class="target" ref="targetEle"></div>
    <div style="height: 1000px;"></div>
</div>
<p>目标元素是否进入视线：<span style="color: red;" id="tar">{{text}}</span></p>

```html
<div class="box" ref="boxEle">
  <div style="height: 1000px;"></div>
  <div class="target" ref="targetEle"></div>
  <div style="height: 1000px;"></div>
</div>
<p>目标元素是否进入视线：<span style="color: red;" id="tar">{{text}}</span></p>
```

```js
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  setup() {
    const boxEle = ref(null);
    const targetEle = ref(null);
    const text = ref("否");

    const handler = function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          console.log(1);
          text.value = "是";
        } else {
          text.value = "否";
        }
        // 每个成员都是一个IntersectionObserverEntry对象。
        // 举例来说，如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。
        // entry.boundingClientRect //目标元素的位置信息
        // entry.intersectionRatio //目标元素的可见比例
        // entry.intersectionRect //交叉部分的位置信息
        // entry.isIntersecting
        // entry.rootBounds //根元素的位置
        // entry.target
        // entry.time //时间戳
      });
    };
    const scrollTest = function () {
      const options = {
        root: boxEle.value,
        rootMargin: "100px",
        threshold: 1,
      };
      const observer = new IntersectionObserver(handler, options);
      observer.observe(targetEle.value);
    };

    onMounted(() => {
      scrollTest();
    });

    return {
      boxEle,
      targetEle,
      text,
    };
  },
});
```

<script>
import {defineComponent, ref, onMounted} from 'vue';
export default defineComponent({
    setup(){
        const boxEle = ref(null);
        const targetEle = ref(null);
        const text = ref('否')

        const handler = function (entries, observer) {
            entries.forEach(function (entry) {
                if(entry.isIntersecting){
                    console.log(1)
                    text.value = '是'
                }else{
                    text.value = '否'
                }
            // 每个成员都是一个IntersectionObserverEntry对象。
            // 举例来说，如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。
            // entry.boundingClientRect //目标元素的位置信息
            // entry.intersectionRatio //目标元素的可见比例
            // entry.intersectionRect //交叉部分的位置信息
            // entry.isIntersecting
            // entry.rootBounds //根元素的位置
            // entry.target
            // entry.time //时间戳
            });
        }
        const scrollTest = function (){
            const options = {
                root: boxEle.value,
                rootMargin: '100px',
                threshold: 1,
            }
            const observer = new IntersectionObserver(handler, options)
            observer.observe(targetEle.value);
        }

        onMounted(()=>{
            scrollTest()
        })

        return {
            boxEle,
            targetEle,
            text
        }
    }
})
</script>

<style>
.box{
    height: 50vh;
    background-color: gray;
    overflow: scroll;
}
.target{
    background-color: blue;
    height: 200px;
}
</style>
