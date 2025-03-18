// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt", "@nuxt/icon"],
  css: ["~/assets/css/main.css"],

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
