<script setup lang="ts">
import type { InputProps } from '#ui/types'

interface Props {
  color?: InputProps['color']
  size?: InputProps['size']
  variant?: InputProps['variant']
}
const log = useLogger(false)

const { color, size, variant } = defineProps<Props>()

const modelValue = defineModel<string>({ default: '' })
const googleMap = useGoogleMaps()
const inputRef = useTemplateRef('inputRef')

const autocomplete = ref(googleMap.autocomplete)

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
  const inputElement = (inputRef.value)!.$el.querySelector('input')
  log('onMounted INPUT-ADDRESS:', autocomplete.value)
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
