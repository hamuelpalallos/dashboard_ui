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
const title = 'Conveyances'
const clientStore = useClientStore()

const items = computed(() => clientStore.conveyanceRows)
const loading = computed(() => clientStore.conveyancesPending)
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
  key: 'description',
  label: 'Description',
  searchable: true
}, {
  key: 'type',
  label: 'Type',
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

const toast = useToast()
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({ title: 'Copied to clipboard', description: text })
  }).catch((_) => {
    toast.add({ title: 'Failed to copy' })
  })
}

const viewItem = (id: string) => {
  // console.log('VIEW ITEM: ', id)
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
        <UBadge
          :color="activeColor(row.active)"
          :label="row.active"
          variant="subtle"
          class="uppercase"
        />
      </template>
      <template #actions-column="{ row }">
        <UButtonGroup size="xs">
          <UButton
            icon="i-heroicons-document-duplicate"
            color="neutral"
            variant="solid"
            @click.stop="copyToClipboard(row.id)"
          />
          <UButton
            icon="i-heroicons-arrow-right"
            color="neutral"
            variant="solid"
            class="px-3"
            @click.stop="viewItem(row.id)"
          />
        </UButtonGroup>
      </template>
    </DataTable>
  </UDashboardPanelContent>
</template>
