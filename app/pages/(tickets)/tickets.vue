<script setup lang="ts">
// add the auth middleware on this page
definePageMeta({
  middleware: ['auth']
})
const icon = useIcon()
const links = [[{
  label: 'All Tickets',
  icon: icon.ticket,
  to: '/tickets',
  exact: true
}, {
  label: 'Pending',
  icon: icon.exclamation,
  to: '/tickets/pending'
}, {
  label: 'Completed',
  icon: icon.check_circle,
  to: '/tickets/completed'
}]]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Tickets" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
    </UDashboardPanel>
  </UDashboardPage>
</template>
