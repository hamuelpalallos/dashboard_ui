export function useStore() {
  const userStore = useUserStore()
  // const dashboardStore = useDashboardStore()
  // const clientAdminStore = useAdminStore()

  // const resetDataStore = () => {
  // userStore.$reset()
  // dashboardStore.$reset()
  // clientAdminStore.$reset()
  // }

  const resetUserStore = () => {
    userStore.$reset()
  }

  return {
    userStore,
    // dashboardStore,
    // clientAdminStore,
    // resetDataStore,
    resetUserStore
  }
}
