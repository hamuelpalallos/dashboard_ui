<script setup lang="ts" generic="T extends {id: string}">
interface Props {
  row?: T
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  copy?: (id?: string) => void
  view?: (id?: string) => void
}

const { row, size = 'xs' } = defineProps<Props>()
</script>

<template>
  <UButtonGroup
    :key="row?.id"
    :size
  >
    <UButton
      icon="i-heroicons-document-duplicate"
      color="neutral"
      variant="solid"
      @click.stop="copy?.(row?.id)"
    />
    <UButton
      icon="i-heroicons-arrow-right"
      color="neutral"
      variant="solid"
      class="px-4"
      @click.stop="view?.(row?.id)"
    />
  </UButtonGroup>
</template>
