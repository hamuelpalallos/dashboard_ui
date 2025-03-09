export const useEnv = () => {
  const nuxtApp = useNuxtApp()
  const GOOGLE_MAPS_API_KEY = nuxtApp.$config.public.GOOGLE_MAPS_API_KEY

  return {
    GOOGLE_MAPS_API_KEY
  }
}
