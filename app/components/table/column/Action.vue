<script setup lang="ts" generic="T extends {id: string}">
interface Props {
  row?: T
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  copy?: (id?: string) => void
  view?: (id?: string) => void
}

const { row, copy, view, size = 'xs' } = defineProps<Props>()

const toast = useToast()

const copyItemId = (text?: string) => {
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    toast.add({ title: 'Copied to clipboard', description: text })
  }).catch((_) => {
    toast.add({ title: 'Failed to copy' })
  })
}

const viewItem = (id?: string) => {
  if (!id) return
  // console.log('VIEW TICKET: ', id)
}
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
      @click.stop="copy?.(row?.id) ?? copyItemId(row?.id)"
    />
    <UButton
      icon="i-heroicons-arrow-right"
      color="neutral"
      variant="solid"
      class="px-4"
      @click.stop="view?.(row?.id) ?? viewItem(row?.id)"
    />
  </UButtonGroup>
</template>
