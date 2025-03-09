<script setup lang="ts">
// add the auth middleware on this page
definePageMeta({
  middleware: ['auth']
})

const icon = useIcon()
const links = [[{
  label: 'Ports',
  icon: icon.port,
  to: '/maintenance/ports'
}, {
  label: 'Routes',
  icon: icon.route,
  to: '/maintenance/routes',
  exact: true
}, {
  label: 'Trip Cancellations',
  icon: icon.cancel,
  to: '/maintenance/trip-cancellations'
}, {
  label: 'Notices',
  icon: icon.notice,
  to: '/maintenance/notices'
}, {
  label: 'Passenger Types',
  icon: icon.type,
  to: '/maintenance/passenger-types'
}, {
  label: 'Vehicle Types',
  icon: icon.type,
  to: '/maintenance/cargo-types'
}, {
  label: 'Conveyances',
  icon: icon.conveyance,
  to: '/maintenance/conveyances'
}]]

const title = ref('Maintenance')
const { devMode } = useClientStore()
const badge = computed(() => devMode ? 'Dev' : 'Prod')
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        :title
        :badge
      />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <!-- <ClientOnly > -->
      <NuxtPage />
      <!-- </ClientOnly> -->
    </UDashboardPanel>
  </UDashboardPage>
</template>
