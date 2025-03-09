<script setup lang="ts">
import type { InputColor, InputSize, InputVariant } from '#ui/types'

interface Props {
  color?: InputColor
  size?: InputSize
  variant?: InputVariant
}
const log = useLogger(false)

const { color, size, variant } = defineProps<Props>()

const modelValue = defineModel<string>({ default: '' })
const googleMap = useGoogleMaps()
const inputRef = ref<HTMLInputElement>()

const autocomplete = ref(googleMap.autocomplete)

// const emit = defineEmits<{
//   change: [id: number] // named tuple syntax
//   update: [value: string]
// }>()

const formatted_address = ref('')
function onPlaceChanged() {
  log('ON_PLACE: ', autocomplete.value)
  const selectedPlace = autocomplete.value?.getPlace()
  formatted_address.value = selectedPlace?.formatted_address ?? ''
  modelValue.value = selectedPlace?.formatted_address ?? ''
}

const firstValue = ref('')
onMounted(() => {
  firstValue.value = modelValue.value ?? ''
  const inputElement = (inputRef.value as any)!.$el.querySelector('input')
  log('onMounted INPUT-ADDRESS:', autocomplete.value)
  // inputElement.onchange = () => {
  // original
  // if (firstValue.value !== modelValue.value && modelValue.value !== formatted_address.value) {
  //   modelValue.value = ''
  // }
  // }
  googleMap.setupAutocomplete(inputElement, onPlaceChanged)
})
</script>

<template>
  <UInput
    ref="inputRef"
    v-model="modelValue"
    :color
    :size
    :variant
    @keydown.enter.prevent
  />
</template>
