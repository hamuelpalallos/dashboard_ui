<script setup lang="ts">
const input = ref<{ input: HTMLInputElement }>()

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

// ===========================================================================================================
const clientStore = useClientStore()
const title = 'Vehicles'

const items = computed(() => clientStore.cargoRows)
const loading = computed(() => clientStore.ticketsPending)
const data = useData()

const columns: TableColumn[] = [{
  key: 'route',
  label: 'Route',
  sortable: true,
  searchable: true,
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
}, {
  key: 'status',
  label: 'Status',
  searchable: true,
  sortable: true,
  dropdown: true,
  options: data.options([...PASSENGER_STATUS], [{ label: 'Planned', value: 'planned', selected: false }], { selected: true }),
  sort: (a: TicketStatus, b: TicketStatus, direction: 'asc' | 'desc') => {
    const aVal: number = TicketInstance.statusValue(a) ?? 0
    const bVal: number = TicketInstance.statusValue(b) ?? 0
    return direction === 'asc' ? aVal - bVal : bVal - aVal
  }
}, {
  key: 'plate',
  label: 'Plate No.',
  sortable: true,
  searchable: true
}, {
  key: 'type',
  label: 'Type',
  sortable: true,
  searchable: true
}, {
  key: 'rate',
  label: 'Rate',
  sortable: true,
  searchable: true,
  type: 'number'
}, {
  key: 'id',
  label: 'Ticket/Cargo ID',
  sortable: false,
  searchable: true
}]

const defaultSort = ref({
  column: 'departure',
  direction: 'desc' as 'asc' | 'desc'
})
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
          class="-ml-2.5"
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
