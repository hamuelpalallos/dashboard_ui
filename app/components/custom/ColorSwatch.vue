<script setup lang="ts">
import type { ChipColor } from '#ui/types'

const { capitalize } = useFormat()

const appConfig = useAppConfig()
const theme = useTheme()
const colorItems = computed(() => {
  return COLORS.filter(c => c != 'primary')?.map((c) => {
    return {
      color: c,
      label: capitalize(c),
      active: appConfig.ui.primary === c,
      click: () => theme.setPrimary(c)
    }
  }) ?? []
})

const bgColors = computed(() => {
  return COLORS_MUTED.map((c) => {
    return {
      color: c,
      label: capitalize(c),
      active: appConfig.ui.gray === c,
      click: () => theme.setMuted(c)
    }
  })
})
</script>

<template>
  <UPopover mode="hover">
    <UButton
      color="gray"
      variant="ghost"
      square
    >
      <UIcon
        name="i-heroicons-swatch-20-solid"
        class="w-5 h-5 text-primary"
      />
    </UButton>
    <template #panel>
      <div>
        <div class="grid grid-cols-5 gap-1 items-center justify-center p-1.5">
          <!-- <div> -->
          <UTooltip
            v-for="c in colorItems"
            :key="c.color"
            :text="c.label"
            :open-delay="500"
          >
            <UButton
              color="gray"
              variant="ghost"
              :title="c.label"
              :class="c.active ? 'bg-gray-100 hover:bg-gray-100 dark:bg-gray-800' : ' dark:hover:bg-gray-800/50'"
              class="p-3"
              square
              @click="c.click"
            >
              <UChip
                size="lg"
                :color="(c.color as ChipColor)"
              />
            </UButton>
          </UTooltip>
        </div>
        <UDivider />
        <div class="grid grid-cols-5 gap-1 items-center justify-center p-1.5">
          <UTooltip
            v-for="c in bgColors"
            :key="c.color"
            :text="c.label"
            :open-delay="500"
          >
            <UButton
              color="gray"
              variant="ghost"
              :title="c.label"
              :class="c.active ? 'bg-gray-100 hover:bg-gray-100 dark:bg-gray-800' : ' dark:hover:bg-gray-800/50'"
              class="p-3"
              square
              @click="c.click"
            >
              <UChip
                size="lg"
                :ui="{ background: `bg-${c.color}-500 dark:bg-${c.color}-400` }"
              />
            </UButton>
          </UTooltip>
        </div>
      </div>
    </template>
  </UPopover>
</template>
