<script lang="ts" setup>
const { name = 'range', label = 'Range', loading, disabled } = defineProps<{
  name?: string
  label?: string
  loading?: boolean
  disabled?: boolean
}>()

const options: { label: string, value: NumberRangeType }[] = [
  {
    label: 'Any', value: 'any'
  },
  {
    label: 'Range', value: 'min-max'
  },
  {
    label: 'By minimum', value: 'min'
  },
  {
    label: 'By maximum', value: 'max'
  }
]

const state = defineModel<NumberRange>({
  default: {
    type: 'any',
    min: 0,
    max: 0 }
})

watch(state, (_) => {
  updateState()
})
const updateState = () => {
  switch (state.value.type) {
    case 'min':
      state.value.max = 0
      break
    case 'max':
      state.value.min = 0
      break
    case 'any':
      state.value.min = 0
      state.value.max = 0
  }
}

onMounted(() => {
  updateState()
})

const disabledMin = computed(() => {
  return disabled || state.value.type === 'any' || state.value.type === 'max'
})

const disabledMax = computed(() => {
  return disabled || state.value.type === 'any' || state.value.type === 'min'
})
</script>

<template>
  <UFormGroup
    :name
    class="w-full"
  >
    <UButtonGroup class="w-full">
      <div class="w-1/2">
        <UFormGroup
          :label="`${label} Type`"
          class="w-full"
        >
          <USelectMenu
            v-model="state.type"
            option-attribute="label"
            value-attribute="value"
            :options
            class="w-full"
            :loading
            :disabled
          />
        </UFormGroup>
      </div>
      <div
        class="w-1/2 flex"
      >
        <UFormGroup
          v-show="state.type.includes('min')"
          label="Min"
          class="w-full"
        >
          <UInput
            v-model="state.min"
            type="number"
            icon="ph:greater-than-or-equal-fill"
            class="w-full"
            :min="0"
            :loading
            :disabled="disabledMin"
          />
        </UFormGroup>
        <UFormGroup
          v-if="state.type.includes('max')"
          label="Max"
          class="w-full"
        >
          <UInput
            v-model="state.max"
            type="number"
            icon="ph:less-than-or-equal-fill"
            class="w-full"
            :min="0"
            :loading
            :disabled="disabledMax"
          />
        </UFormGroup>
        <UFormGroup
          v-if="state.type==='any'"
          label="Range"
          class="w-full"
        >
          <UInput
            placeholder="Unspecified"
            class="w-full"
            :loading
            disabled
          />
        </UFormGroup>
      </div>
    </UButtonGroup>
  </UFormGroup>
</template>
