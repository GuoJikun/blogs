<script setup>
const { data: navigation } = await useAsyncData("navigation", () =>
    fetchContentNavigation()
);
</script>

<template>
    <pre>{{ navigation }}</pre>
</template>
