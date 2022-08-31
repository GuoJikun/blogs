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

    if(platform==='tauri'){
        const a = document.createElement('a');
        a.href = '/';
        a.click();
        console.log('a 被点击了')
    }else{
        console.log('其他来源')
    }
})
</script>