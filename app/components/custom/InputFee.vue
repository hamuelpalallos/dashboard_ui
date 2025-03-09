<script lang="ts" setup>
const { name = 'fee', label = 'Fee', loading, disabled } = defineProps<{
  name?: string
  label?: string
  loading?: boolean
  disabled?: boolean
}>()

const options: { label: string, value: FeeType }[] = [
  {
    label: 'Fixed', value: 'fixed'
  },
  {
    label: 'Percent', value: 'percent'
  },
  {
    label: 'Percent w/ min', value: 'percent-min'
  },
  {
    label: 'Percent w/ max', value: 'percent-max'
  },
  {
    label: 'Percent w/ min & max', value: 'percent-min-max'
  }
]

const state = defineModel<Fee>({
  default: {
    type: 'fixed',
    percent: 0,
    fixed: 0,
    min: 0,
    max: 0
  }
})

watch(state, (_) => {
  updateState()
})

const updateState = () => {
  switch (state.value.type) {
    case 'percent-min-max':
      state.value.fixed = 0
      break
    case 'percent-min':
      state.value.max = 0
      state.value.fixed = 0
      break
    case 'percent-max':
      state.value.min = 0
      state.value.fixed = 0
      break
    case 'fixed':
      state.value.percent = 0
      state.value.min = 0
      state.value.max = 0
  }
}

onMounted(() => {
  updateState()
})

const disabledMin = computed(() => {
  return disabled || state.value.type === 'fixed' || state.value.type === 'percent' || state.value.type === 'percent-max'
})

const disabledMax = computed(() => {
  return disabled || state.value.type === 'fixed' || state.value.type === 'percent' || state.value.type === 'percent-min'
})
</script>

<template>
  <UFormGroup :name>
    <UButtonGroup class="w-full">
      <div :class="state.type==='percent-min-max'?'w-1/3':'w-1/2'">
        <UFormGroup :label="`${label} Type`">
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
        class="flex"
        :class="state.type==='percent-min-max'?'w-2/3':'w-1/2'"
      >
        <UFormGroup
          v-show="state.type!=='fixed'"
          key="percent"
          label="Percent"
          class="w-full"
        >
          <UInput
            v-model="state.percent"
            type="number"
            trailing-icon="lucide:percent"
            :min="0"
            :max="100"
            class="w-full"
            :loading
            :disabled="disabledMin"
          />
        </UFormGroup>
        <UFormGroup
          v-show="!disabledMin"
          key="percentMin"
          label="Min"
          class="w-full"
        >
          <UInput
            v-model="state.min"
            type="number"
            icon="lucide:philippine-peso"
            class="w-full"
            :min="0"
            :loading
            :disabled="disabledMin"
          />
        </UFormGroup>
        <UFormGroup
          v-if="!disabledMax"
          key="percentMax"
          label="Max"
          class="w-full"
        >
          <UInput
            v-model="state.max"
            :min="0"
            icon="lucide:philippine-peso"
            type="number"
            class="w-full"
            :loading
            :disabled="disabledMax"
          />
        </UFormGroup>
        <UFormGroup
          v-if="state.type === 'fixed'"
          key="fixed"
          label="Fixed"
          class="w-full"
        >
          <UInput
            v-model="state.fixed"
            icon="lucide:philippine-peso"
            type="number"
            class="w-full"
            :loading
            :disabled="state.type !== 'fixed'"
          />
        </UFormGroup>
      </div>
    </UButtonGroup>
  </UFormGroup>
</template>
