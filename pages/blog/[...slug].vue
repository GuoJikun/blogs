<script setup lang="ts">
definePageMeta({
    layout: "blog",
});
</script>

<template>
    <main class="markdown">
        <ContentDoc :path="$route.path" />
    </main>
</template>

<style lang="scss">

</style>
