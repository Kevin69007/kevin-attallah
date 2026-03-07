// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Kevin Attallah — Formations Professionnelles',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Formations professionnelles certifiantes éligibles CPF. Entrepreneuriat, business, langues et plus. Accompagnement personnalisé par Kevin Attallah.' },
        { name: 'theme-color', content: '#F4F7FB' },
        { property: 'og:title', content: 'Kevin Attallah — Formations Professionnelles' },
        { property: 'og:description', content: 'Lance ton business avec nos formations certifiantes éligibles CPF.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_FR' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables" as *;',
          api: 'modern-compiler',
        },
      },
    },
  },

  runtimeConfig: {
    // Server-only (override via NUXT_REVOLUT_API_KEY / NUXT_SENDINBLUE_API_KEY)
    revolutApiKey: '',
    sendinblueApiKey: '',
    // Public (override via NUXT_PUBLIC_* env vars at runtime)
    public: {
      facebookPixelId: '',
      googlePixelId: '',
      linkedinPartnerId: '',
      siteUrl: 'https://kevin-attallah.com',
      revolutSandbox: false,
    },
  },

  modules: ['@nuxt/image'],

  image: {
    quality: 80,
    format: ['webp', 'png', 'jpg'],
  },
})
