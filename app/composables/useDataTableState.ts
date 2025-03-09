export const useDataTableState = <T extends DatabaseRecord>(params: {
  collectionSource: T[]
  rows: any[]
  meta: PageData
  columns: TableColumn[]
  deleteRecord?: (data: T[]) => Promise<void>
}) => {
  const toast = useToastExt()

  const loading = ref(false)
  const disabled = computed(() => loading.value)

  const openModalForm = ref(false)
  const selectedItemId = ref<string>()

  const openModalDelete = ref(false)

  const deleteLoading = ref(false)

  const selectedItems = ref<T[]>([])

  const selectedRows = ref<T[]>([])
  const selectedIds = ref<string[]>([])
  const selectedItem = ref()

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

  const deleteItemContinue = async () => {
    deleteLoading.value = true
    try {
      await params.deleteRecord?.(selectedItems.value as any[])
      toast.success({ title: `Delete ${meta.Category}`, description: `Deleted (${selectedRows.value.length}) ${meta.categories} successfully!` })
      openModalDelete.value = false
      selectedRows.value = []
    } catch (error) {
      toast.error({ title: `Delete ${meta.Category}`, description: `Failed to delete ${selectedRows.value.length} ${meta.categories}: ${error}` })
    }
    deleteLoading.value = false
  }

  const deleteItemPrompt = () => {
    openModalDelete.value = true
  }

  const addItem = () => {
    selectedItemId.value = ''
    openModalForm.value = true
  }

  const meta = usePageData({
    ...params.meta
  })
  const rows = computed(() => params.rows)
  const columns = computed(() => params.columns)

  return {
    deleteLoading,
    selectedItem,
    selectedItemId,
    openModalForm,
    rows,
    columns,
    copyToClipboard,
    defaultSort,
    deleteItemContinue,
    openModalDelete,
    deleteItemPrompt,
    addItem,
    loading,
    disabled,
    selectedIds,
    meta
  }
}

export type DataTableState = ReturnType<typeof useDataTableState>
