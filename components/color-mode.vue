<script setup lang="ts">
const colorMode = useColorMode();
const options = [
    { key: "light", label: "光" },
    { key: "dark", label: "暗" },
];

const handleSelect = (key, option) => {
    console.log(option);
    colorMode.preference = key;
    colorMode.value = option.label;
    console.log(colorMode.value);
};
</script>

<template>
    <div>
        <n-switch
            v-model:value="colorMode.preference"
            checked-value="dark"
            unchecked-value="light">
            <template #checked>暗</template>
            <template #unchecked>光</template>
        </n-switch>
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
