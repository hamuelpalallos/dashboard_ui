import { defineStore } from 'pinia'

// interface DateRange {
//   start: Date | null
//   end: Date | null
// }

export const usePageStore = defineStore(
  'page',
  () => {
    const dates = ref<DateRange>({
      start: new Date(),
      end: new Date(),
    })

    // const sales_filter = ref<{
    //   date_range: DateRange
    // }>({ date_range: dates.value })

    const sales_filter = ref({
      date_range: dates.value,
    })

    const sales_route_selected = ref('')

    const sales_date_range = ref({
      start: new Date(),
      end: new Date(),
    })
    return {
      sales_date_range,
      sales_route_selected,
      sales_filter,
    }
  },
)
