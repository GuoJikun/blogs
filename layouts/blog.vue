<template>
    <div class="layout-blog">
        <layout-header />
        <div>
            <slot />
        </div>
        <layout-footer />
    </div>
</template>

<style lang="scss">
.layout-blog {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}
</style>
