当前href: {{href}}

<script setup>
import { ref, onMounted } from 'vue';

const getParamMap = href => {
    return new URLSearchParams(href);
}

const href = ref('');
onMounted(()=>{
    href.value = location.href;
    const tmp = getParamMap(location.search);
    console.log(href.value, tmp.get("code"))
})
</script>