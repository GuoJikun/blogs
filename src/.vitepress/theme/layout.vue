<script setup>
import { ref, watch } from "vue";

import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
import { useData, useRoute } from "vitepress";
const { isDark } = useData();

import envConfig from "../config/env.js";
const isDev = import.meta.env.DEV;

const route = useRoute();
const showComment = ref(true);
watch(
    () => route.path,
    () => {
        if (isDev) {
            showComment.value = false;
            return;
        }
        showComment.value = false;
        setTimeout(() => {
            showComment.value = true;
        }, 200);
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <Layout>
        <template #doc-after>
            <div style="padding-top: 24px">
                <component
                    v-if="showComment"
                    :key="route.path"
                    is="script"
                    src="https://giscus.app/client.js"
                    data-id="comments"
                    :data-repo="envConfig.repo"
                    :data-repo-id="envConfig.repoId"
                    :data-category="envConfig.category"
                    :data-category-id="envConfig.categoryId"
                    data-mapping="url"
                    data-strict="1"
                    data-reactions-enabled="1"
                    data-emit-metadata="0"
                    data-input-position="top"
                    :data-theme="isDark ? 'dark' : 'light'"
                    data-lang="zh-CN"
                    data-crossorigin="anonymous"
                    data-loading="lazy"
                    async></component>
            </div>
        </template>
    </Layout>
</template>
