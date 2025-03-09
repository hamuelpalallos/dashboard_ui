<script setup lang="ts" generic="T">
interface Props {
  item?: T
  onClose?: () => void
}

const {
  item,
  onClose
} = defineProps<Props>()

const open = defineModel<boolean>({ default: false })
const callback = () => {
  open.value = false
}
</script>

<template>
  <UModal
    v-model="open"
    @close="onClose"
  >
    <slot
      :item
      :callback
    />
  </UModal>
</template>
