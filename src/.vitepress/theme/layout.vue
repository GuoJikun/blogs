<script setup>
    import DefaultTheme from "vitepress/theme";
    import VGiscus from "@giscus/vue";

    const { Layout } = DefaultTheme;
</script>

<template>
    <Layout>
        <template #doc-after>
            <div style="padding-top: 24px">
                <v-giscus
                    id="comments"
                    repo="guojikun/blog-vuepress"
                    repoId="MDEwOlJlcG9zaXRvcnkzOTUyNzM1NDg="
                    category="评论"
                    categoryId="DIC_kwDOF49lTM4CV3Gn"
                    mapping="url"
                    strict="1"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme="preferred_color_scheme"
                    lang="zh-CN"
                    loading="lazy"
                    crossorigin="anonymous"
                    async
                ></v-giscus>
            </div>
        </template>
    </Layout>
</template>
