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
    console.log(location.hash, tmp.get("code"))
    const platform = tmp.get('state');
    if(platform === 'tauri'){
        console.log('执行了')
        const instance = new BroadcastChannel('cn-login');
        instance.postMessage('hello tauri!')
    }
})
</script>