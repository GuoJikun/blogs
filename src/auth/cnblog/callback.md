---
layout: false
---

<script setup>
import { ref, onMounted } from 'vue';

const getParamMap = href => {
    return new URLSearchParams(href);
}

const href = ref('');
onMounted(async ()=>{
    const { window } = window.__TAURI__

    href.value = location.href;
    const tmp = getParamMap(href.value);
    const platform = tmp.get('state');
    const code = tmp.get('code');

    console.log(platform)
    console.log(code)
    const tmpArr = decodeURIComponent(platform).split('_');
    console.log(tmpArr)
    const env = tmpArr[1] || 'prod'
    console.log(env)
    const href = env === 'prod' ? `https://tauri.localhost/auth?code=${code}` : `http://localhost:9001/auth?code=${code}`
    const a = document.createElement('a');
    a.href = href;
    setTimeout(() => {
        a.click();
    }, 10);
    console.log('a 被点击了')

})
</script>
