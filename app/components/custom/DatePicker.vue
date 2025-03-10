<script setup lang="ts">
import { sub, format, isSameDay, startOfDay, endOfDay, type Duration } from 'date-fns'
import type { Range } from '~/types'
// import the proper ButtonColor from the nuxt ui library
import type { ButtonProps } from '#ui/types'

const datePickerId = useId()

interface Props {
  type?: 'date' | 'datetime'
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  color?: ButtonProps['color']
}

const { type = 'datetime', variant = 'outline', size = 'sm', color = 'primary' } = defineProps<Props>()

const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
  { label: 'Last 30 days', duration: { days: 30 } },
  { label: 'Last 3 months', duration: { months: 3 } },
  { label: 'Last 6 months', duration: { months: 6 } },
  { label: 'Last year', duration: { years: 1 } }
]

const [selected, modifiers] = defineModel({
  type: Object as PropType<Range>,
  required: true,
  set: (value) => {
    if (type === 'date' || modifiers.date) {
      return { start: startOfDay(value.start), end: endOfDay(value.end) }
    }
    return value
  }

})
// add modifiers to the selected date

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <template #default="{ open }">
      <UButton
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
        :size
        :variant
        :color
        trailing-icon="i-heroicons-chevron-down-20-solid"
      >
        {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
      </UButton>
    </template>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div class="hidden sm:flex flex-col py-4">
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
          :id="datePickerId"
          :key="datePickerId"
          v-model="selected"
          @close="close"
          @dayclick="
            (_:any, event:any) => {
              event.target.blur();
            }
          "
        />
      </div>
    </template>
  </UPopover>
</template>
