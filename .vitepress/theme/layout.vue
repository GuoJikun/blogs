<script setup>
    import { ref, watch } from "vue";

    import DefaultTheme from "vitepress/theme";
    const { Layout } = DefaultTheme;
    import { useData, useRoute } from "vitepress";
    const { isDark } = useData();

    const route = useRoute();
    const showComment = ref(true);
    watch(
        () => route.path,
        () => {
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
                    data-repo="guojikun/blog-vuepress"
                    data-repo-id="MDEwOlJlcG9zaXRvcnkzOTUyNzM1NDg="
                    data-category="评论"
                    data-category-id="DIC_kwDOF49lTM4CV3Gn"
                    data-mapping="url"
                    data-strict="1"
                    data-reactions-enabled="1"
                    data-emit-metadata="0"
                    data-input-position="top"
                    :data-theme="isDark ? 'dark' : 'light'"
                    data-lang="zh-CN"
                    data-crossorigin="anonymous"
                    data-loading="lazy"
                    async
                ></component>
            </div>
        </template>
    </Layout>
</template>
