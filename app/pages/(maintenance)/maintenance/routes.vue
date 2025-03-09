<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

type T = Route
type TR = TableRowRoute

const input = ref<{ input: HTMLInputElement }>()

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

// ===========================================================================================================
const title = 'Routes'
const clientStore = useClientStore()

const items = computed<TableRowRoute[]>(() => clientStore.routeRows)
const loading = computed(() => clientStore.routesPending)
const columns: TableColumn[] = [{
  key: 'id',
  label: 'ID',
  sortable: false,
  searchable: true
}, {
  key: 'origin',
  label: 'Origin',
  sortable: true,
  searchable: true
}, {
  key: 'destination',
  label: 'Destination',
  sortable: true,
  searchable: true
}, {
  key: 'capacity',
  label: 'Capacity',
  searchable: true
}, {
  key: 'passengerTypeClasses',
  label: 'Passenger Class',
  sortable: true,
  display: false
},
{
  key: 'cargoTypeClasses',
  label: 'Vehicle Class',
  sortable: true,
  display: false
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
  key: 'schedules',
  label: 'Schedules',
  sortable: true,
  searchable: true
}, {
  key: 'actions',
  label: 'Actions'
}]

const defaultSort = ref({
  column: 'active',
  direction: 'desc' as 'asc' | 'desc'
})

// const toast = useToast()
// const copyToClipboard = (text: string) => {
//   navigator.clipboard.writeText(text).then(() => {
//     toast.add({ title: 'Copied to clipboard', description: text })
//   }).catch((_) => {
//     toast.add({ title: 'Failed to copy' })
//   })
// }

// ====================================================================================================

const actionOptions = [
  [{
    label: 'Copy ID',
    icon: 'i-heroicons-document-duplicate',
    click: (r: any) => {
      copyToClipboard(r?.id)
    }
  }]
]

const itemId = ref<string>()
const selectedItem = computed<T | undefined>(() => {
  if (!itemId.value) return undefined
  return clientStore.routes.find(t => t.id === itemId.value)
})
const openItem = (row: TR) => {
  itemId.value = row.id
  openModalForm.value = true
}
const addItem = () => {
  itemId.value = ''
  openModalForm.value = true
}

const selectedItems = ref([])
const selectedIds = computed<string[]>(() => selectedItems.value.map((i: any) => i.id) ?? [])
const openDeleteModal = ref(false)
const deleteItemPrompt = () => {
  openDeleteModal.value = true
}
const deleteItemContinue = async () => {
  await clientStore.deletePort(selectedIds.value)
  openDeleteModal.value = false
  toast.success({ title: 'Delete Port', description: `Deleted (${selectedItems.value.length}) ports successfully!` })
  selectedItems.value = []
}
const toast = useToastExt()
const markAsOptions = computed<DropdownItem[][]>(() => {
  return [
    [{
      key: 'activate',
      label: 'Activate',
      icon: 'i-heroicons-check',
      click: async () => {
        await clientStore.toggleActivePort(selectedIds.value, true)
        toast.success({ title: 'Deactivated Port', description: `Deactivated (${selectedItems.value.length}) ports successfully!` })
        selectedItems.value = []
      }
    }, {
      key: 'deactivate',
      label: 'Deactivate',
      icon: 'i-heroicons-x-mark',
      click: async () => {
        await clientStore.toggleActivePort(selectedIds.value, false)
        toast.success({ title: 'Deactivated Port', description: `Deactivated (${selectedItems.value.length}) ports successfully!` })
        selectedItems.value = []
      }
    }],
    [{
      key: 'delete',
      label: 'Delete',
      icon: 'i-heroicons-trash',
      // class: '!text-red-500',
      // iconClass: '!text-red-500',
      // color: 'red',
      disabled: !clientStore.devMode,
      click: async () => {
        deleteItemPrompt()
      }
    }]
  ]
})
const openModalForm = ref(false)
const openModalDelete = ref(false)
const deleteLoading = ref(false)
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <DataTable
      by="id"
      :title
      :items
      :columns
      :loading
      :default-sort
      :mark-as-options
    >
      <template #header-right>
        <UButton
          label="Add route"
          icon="i-heroicons-plus"
          color="gray"
          @click="addItem"
        />
      </template>
      <template #active-column="{ row }">
        <TableColumnActive :value="row.active" />
      </template>
      <template #actions-column="{ row }">
        <DropdownActions
          :key="row.id"
          :row
          :actions="actionOptions"
          :open="() => openItem(row)"
          @click.prevent.stop
        />
      </template>
    </DataTable>
    <ModalFormRoute
      v-model="openModalForm"
      :item="selectedItem"
      :on-close="() => itemId = undefined"
    />
    <ModalPromptDelete
      v-model="openModalDelete"
      title="Delete Route"
      :description="`Are you sure you want to delete (${selectedIds.length}) routes?`"
      :on-close="() => itemId = undefined"
      :loading="deleteLoading"
      :accept="deleteItemContinue"
    />
  </UDashboardPanelContent>
</template>
