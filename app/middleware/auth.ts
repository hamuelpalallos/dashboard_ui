export default defineNuxtRouteMiddleware((_to, _from) => {
  const log = useLogger()
  if (import.meta.server) return
  // skip middleware on client side entirely
  // if (import.meta.client) return
  // or only skip middleware on initial client load
  const nuxtApp = useNuxtApp()
  if ((import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered)) return
  const userStore = useUserStore()
  // if (userStore.userPending) return

  if (!userStore?.user) {
    log.i('NEW AUTH MIDDLEWARE: NOT AUTHORIZED')
    return navigateTo('/login')
  }
})
