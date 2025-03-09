<script setup lang="ts">
const input = ref<{ input: HTMLInputElement }>()

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

const adminStore = useAdminStore()
const title = 'Pending'

const items = computed<TableRowTicket[]>(() => adminStore.ticketRows)

const actionOptions = [
  [{
    label: 'Copy ID',
    icon: 'i-heroicons-document-duplicate',
    click: (r: any) => {
      copyToClipboard(r?.id)
    }
  }, {
    label: 'Show QR Code',
    icon: 'i-heroicons-qr-code',
    click: (r: any) => {
      openTicketModal(r)
    }
  }],
  [{
    label: 'Approve Ticket',
    icon: 'i-heroicons-check-circle',
    disabled: (r: any) => {
      if (r?.status !== 'pending') return true
      return false
    },
    click: (r: any) => {
      if (r?.status === 'pending') {
        openTicketApprovalModal(r)
      }
    }
  }]
]

const columns: TableColumn[] = [{
  key: 'id',
  label: 'ID',
  sortable: false,
  searchable: true
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
  display: false
}, {
  key: 'company',
  label: 'Company',
  sortable: true,
  searchable: true,
  dropdown: true,
  generate: true

}, {
  key: 'route',
  label: 'Route',
  sortable: true,
  searchable: true,
  dropdown: true,
  generate: true
}, {
  key: 'departure',
  label: 'Departure',
  sortable: true,
  type: 'date',
  searchable: true
},
{
  key: 'passengers',
  label: 'Psgr.',
  sortable: true,
  searchable: true
  // dropdown: true,
  // generate: true
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
  generate: true,
  options: [
    { label: 'Pending', value: 'pending', selected: true }
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
},
{
  key: 'options',
  label: 'Options'
}
]

const defaultSort = ref({
  column: 'departure',
  direction: 'desc' as 'asc' | 'desc'
})

const loading = computed(() => adminStore.ticketsPending)

const ticketId = ref<string>()
const isTicketModalOpen = ref(false)
const isTicketApprovalModalOpen = ref(false)
const selectedTicket = computed(() => {
  return adminStore.tickets.find(t => t.id === ticketId.value)
})
const openTicketModal = (row: TableRowTicket) => {
  // console.log('OPEN TICKET: ', row.id)
  ticketId.value = row.id
  isTicketModalOpen.value = true
}
const openTicket = (row: TableRowTicket) => {
  // console.log('OPEN TICKET: ', row.id)
  openTicketModal(row)
}
const openTicketApprovalModal = (row: TableRowTicket) => {
  // console.log('OPEN TICKET APPROVAL: ', row.id)
  ticketId.value = row.id
  isTicketApprovalModalOpen.value = true
}
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <!-- <ClientOnly> -->
    <DataTable
      :title
      :items
      :columns
      :loading
      :default-sort
    >
      <template #header-right>
        <CustomDatePicker
          v-model="adminStore.dateRange"
          type="date"
          class="p-0"
        />
      </template>
      <template #user-column="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar
            :alt="row.user_initials"
            :src="row.user_image"
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
      <template #options-column="{ row }">
        <DropdownActions
          :key="row.id"
          :row
          :actions="actionOptions"
          :open="() => openTicket(row)"
          @click.prevent.stop
        />
      </template>
    </DataTable>
    <!-- </ClientOnly> -->
    <ModalTicket
      v-model="isTicketModalOpen"
      :ticket="selectedTicket"
    />
    <ModalTicketApproval
      v-model="isTicketApprovalModalOpen"
      :ticket="selectedTicket"
    />
  </UDashboardPanelContent>
</template>
