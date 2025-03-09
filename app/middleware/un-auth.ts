export default defineNuxtRouteMiddleware((_to, _from) => {
  const log = useLogger()
  if (import.meta.server) return

  const nuxtApp = useNuxtApp()
  if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return

  const userStore = useUserStore()

  if (userStore?.user) {
    log.i('UN_AUTH MIDDLEWARE: ALREADY LOGGED IN')
    return navigateTo('/')
  }
})
