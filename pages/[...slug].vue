<script setup lang="ts">
definePageMeta({
    layout: "blog",
});
</script>

<template>
    <main>
        <ContentDoc :path="$route.path" />
    </main>
</template>
