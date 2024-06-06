<script setup lang="ts">

defineProps({
    type:{
        type: String,
        default: 'primary',
    },
    title: String,
});

</script>


<template>
    <UAlert
        :color="type"
        variant="subtle"
        :title="title">
        <template #description>
            <slot />
        </template>
    </UAlert>
</template>
