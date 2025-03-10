<script setup lang="ts">
import { sub, isSameDay, startOfDay, endOfDay, type Duration } from 'date-fns'
// import type { Range } from '~/types'
// import the proper ButtonColor from the nuxt ui library
import type { ButtonProps } from '#ui/types'

const datePickerId = useId()

// type DateSettingMode = 'date' | 'datetime' | 'time'
interface DatePickerProps {
  mode?: 'date' | 'time' | 'datetime'
  maxDate?: Date
  minDate?: Date
  hideTimeHeader?: boolean
  trimWeeks?: boolean
  // masks?: Masks
}

interface Props {
  type?: DateSettingType
  mode?: DateSettingMode
  variant?: 'outline' | 'solid' | 'ghost'
  size?: ButtonProps['size']
  color?: ButtonProps['color']
  datePicker?: DatePickerProps
}

const { mode = 'datetime', type = 'single', variant = 'solid', size = 'sm', color = 'neutral', datePicker = {} } = defineProps<Props>()

const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
  { label: 'Last 30 days', duration: { days: 30 } },
  { label: 'Last 3 months', duration: { months: 3 } },
  { label: 'Last 6 months', duration: { months: 6 } },
  { label: 'Last year', duration: { years: 1 } }
]

const [selected, modifiers] = defineModel<DateSetting, DateSettingMode>({
  // type: Object as PropType<Range>,
  required: true,
  set: (value) => {
    if ((mode === 'date' || modifiers.date) && type === 'range') {
      return { start: startOfDay(value.range?.start ?? new Date()), end: endOfDay(value.range?.end ?? new Date()) } as DateRange
    }
    return value
  }

})
// add modifiers to the selected date

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.range?.start ?? new Date(), sub(new Date(), duration)) && isSameDay(selected.value.range?.end ?? new Date(), new Date())
}

function selectRange(duration: Duration) {
  selected.value.range = { start: sub(new Date(), duration), end: new Date() }
}

const { date_setting: format } = useFormat()
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <template #default="{ open }">
      <UButton
        class="w-full bg-red-500"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        :size
        :variant
        :color
        :label="format(selected, `Select ${mode}`)"
      />
    </template>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div
          v-if="type==='range'"
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

        <DatePicker
          v-bind="{ ...datePicker, mode: mode }"
          :id="datePickerId"
          :key="datePickerId"
          v-model="selected"
          @close="close"
        />
      </div>
    </template>
  </UPopover>
</template>
