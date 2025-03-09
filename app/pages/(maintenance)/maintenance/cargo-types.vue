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
const title = 'Cargo Types'
const clientStore = useClientStore()
const items = computed(() => clientStore.cargoTypeRows)
const loading = computed(() => clientStore.cargoTypesPending)

const columns: TableColumn[] = [{
  key: 'id',
  label: 'ID',
  sortable: false,
  searchable: true
}, {
  key: 'name',
  label: 'Name',
  sortable: true,
  searchable: true
}, {
  key: 'classSnapshot',
  label: 'Class',
  sortable: true,
  searchable: true
}, {
  key: 'description',
  label: 'Description',
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
  key: 'updatedAt',
  label: 'Updated',
  searchable: true,
  sortable: true,
  type: 'date'
}, {
  key: 'active',
  label: 'Active',
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
      <!-- <template #header-right>
        <CustomDatePicker
          v-model="clientStore.dateRange"
          type="date"
          class="-ml-2.5"
        />
      </template> -->

      <template #active-column="{ row }">
        <TableColumnActive :value="row.active" />
      </template>
    </DataTable>
  </UDashboardPanelContent>
</template>
