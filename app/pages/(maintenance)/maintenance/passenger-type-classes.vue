<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const pageData = usePageData({
  title: 'Passenger Type Classifications',
  description: 'This page provides a list of passenger type classifications and their associated rates and fees.',
  category: 'class'
})

const clientStore = useClientStore()
const items = computed<TableRowPassengerTypeClass[]>(() => clientStore.passengerTypeClassRows)
const loading = computed(() => clientStore.passengerTypesPending)

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
  key: 'ageRange',
  label: 'Age Range',
  searchable: true,
  sortable: true
}, {
  key: 'rate',
  label: 'Rate',
  searchable: true,
  sortable: true
}, {
  key: 'fee',
  label: 'Fee',
  searchable: true,
  sortable: true
}, {
  key: 'description',
  label: 'Description',
  searchable: true
}, {
  key: 'active',
  label: 'Active',
  sortable: true,
  searchable: true
}, {
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
  key: 'options',
  label: 'Actions'
}]

const defaultSort = ref({
  column: 'createdAt',
  direction: 'desc' as 'asc' | 'desc'
})

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success({ title: 'Copied to clipboard', description: text })
  }).catch((_) => {
    toast.error({ title: 'Failed to copy' })
  })
}

// ====================================================================================================

const markAsOptions = computed<DropdownItem[][]>(() => {
  return [
    [{
      key: 'activate',
      label: 'Activate',
      icon: 'i-heroicons-check',
      click: async () => {
        await clientStore.toggleActivePassengerTypeClass(selectedIds.value, true)
        toast.success({ title: `Activated ${pageData.category}`, description: `Deactivated (${selectedRows.value.length}) ${pageData.category} successfully!` })
        selectedRows.value = []
      }
    }, {
      key: 'deactivate',
      label: 'Deactivate',
      icon: 'i-heroicons-x-mark',
      click: async () => {
        await clientStore.toggleActivePassengerTypeClass(selectedIds.value, false)
        toast.success({ title: `Deactivated ${pageData.category}`, description: `Deactivated (${selectedRows.value.length}) ${pageData.category} successfully!` })
        selectedRows.value = []
      }
    }],
    [{
      key: 'delete',
      label: 'Delete',
      icon: 'i-heroicons-trash',
      disabled: !clientStore.devMode,
      click: async () => {
        deleteItemPrompt()
      }
    }]
  ]
})
type TR = TableRowPassengerTypeClass
type T = PassengerTypeClass
const toast = useToastExt()

const selectedRows = ref<TR[]>([])
const selectedIds = computed<string[]>(() => selectedRows.value.map((i: any) => i.id) ?? [])
const itemId = ref<string>()
const openModalForm = ref(false)
const selectedItem = computed(() => {
  if (!itemId.value) return undefined
  return clientStore.passengerTypeClasses.find(t => t.id === itemId.value)
})
const selectedItems = computed<T[]>(() => {
  return clientStore.passengerTypeClasses.filter(t => selectedIds.value.includes(t.id))
})
const openItem = (row: TR) => {
  itemId.value = row.id
  openModalForm.value = true
}

const addItem = () => {
  itemId.value = ''
  openModalForm.value = true
}
const openModalDelete = ref(false)
const deleteItemPrompt = () => {
  openModalDelete.value = true
}
const deleteLoading = ref(false)

const deleteItemContinue = async () => {
  deleteLoading.value = true
  await clientStore.deleteRecord?.passengerTypeClass(selectedItems.value)
  toast.success({ title: `Delete ${pageData.Category}`, description: `Deleted (${selectedRows.value.length}) ${pageData.categories} successfully!` })
  openModalDelete.value = false
  selectedRows.value = []
  deleteLoading.value = false
}

const actionOptions = [
  [{
    label: 'Copy ID',
    icon: 'i-heroicons-document-duplicate',
    click: (r: any) => {
      copyToClipboard(r?.id)
    }
  }]
]
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <DataTable
      v-model="selectedRows"
      :title="pageData.title"
      :items
      :columns
      :loading
      :default-sort
      :mark-as-options
    >
      <!-- <template #header-right>
        <CustomDatePicker
          v-model="clientStore.dateRange"
          type="date"
          class="-ml-2.5"
        />
      </template> -->
      <template #header-right>
        <UButton
          :label="`New ${pageData.category}`"
          trailing-icon="i-heroicons-plus"
          color="gray"
          @click="addItem"
        />
      </template>
      <template #active-column="{ row }">
        <TableColumnActive :value="row.active" />
      </template>

      <template #options-column="{ row }">
        <DropdownActions
          :key="row.id"
          :row
          :actions="actionOptions"
          :open="() => openItem(row)"
          @click.prevent.stop
        />
      </template>
    </DataTable>
    <UModal
      v-model="openModalForm"
      :on-close="() => itemId = undefined"
    >
      <FormPassengerTypeClass
        :item="selectedItem"
        @success="openModalForm = false"
      />
    </UModal>
    <ModalPromptDelete
      v-model="openModalDelete"
      :title="`Delete ${pageData.category}`"
      :description="`Are you sure you want to delete (${selectedIds.length}) ${pageData.categories}?`"
      :on-close="() => itemId = undefined"
      :loading="deleteLoading"
      :accept="deleteItemContinue"
    />
  </UDashboardPanelContent>
</template>
