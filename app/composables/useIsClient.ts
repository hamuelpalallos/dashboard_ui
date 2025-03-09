export const useIsClient = () => {
  return computed(() => import.meta.client)
}
