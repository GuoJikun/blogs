当前href: {{href}}

<script setup>
import {onMounted} from 'vue';
const href = ref('');
onMounted(()=>{
    href.value = location.href;
    console.log(href.value)
})
</script>