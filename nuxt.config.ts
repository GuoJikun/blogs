// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxt/image", "@nuxt/content"],
    devServer: {
        port: 9010,
    },
    content: {
        documentDriven: true,
        highlight: {
            theme: {
                // Default theme (same as single string)
                default: "github-light",
                // Theme used if `html.dark`
                dark: "github-dark",
                // Theme used if `html.sepia`
                sepia: "monokai",
            },
        },
    },
});
