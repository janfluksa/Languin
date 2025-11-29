// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Provide appConfig at build time so modules (like @nuxt/ui) can read it
  appConfig: {
    ui: {
      colors: {
       // primary: 'bg-600'
      },
      header: {
        slots: {
         // container: ' mx-auto px-4 sm:px-4 lg:px-4 flex items-center justify-between gap-3 h-full',
        }
      }
    }
  },

  runtimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING,
    // private hodnoty
  },

  nitro: {
    plugins: ['~~/server/plugins/mongodb.ts'],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui'
  ]
})
