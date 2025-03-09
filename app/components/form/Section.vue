<script lang="ts" setup>
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <UCard
    :ui="{ header: { padding: '!p-3' }, body: { padding: '!p-3' } }"
  >
    <template #header>
      <div class="col-span-12">
        <p class="font-bold text-sm">
          {{ title }}
        </p>
        <p class="text-gray-600 dark:text-gray-400 text-xs">
          {{ description }}
        </p>
      </div>
    </template>
    <div class="space-y-4">
      <slot />
    </div>
  </UCard>
</template>
