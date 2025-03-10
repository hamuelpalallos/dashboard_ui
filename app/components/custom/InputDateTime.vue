<script setup lang="ts">
import { sub, isSameDay, type Duration } from 'date-fns'

interface Props {
  mode?: DateSettingMode
  type?: 'range' | 'single'
  block?: boolean
  rangeOptions?: boolean
  columns?: number
}

const { mode = 'date', type = 'single', block = true, rangeOptions = true, columns } = defineProps<Props>()

const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
  { label: 'Last 30 days', duration: { days: 30 } },
  { label: 'Last 3 months', duration: { months: 3 } },
  { label: 'Last 6 months', duration: { months: 6 } },
  { label: 'Last year', duration: { years: 1 } }
]

const cType = computed(() => type)
const cMode = computed(() => mode)

const state = reactive<DateSetting>({
  single: new Date(),
  range: { start: new Date(), end: new Date() },
  multiple: [],
  multipleRange: [],
  type: 'single',
  mode: 'date'
})

const modelValue = defineModel<DateSetting>({ default: {} })

const tod = defineModel<Partial<TimeOfDayInstanceType>>('tod')

watch(state, (_) => {
  tod.value = TimeOfDayInstance.fromDate(state.single ?? new Date())
  modelValue.value = state
}, { deep: true })

watch([cType, cMode], ([t, m]) => {
  applyTypeMode(t, m)
}, { deep: true })

const applyTypeMode = (t: DateSettingType, m: DateSettingMode) => {
  state.type = t
  state.mode = m
}
onBeforeMount(() => {
  if (tod.value) state.single = tod.value!.toDate!()
  applyTypeMode(type, mode)
})

function isRangeSelected(duration: Duration) {
  if (!(state.range?.start && state.range?.end)) return false
  return isSameDay(state.range.start, sub(new Date(), duration)) && isSameDay(state.range.end, new Date())
}

function selectRange(duration: Duration) {
  state.range = { start: sub(new Date(), duration), end: new Date() }
}

const format = useFormat()

const formatted = computed(() => {
  return format.date_setting(state, 'Select')
})
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <template #default="{ open }">
      <UInput
        :block
        class="w-full"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        placeholder="Select"
        :model-value="formatted"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </template>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div
          v-if="type === 'range' && rangeOptions"
          class="hidden sm:flex flex-col py-4"
        >
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="neutral"
            variant="ghost"
            class="rounded-none px-6"
            :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
            truncate
            @click="selectRange(range.duration)"
          />
        </div>

        <DatePickerAdvance
          v-model="state"
          :columns
          :type
          :mode
          @close="close"
        />
      </div>
    </template>
  </UPopover>
</template>
