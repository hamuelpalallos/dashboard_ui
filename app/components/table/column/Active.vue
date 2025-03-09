<script setup lang="ts">
import type { BadgeSize, BadgeVariant } from '#ui/types'

interface Props {
  value?: string | any
  size?: BadgeSize
  variant?: BadgeVariant
  copy?: (id?: string) => void
  view?: (id?: string) => void
}

const { value, size = 'xs', variant = 'subtle' } = defineProps<Props>()
const { activeColor } = useData()
const color = computed(() => activeColor(value))
const label = computed(() => value)
</script>

<template>
  <UBadge
    class="uppercase"
    :variant
    :size
    :color
    :label
  />
</template>
