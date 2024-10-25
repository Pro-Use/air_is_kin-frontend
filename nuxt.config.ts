export default defineNuxtConfig({
  ssr: false,
  experimental: {
    payloadExtraction: true,
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    }
  },
  css: ['~/assets/main.css'],   
  devtools: { enabled: false },
  debug: true,
  modules: [
    'nuxt-kql',
    '@pinia/nuxt',
    '@nuxt/scripts'
  ],
  kql: {
    auth: 'bearer'
  }
})