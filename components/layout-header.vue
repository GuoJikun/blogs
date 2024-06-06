<template>
    <header class="layout-header">
        <div><h1>前端小栈</h1></div>
        <div class="layout-header-extra">
            <nav class="layout-header-nav">
                <nuxt-link to="/blogs" class="layout-header-nav-item">
                    博客
                </nuxt-link>
                <nuxt-link to="/docs" class="layout-header-nav-item">
                    文档
                </nuxt-link>
            </nav>
            <color-mode />
        </div>
    </header>
</template>

<style lang="scss">
.layout-header {
    display: flex;
    align-items: center;
    gap: 48px;
    padding: 8px 24px;
    &-extra {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 24px;
    }

    &-nav {
        display: inline-flex;
        gap: 12px;
    }
}
</style>
