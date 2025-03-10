<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const input = ref<{ input: HTMLInputElement }>()

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

type TR = TableRowPort
const title = 'Ports'
const clientStore = useClientStore()

const items = computed<TableRowPort[]>(() => clientStore.portRows)
const loading = computed(() => false)
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
  key: 'address',
  label: 'Address',
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
  key: 'options',
  label: 'Options'
}]

const defaultSort = ref({
  column: 'createdAt',
  direction: 'desc' as 'asc' | 'desc'
})

const toast = useToastExt()
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success({ title: 'Copied to clipboard', description: text })
  }).catch((_) => {
    toast.error({ title: 'Failed to copy' })
  })
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

const itemId = ref<string>()
const openModalForm = ref(false)
const selectedItem = computed(() => {
  if (!itemId.value) return undefined
  return clientStore.ports.find(t => t.id === itemId.value)
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
      disabled: !clientStore.devMode,
      click: async () => {
        deleteItemPrompt()
      }
    }]
  ]
})
const deleteLoading = ref(false)

const deleteItemContinue = async () => {
  deleteLoading.value = true
  await clientStore.deletePort(selectedIds.value)
  toast.success({ title: 'Delete Port', description: `Deleted (${selectedItems.value.length}) ports successfully!` })
  openModalDelete.value = false
  selectedItems.value = []
  deleteLoading.value = false
}

const openModalDelete = ref(false)
const deleteItemPrompt = () => {
  openModalDelete.value = true
}
// ====================================================================================================
</script>

<template>
  <UDashboardPanelContent class="p-0">
    <DataTable
      v-model="selectedItems"
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
          label="New port"
          trailing-icon="i-heroicons-plus"
          color="neutral"
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
    <ModalFormPort
      v-model="openModalForm"
      :port="selectedItem"
      :on-close="() => itemId = undefined"
    />
    <ModalPromptDelete
      v-model="openModalDelete"
      title="Delete Port"
      :description="`Are you sure you want to delete (${selectedIds.length}) ports?`"
      :on-close="() => itemId = undefined"
      :loading="deleteLoading"
      :accept="deleteItemContinue"
    />
  </UDashboardPanelContent>
</template>
