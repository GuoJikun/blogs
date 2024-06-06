<template>
    <div class="layout-blog">
        <layout-header />
        <div class="layout-blog-content">
            <slot />
        </div>
        <layout-footer />
    </div>
</template>

<style lang="scss">
.layout-blog {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
    &-content {
        padding: 12px 24px;
    }
}
</style>
