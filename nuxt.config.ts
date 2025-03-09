// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    'nuxt-vuefire'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  vuefire: {
    config: {
      apiKey: import.meta.env.FIREBASE_API_KEY,
      authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.FIREBASE_APP_ID,
      measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID
    },
    auth: {
      enabled: true
      // sessionCookie: true
      // popupRedirectResolver: 'browser',
    },
    emulators: false
  }
})
