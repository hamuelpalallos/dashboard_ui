<script setup lang="ts">
// import { eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { Period, Range } from '~/types'

const cardRef = ref<HTMLElement | null>(null)

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array as PropType<DataRecord[]>,
    default: () => []
  },
  period: {
    type: String as PropType<Period>,
    required: true
  },
  range: {
    type: Object as PropType<Range>,
    required: true
  }
})

type DataRecord = {
  date: Date
  amount: number
}

const { width } = useElementSize(cardRef)

const format = useFormat()

const x = (_: DataRecord, i: number) => i
const y = (d: DataRecord) => d.amount

const total = computed(() => props.data.reduce((acc: number, { amount }: { amount: number }) => acc + amount, 0))

// const formatNumber = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format

// const formatDate = (date: Date): string => {
//   return ({
//     daily: format(date, 'd MMM'),
//     weekly: format(date, 'd MMM'),
//     monthly: format(date, 'MMM yyy')
//   })[props.period]
// }

const xTicks = (i: number) => {
  if (i === 0 || i === props.data.length - 1 || !props.data[i]) {
    return ''
  }

  return format.date(props.data[i].date)
}

const template = (d: DataRecord) => `${format.date(d.date)}: ${format.currency(d.amount)}`
const started = ref(false)
const loading = computed(() => import.meta.server || props.loading || !started.value)
onMounted(() => {
  started.value = true
})
</script>

<template>
  <UDashboardCard
    v-if="!loading"
    ref="cardRef"
    :ui="{ body: { padding: '!pb-3 !px-0' } as any }"
  >
    <template #header>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
          Revenue
        </p>
        <p class="text-3xl text-gray-900 dark:text-white font-semibold">
          {{ format.currency(total) }}
        </p>
      </div>
    </template>

    <VisXYContainer
      :data="data"
      :padding="{ top: 10 }"
      class="h-96"
      :width="width"
    >
      <VisLine
        :x="x"
        :y="y"
        color="rgb(var(--color-primary-DEFAULT))"
      />
      <VisArea
        :x="x"
        :y="y"
        color="rgb(var(--color-primary-DEFAULT))"
        :opacity="0.1"
      />

      <VisAxis
        type="x"
        :x="x"
        :tick-format="xTicks"
      />

      <VisCrosshair
        color="rgb(var(--color-primary-DEFAULT))"
        :template="template"
      />

      <VisTooltip />
    </VisXYContainer>
  </UDashboardCard>
  <USkeleton
    v-else
    class="h-96"
  />
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
  --vis-crosshair-circle-stroke-color: #fff;

  --vis-axis-grid-color: rgb(var(--color-gray-200));
  --vis-axis-tick-color: rgb(var(--color-gray-200));
  --vis-axis-tick-label-color: rgb(var(--color-gray-400));

  --vis-tooltip-background-color: #fff;
  --vis-tooltip-border-color: rgb(var(--color-gray-200));
  --vis-tooltip-text-color: rgb(var(--color-gray-900));
}

.dark {
  .unovis-xy-container {
    --vis-crosshair-line-stroke-color: rgb(var(--color-primary-400));
    --vis-crosshair-circle-stroke-color: rgb(var(--color-gray-900));

    --vis-axis-grid-color: rgb(var(--color-gray-800));
    --vis-axis-tick-color: rgb(var(--color-gray-800));
    --vis-axis-tick-label-color: rgb(var(--color-gray-500));

    --vis-tooltip-background-color: rgb(var(--color-gray-900));
    --vis-tooltip-border-color: rgb(var(--color-gray-800));
    --vis-tooltip-text-color: #fff;
  }
}
</style>
