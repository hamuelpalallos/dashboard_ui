<script setup lang="ts">
//

definePageMeta({
  title: 'Ticket',
  description: 'Ticket details'
})
// const { ticket } = defineProps<{ ticket?: Ticket }>()
const id = useRoute().params.id as string
const ticket = ref()
const row = ref()
const adminStore = useAdminStore()
onMounted(() => {
  // console.log('Ticket: ', id)
  ticket.value = adminStore.tickets.find(t => t.id === id)
  row.value = adminStore.ticketRows.find(t => t.id === id)
})
</script>

<template>
  <div class="overflow-auto">
    <!-- <ClientOnly> -->
      <CustomQrCode :value="id" />
    <!-- </ClientOnly> -->
    <pre>
    USER REF:  {{ typeof ticket?.userReference }}
    </pre>
    <code>
      <pre>
      {{ row }}
    </pre>
      <pre>
      {{ ticket }}
    </pre>
    </code>
  </div>
</template>
