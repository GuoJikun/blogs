<script setup lang="ts">
const { data } = await useAsyncData("navigation", () =>
    fetchContentNavigation(queryContent("docs"))
);

const navigation = data.value?.[0];

const menu = navigation?.children || [];
</script>

<template>
    <div class="layout-doc">
        <layout-header />
        <div class="layout-doc-content">
            <div class="layout-doc-aside">
                <ul>
                    <li v-for="item in menu" :key="item._path">
                        <nuxt-link :to="item._path">{{ item.title }}</nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="layout-doc-body"><slot /></div>
        </div>
        <layout-footer />
    </div>
</template>

<style lang="scss">
.layout-doc {
    max-width: 1000px;
    margin: 0 auto;
    &-content {
        padding: 12px 24px;
        display: flex;
    }

    &-aside {
        flex: 0 0 240px;
        font-size: 14px;
    }
    &-body {
        flex: auto;
    }
}
</style>
