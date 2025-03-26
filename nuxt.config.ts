// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt", "@nuxt/icon"],
  css: ["~/assets/css/main.css", "@mdi/font/css/materialdesignicons.css"],
  ui: {
    theme: {
      colors: ["primary", "secondary", "success", "info", "warning", "error"],
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-27",
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
});
