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
        { name: 'theme-color', content: '#0A0514' },
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
      script: [
        { src: 'https://checkout.revolut.com/checkout.js', async: true },
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
    // Server-only
    revolutApiKey: process.env.REVOLUT_API_KEY || '',
    revolutWebhookSecret: process.env.REVOLUT_WEBHOOK_SECRET || '',
    sendinblueApiKey: process.env.BREVO_API_KEY || '',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    // Public (exposed to client)
    public: {
      fbPixelId: process.env.NUXT_PUBLIC_FACEBOOK_PIXEL_ID || '',
      gaId: process.env.NUXT_PUBLIC_GOOGLE_PIXEL_ID || '',
      linkedinPartnerId: process.env.NUXT_PUBLIC_LINKEDIN_PARTNER_ID || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://kevin-attallah.com',
    },
  },

  modules: ['@nuxt/image'],

  image: {
    quality: 80,
    format: ['webp', 'png', 'jpg'],
  },
})
