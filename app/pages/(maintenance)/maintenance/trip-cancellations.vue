<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const input = ref<{ input: HTMLInputElement }>()

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

// ===========================================================================================================
const title = 'Trip Cancellations'
const clientStore = useClientStore()

const items = computed(() => clientStore.tripCancellationRows)
const loading = computed(() => clientStore.tripCancellationsPending)
const columns: TableColumn[] = [{
  key: 'id',
  label: 'ID',
  sortable: false,
  searchable: true
}, {
  key: 'title',
  label: 'Title/Reason',
  sortable: true,
  searchable: true
}, {
  key: 'description',
  label: 'Description',
  searchable: true
},
{
  key: 'routes',
  label: 'Routes',
  sortable: true
}, {
  key: 'dateSetting',
  label: 'Date Coverage',
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

const activeColor = (active?: string | boolean) => {
  if (typeof active === 'string') {
    switch (active?.toLowerCase()) {
      case 'yes': return 'green'
      default: {
        return 'gray'
      }
    }
  }
  return active ? 'green' : 'gray'
}

const itemId = ref()
const openItem = (row: any) => {
  itemId.value = row.id
  openModalForm.value = true
}
const addItem = () => {
  itemId.value = ''
  openModalForm.value = true
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
const selectedItem = computed<TripCancellation | undefined>(() => {
  if (!itemId.value) return undefined
  return clientStore.tripCancellations.find(t => t.id === itemId.value)
})

const selectedItems = ref([])
const selectedIds = computed<string[]>(() => selectedItems.value.map((i: any) => i.id) ?? [])

const openModalForm = ref(false)
const openModalDelete = ref(false)
const deleteLoading = ref(false)
const toast = useToastExt()
const deleteItemContinue = async () => {
  await clientStore.deletePort(selectedIds.value)
  openModalDelete.value = false
  toast.success({ title: 'Delete Trip Cancellation', description: `Deleted (${selectedItems.value.length}) ports successfully!` })
  selectedItems.value = []
}
const deleteItemPrompt = () => (openModalDelete.value = true)

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
      :mark-as-options
    >
      <template #header-right>
        <UButton
          label="New cancellation"
          trailing-icon="i-heroicons-plus"
          color="gray"
          @click="addItem"
        />
      </template>
      <template #active-column="{ row }">
        <UBadge
          :color="activeColor(row.active)"
          :label="row.active"
          variant="subtle"
          class="uppercase"
        />
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
    <ModalFormTripCancellation
      v-model="openModalForm"
      :item="selectedItem"
      :on-close="() => itemId = undefined"
    />
    <ModalPromptDelete
      v-model="openModalDelete"
      :title="`Delete Trip Cancellation`"
      :description="`Are you sure you want to delete (${selectedIds.length}) trip cancellations?`"
      :on-close="() => itemId = undefined"
      :loading="deleteLoading"
      :accept="deleteItemContinue"
    />
  </UDashboardPanelContent>
</template>
