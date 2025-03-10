<script setup lang="ts">
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
}, {
  key: 'actions',
  label: 'Actions'
}]

// =================================================================

const clientStore = useClientStore()
const state = reactive(
  useDataTableState({
    meta: {
      title: 'Passenger Types',
      description: 'This page provides a list of passenger type and their associated rates and fees.',
      category: 'type'
    },
    collectionSource: clientStore.passengerTypes,
    rows: clientStore.passengerTypeRows,
    deleteRecord: clientStore.deleteRecord?.passengerType,
    columns
  })
)
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <DataTable
      :title="state.meta.title"
      :items="state.rows"
      :columns="state.columns"
      :loading="state.loading"
      :default-sort="state.defaultSort"
    >
      <template #header-right>
        <UButton
          :label="`New ${state.meta.category}`"
          trailing-icon="i-heroicons-plus"
          color="neutral"
          @click="state.addItem"
        />
      </template>
      <template #active-column="{ row }">
        <TableColumnActive :value="row.active" />
      </template>
    </DataTable>
    <UModal
      v-model="state.openModalForm"
      :on-close="() => state.selectedItem = undefined"
    >
      <FormPassengerTypeClass
        :item="state.selectedItem"
        @success="state.openModalForm = false"
      />
    </UModal>
    <ModalPromptDelete
      v-model="state.openModalDelete"
      :title="`Delete ${state.meta.category}`"
      :description="`Are you sure you want to delete (${state.selectedIds.length}) ${state.meta.categories}?`"
      :on-close="() => state.selectedItemId = undefined"
      :loading="state.deleteLoading"
      :accept="state.deleteItemContinue"
    />
  </UDashboardPanelContent>
</template>
