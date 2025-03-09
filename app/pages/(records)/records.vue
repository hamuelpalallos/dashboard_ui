<script setup lang="ts">
// add the auth middleware on this page
definePageMeta({
  middleware: ['auth']
})

const icon = useIcon()
const links = [[{
  label: 'Tickets',
  icon: icon.ticket,
  to: '/records/tickets'
  // exact: true
}, {
  label: 'Passengers',
  icon: icon.passenger,
  to: '/records/passengers'
}, {
  label: 'Vehicles',
  icon: icon.vehicle,
  to: '/records/cargos'
}], [
  {
    label: 'Trips (Voyages)',
    icon: icon.trip,
    to: '/records/trip-voyages'
  }
]]
const title = ref('Records')
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

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
