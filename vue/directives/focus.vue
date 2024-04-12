<template>
    <div>
        <layout-item title="foucs指令" desc="可以使绑定指令的元素在页面加载后自动获得焦点">
            <input v-focus />
        </layout-item>
    </div>
</template>

<script>
import Focus from '@/directives/focus.js'

export default {
    directives: { Focus },
    data() {
        return {}
    },
}
</script>
