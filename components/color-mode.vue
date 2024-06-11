<script setup lang="ts">
import { Sunny, Moon } from "@element-plus/icons-vue";

const color = useColorMode();
const colorMode = computed({
    get: () => color.value === "dark",
    set: () => (color.preference = color.value === "dark" ? "light" : "dark"),
});
</script>

<template>
    <div>
        <ClientOnly>
            <el-switch
                style="--el-switch-on-color: var(--el-border-color)"
                v-model="colorMode"
                inline-prompt
                :active-action-icon="Moon"
                :inactive-action-icon="Sunny"></el-switch>
        </ClientOnly>
    </div>
</template>

<style>
body {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
    background-color: #091a28;
    color: #ebf4f1;
}
.sepia-mode body {
    background-color: #f1e7d0;
    color: #433422;
}
</style>
