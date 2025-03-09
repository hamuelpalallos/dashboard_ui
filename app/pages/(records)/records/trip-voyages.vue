<script setup lang="ts">
// const q = ref('')

const input = ref<{ input: HTMLInputElement }>()
// const isNewUserModalOpen = ref(false)

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

// ===========================================================================================================
const title = 'Trip Voyages'
const clientStore = useClientStore()

const items = computed(() => clientStore.tripRows)
const loading = computed(() => clientStore.tripsPending)
const columns: TableColumn[] = [{
  key: 'id',
  label: 'ID',
  sortable: false,
  searchable: true
}, {
  key: 'number',
  label: 'Voyage No.',
  sortable: true,
  searchable: true
}, {
  key: 'route',
  label: 'Route',
  searchable: true
}, {
  key: 'departure',
  label: 'Departure',
  searchable: true,
  sortable: true,
  type: 'date'
},
{
  key: 'conveyance',
  label: 'Vessel/Barge',
  sortable: true,
  searchable: true
}, {
  key: 'createdAt',
  label: 'Created',
  searchable: true,
  sortable: true,
  type: 'date'
}, {
  key: 'updatedAt',
  label: 'Updated',
  searchable: true,
  sortable: true,
  type: 'date'
}, {
  key: 'description',
  label: 'Description',
  sortable: true,
  searchable: true
}]

const defaultSort = ref({
  column: 'createdAt',
  direction: 'desc' as 'asc' | 'desc'
})

// ====================================================================================================
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
      <template #active-column="{ row }">
        <TableColumnActive :value="row.active" />
      </template>
    </DataTable>
  </UDashboardPanelContent>
</template>
