<script setup lang="ts">
const input = ref<{ input: HTMLInputElement }>()

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

// ===========================================================================================================
const clientStore = useClientStore()
const title = 'Tickets'

const items = computed(() => clientStore.ticketRows)

const columns: TableColumn[] = [{
  key: 'id',
  label: 'ID',
  sortable: false,
  searchable: true,
  display: false
}, {
  key: 'user',
  label: 'User',
  sortable: true,
  searchable: true
}, {
  key: 'user_email',
  label: 'Email',
  sortable: true,
  searchable: true,
  hidden: true
}, {
  key: 'route',
  label: 'Route',
  sortable: true,
  searchable: true,
  // filter: 'dropdown'
  dropdown: true,
  options: [
    { label: 'Sibulan - Liloan', value: 'Sibulan - Liloan' },
    { label: 'Liloan - Sibulan', value: 'Liloan - Sibulan' }
  ]
}, {
  key: 'departure',
  label: 'Departure',
  sortable: true,
  type: 'date',
  searchable: true
},
{
  key: 'cargo',
  label: 'Vehicle',
  sortable: true,
  searchable: true
},
{
  key: 'createdAt',
  label: 'Created',
  sortable: true,
  searchable: true,
  type: 'date'
}, {
  key: 'status',
  label: 'Status',
  searchable: true,
  sortable: true,
  dropdown: true,
  options: [
    { label: 'Paid', value: 'paid', selected: true },
    { label: 'Inspected', value: 'inspected', selected: true },
    { label: 'Used', value: 'used', selected: true },
    { label: 'Cancelled', value: 'cancelled', selected: true },
    { label: 'Refunded', value: 'refunded', selected: true },
    { label: 'Unpaid', value: 'unpaid' }
  ],
  sort: (a: TicketStatus, b: TicketStatus, direction: 'asc' | 'desc') => {
    const aVal: number = TicketInstance.statusValue(a) ?? 0
    const bVal: number = TicketInstance.statusValue(b) ?? 0
    return direction === 'asc' ? aVal - bVal : bVal - aVal
  }
}, {
  key: 'usedAt',
  label: 'Used',
  sortable: true,
  searchable: true,
  display: false,
  type: 'date'
}, {
  key: 'subtotal',
  label: 'Total',
  sortable: true,
  searchable: true,
  type: 'number'
}]

const defaultSort = ref({
  column: 'departure',
  direction: 'desc' as 'asc' | 'desc'
})

const loading = computed(() => clientStore.ticketsPending)

// const toast = useToast()
// const copyToClipboard = (text: string) => {
//   navigator.clipboard.writeText(text).then(() => {
//     toast.add({ title: 'Copied to clipboard', description: text })
//   }).catch((_) => {
//     toast.add({ title: 'Failed to copy' })
//   })
// }

// const viewTicket = (id: string) => {
//   console.log('VIEW TICKET: ', id)
// }
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <DataTable
      :title
      :items
      :columns
      :loading
      :default-sort
    >
      <template #header-right>
        <CustomDatePicker
          v-model="clientStore.dateRange"
          type="date"
          class="p-0"
        />
      </template>
      <template #user-column="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :alt="row.user_initials"
            size="xs"
          />

          <div class="flex flex-col">
            <span
              v-if="row.user_name"
              class="text-gray-900 dark:text-white font-medium"
            >
              {{ row.user_name }}
            </span>
            <span class="text-xs text-ellipsis text-gray-400 dark:text-gray font-medium">{{ row.user_email }}</span>
          </div>
        </div>
      </template>

      <template #status-column="{ row }">
        <UBadge
          :color="TicketInstance.statusColor(row.status)"
          :label="row.status"
          variant="subtle"
          class="uppercase"
        />
      </template>
    </DataTable>
  </UDashboardPanelContent>
</template>
