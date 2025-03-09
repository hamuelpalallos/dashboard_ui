<script setup lang="ts">
interface Props {
  item?: TripCancellation
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
    <FormTripCancellation
      :item
      :callback
    />
  </UModal>
</template>
