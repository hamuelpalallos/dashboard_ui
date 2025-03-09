const DEV_QUERY = true as const

export function useConfig() {
  const apiKey = ref(import.meta.env.GOOGLE_CLOUD_API_KEY)

  const appEnv = ref(import.meta.env)
  const isDev = computed(() => appEnv.value.DEV)
  const devQuery = computed(() => import.meta.env.DEV && DEV_QUERY)

  return {
    devQuery,
    apiKey,
    appEnv,
    isDev,
  }
}
