<script setup lang="ts">
interface Props {
  port?: Port
  onClose?: () => void
}

const {
  port,
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
    <FormPort
      :port
      :callback
    />
  </UModal>
</template>
