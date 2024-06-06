<script setup lang="ts">
definePageMeta({
    layout: "blog",
});
</script>

<template>
    <div class="blog">
        <ContentList path="/blog" v-slot="{ list }" class="blog-article">
            <div
                v-for="article in list"
                :key="article._path"
                class="blog-article-item">
                <nuxt-link
                    :to="article._path"
                    class="blog-article-title"
                    activeClass="is-active">
                    {{ article.title }}
                </nuxt-link>
                <p class="blog-article-description" v-if="article.description">
                    {{ article.description }}
                </p>
            </div>
        </ContentList>
    </div>
</template>

<style lang="scss">
.blog {
    &-article {
        &-item {
            flex: 1;
            border-radius: 4px;
            & + & {
                margin-top: 16px;
            }
            h2 {
                margin: 0;
            }
        }
        &-title {
            &:hover {
                color: rgb(var(--color-primary-DEFAULT));
            }
            &.is-active {
                color: var(--color-primary-DEFAULT);
            }
        }
        &-description {
            margin-top: 8px;
            color: var(--color-text-SECONDARY);
            font-size: 14px;
        }
    }
}
</style>
