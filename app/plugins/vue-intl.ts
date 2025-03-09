import { createIntl } from 'vue-intl'

export default defineNuxtPlugin((nuxtApp) => {
  const intl = createIntl({
    locale: 'en-PH',
    defaultLocale: 'en-PH',
  })
  nuxtApp.vueApp.use(intl)
  // nuxtApp.provide.intl = intl
})
