// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: ["@vueuse/nuxt", "@nuxt/image"],
  image: {
    domains: ["https://fastly.picsum.photos/"],
  },
  nitro: {
    routeRules: {
      "/api/images": {
        cache: {
          maxAge: 60 * 60,
        },
      },
    },
  },
});
