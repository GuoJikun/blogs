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
    const code = tmp.get('code');

    if(platform.startsWith('tauri')){
        const tmpArr = decodeURIComponent(platform).split('+');
        const env = tmpArr[1] || 'prod'
        const href = env === 'prod' ? `https://tauri.localhost/auth?code=${code}` : `http://localhost:9001/auth?code=${code}`
        const a = document.createElement('a');
        a.href = href;
        a.click();
        console.log('a 被点击了')
    }else{
        console.log('其他来源')
    }
})
</script>