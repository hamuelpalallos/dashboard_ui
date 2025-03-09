export function useEnvironment() {
  const apiKey = ref(process.env.GOOGLE_CLOUD_API_KEY)

  const appEnv = ref(import.meta.env)
  const isDev = computed(() => appEnv.value.DEV)

  return {
    apiKey,
    appEnv,
    isDev,
  }
}
