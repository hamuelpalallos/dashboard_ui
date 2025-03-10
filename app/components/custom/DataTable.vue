<script lang="ts" setup generic="T extends {id: string}">
interface Props {
  title?: string
  description?: string
  items?: T[]
  columns?: TableColumn[]
  loading?: boolean
  defaultSort?: { column: string, direction: 'asc' | 'desc' }
  indexed?: boolean
  withActions?: boolean
  markAsOptions?: any[][]

  by?: string
}

const {
  title,
  items = [],
  columns = [],
  loading = false,
  indexed = true,
  withActions = false,
  defaultSort = { column: 'createdAt', direction: 'desc' as const },
  markAsOptions = [],
  by
} = defineProps<Props>()




const selectedRows = defineModel<[]>({
  default: []
})



type DropdownFilter = {
  key: string
  label?: string
  options: OptionItem[]
}

const querySearch = ref('')
const getDropdownOptions = (items: any[], column: any) => {
  const options = Array.from(new Set(items.map(item => item[column.key])))
  const uniqueOptions = options.filter((i: any) => (column?.options?.some((o: any) => o.value !== i) ?? true))

  const generatedOptions = uniqueOptions.map((option) => {
    return {
      value: option,
      label: capitalize(option ?? ''),
      selected: false
    }
  })
  return [...column?.options ?? [], ...generatedOptions]
}
const dropDownOptions = computed<DropdownFilter[]>(() => {
  return columns.filter(c => c.dropdown).map((column: any) => {
    return {
      key: column.key,
      label: column.label,
      options: column.generate ? getDropdownOptions(items, column) : column.options
    }
  })
})

const selectedDropdownFilter = ref<any>({
  //

})

const setDefaultDropdownFilter = () => {
  dropDownOptions.value.forEach((dropdown) => {
    selectedDropdownFilter.value[dropdown.key] = dropdown.options?.filter(option => option.selected ?? [])
  })
}

const resetFilters = () => {
  querySearch.value = ''
  // selectedStatus.value = []
  selectedColumns.value = defaultColumns.value.filter(column => column.display !== false)
  setDefaultDropdownFilter()
}

// ===========================================================================================================
// Pagination
const sort = ref(defaultSort)
const page = ref(1)

const pageCount = ref(10)
const pageTotal = computed(() => filteredItems.value.length) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

onBeforeMount(() => {
  setDefaultDropdownFilter()
})

const sortDate = (a: string, b: string, order: 'asc' | 'desc' = 'asc') => {
  const dateA = new Date(a).getTime()
  const dateB = new Date(b).getTime()

  const isValidDateA = !isNaN(dateA)
  const isValidDateB = !isNaN(dateB)

  if (!isValidDateA && !isValidDateB) {
    return 0
  }

  if (!isValidDateA) {
    return order === 'asc' ? -1 : 1
  }

  if (!isValidDateB) {
    return order === 'asc' ? 1 : -1
  }

  return order === 'asc' ? dateA - dateB : dateB - dateA
}
const sortNumber = (a: string, b: string, order: 'asc' | 'desc' = 'asc') => {
  const parseValue = (value: string) => parseFloat(value.replace(/[^0-9.-]+/g, ''))
  if (isNaN(parseValue(a))) {
    a = '0'
  }
  if (isNaN(parseValue(b))) {
    b = '0'
  }
  const result = parseValue(a) - parseValue(b)

  return order === 'asc' ? result : -result
}

const defaultColumns = computed(() => {
  const cols = columns.filter(column => column.hidden !== true).map((column) => {
    if (column.sortable && column.type === 'date') {
      return {
        ...column,
        sort: sortDate
      }
    }
    if (column.sortable && column.type === 'number') {
      return {
        ...column,
        sort: sortNumber
      }
    }
    return column
  })
  if (indexed) {
    cols.unshift({
      key: 'indexed',
      label: '#'
    })
  }
  if (withActions === true) {
    cols.push({
      key: 'actions',
      label: 'Actions'
    })
  }
  return cols
})
const selectedColumns = ref<TableColumn[]>(defaultColumns.value.filter(column => column.display !== false))

const filterColumns = computed(() => {
  return defaultColumns.value.filter(column => selectedColumns.value.includes(column as any))
})

const filteredItems = computed(() => {
  const q = querySearch.value
  return items.filter((item) => {
    if (!q) return true

    return columns.some((column) => {
      if (column.searchable) {
        return ((item[column.key as keyof T] as string) ?? '')?.search(new RegExp(q, 'i')) !== -1
      }
    })
  }).filter((item) => {
    return dropDownOptions.value.every((dropdown: DropdownFilter) => {
      const itemKey = dropdown.key as keyof T
      const selectedFilter: any[] = selectedDropdownFilter.value?.[dropdown.key] ?? []

      if (!selectedFilter?.length) return true

      const itemValue = item[itemKey]

      if (selectedFilter.find((item: any) => item?.filter?.(itemValue))) return true

      const valuesOnly: any[] = selectedDropdownFilter.value?.[dropdown.key]?.map((i: any) => i.value) ?? []

      return valuesOnly?.includes(itemValue) ?? true
    })
  }).sort((aP, bP) => {
    if (!sort.value) return 0
    const key = sort.value.column
    const d = sort.value.direction
    const a = aP[key as keyof T] as string
    const b = bP[key as keyof T] as string
    const selectedColumn = columns.find(c => c.key === key)
    if (!selectedColumn?.sort && selectedColumn?.type === 'number') return sortNumber(a, b, d)
    if (!selectedColumn?.sort && selectedColumn?.type === 'date') return sortDate(a, b, d)
    return selectedColumn?.sort?.(a, b, d) ?? defaultSortFunction(a, b, d)
  })
})

const defaultSortFunction = (a: any, b: any, d: 'asc' | 'desc') => {
  if (a < b) return d === 'asc' ? -1 : 1
  if (a > b) return d === 'asc' ? 1 : -1
  return 0
}
debouncedWatch([filteredItems, pageCount], ([_len, _pCount]) => {
  page.value = 1
}, { debounce: 100 })
const rows = computed(() => {
  const items = filteredItems.value.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
  if (!indexed) return items
  return items.map((item, index) => {
    return {
      ...item,
      indexed: ((page.value - 1) * pageCount.value) + (index + 1)
    }
  })
})

// ===========================================================================================================
function capitalize(str: string): string {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <div class="flex justify-between gap-3 items-center">
        <div class="flex gap-1.5 items-center h-8">
          <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
            <span class="truncate">
              {{ title }}
            </span>
          </h2>
          <UBadge :label="filteredItems.length?.toString()" variant="subtle" />
        </div>

        <div class="flex gap-3 items-center">
          <slot name="header-right" />
        </div>
      </div>
    </template>

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput v-model="querySearch" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

      <div class="flex items-center justify-between gap-3">
        <USelectMenu v-for="dropdownItem in dropDownOptions" :key="dropdownItem.key"
          v-model="selectedDropdownFilter[dropdownItem.key]" :options="dropdownItem.options" multiple
          :placeholder="dropdownItem?.label ?? 'Filter'" class="w-40">
          <template #item="{ selected }">
            {{ dropdownItem?.label ?? 'Filter' }} {{ selected.length ? `(${selected.length})` : '' }}
          </template>
        </USelectMenu>
      </div>
    </div>

    <!-- Header and Action buttons -->
    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">Rows per page:</span>

        <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
      </div>

      <div class="flex gap-1.5 items-center">
        <UDropdown v-if="selectedRows.length && markAsOptions.length" :items="markAsOptions" :ui="{ width: 'w-36' }">
          <UButton icon="i-heroicons-chevron-down" trailing color="neutral" size="xs">
            Mark as
          </UButton>
        </UDropdown>

        <USelectMenu v-model="selectedColumns" icon="i-heroicons-adjustments-horizontal-solid" :options="defaultColumns"
          multiple class="hidden lg:block" size="xs">
          <UButton label="Display" color="neutral" variant="outline" trailing-icon="i-lucide-settings-2" />
        </USelectMenu>
        <UButton icon="i-heroicons-funnel" color="neutral" size="xs" @click="resetFilters">
          Reset
        </UButton>
      </div>
    </div>

    <!-- Table -->
    <UTable v-model="selectedRows" v-model:sort="sort" sticky :by :columns="(filterColumns as any[])" :rows :loading
      class="w-full" sort-mode="manual">
      <template v-for="(col, idx) in filterColumns" :key="col.key + idx" #[`${col.key}-data`]="{ row }">
        <slot :name="`${col.key}-column`" :row>
          <!--  -->
          <template v-if="col.key === 'indexed' && indexed">
            <span>{{ row.index }}</span>
          </template>
          <template v-else-if="col.key === 'actions' && withActions">
            <DropdownActions :row="row" />
          </template>
        </slot>
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
        <!-- <div>
          <pre>
            {{ debugPagination }}
            {{ selectedDropdownFilter }}
          </pre>
        </div> -->
        <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ pageFrom }}</span>
            to
            <span class="font-medium">{{ pageTo }}</span>
            of
            <span class="font-medium">{{ pageTotal }}</span>
            results
          </span>
        </div>

        <UPagination v-model="page" :page-count="pageCount" :total="pageTotal" size="md" :max="8" />
      </div>
    </template>
  </UCard>
</template>
