---
layout: page
---



当前href: {{href}}

<script setup>
import { ref, onMounted } from 'vue';

const getParamMap = href => {
    return new URLSearchParams(href);
}

const href = ref('');
onMounted(()=>{
    href.value = location.href;
    const tmp = getParamMap(location.hash?.replace('#','?'));
    const platform = tmp.get('state');

    if(platform.startsWith('tauri+')){
        const tmpArr = platform.split('+');
        const env = tmpArr[1] || 'prod'
        const href = env === 'prod' ? 'https://tauri.localhost' : 'http://localhost:9001'
        const a = document.createElement('a');
        a.href = href;
        a.click();
        console.log('a 被点击了')
    }else{
        console.log('其他来源')
    }
})
</script>