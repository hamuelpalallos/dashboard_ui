<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { port, callback } = defineProps<{ port?: Port, callback?: () => void }>()

const log = useLogger(false)

const { PortSchema: schema } = useZodSchema()

const clientStore = useClientStore()

const state = reactive({
  id: '',
  name: '',
  description: '',
  active: true,
  address: {
    modular: false,
    text: ''
  },
  fees: [],
  ...port
})

const isNew = computed(() => !state.id)
const loading = ref(false)
const disabled = computed(() => loading.value)
const validate = (state: any): FormError[] => {
  const errors = []
  const foundPort = clientStore.findPort(state.name)
  if (foundPort && foundPort?.id !== state.id) {
    errors.push({ path: 'name', message: 'Port name already exists' })
  }
  return errors
}
const toast = useToastExt()
const onSubmit = async (event: FormSubmitEvent<PortSchemaType>) => {
  loading.value = true
  try {
    log('Form values:', event.data)

    await clientStore.submitPort(event.data)
    log('submitted supposedly 2')

    callback?.()

    toast.success({
      description: `Port has been ${isNew.value ? 'created' : 'updated'}!`
    })
  } catch (e) {
    toast.error({
      description: `${e}`
    })
  }

  loading.value = false
}
</script>

<template>
  <UCard class="">
    <template #header>
      <div class="flex flex-col">
        <span class="text-lg font-bold">{{ isNew?'Create': 'Update' }} port details</span>
        <span class="text-sm">Please fill out the port form</span>
      </div>
    </template>

    <UForm
      :schema
      :validate
      :state
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Active"
        name="active"
      >
        <UToggle
          v-model="state.active"
          :disabled
          :loading
        />
      </UFormGroup>
      <UFormGroup
        label="Port name"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          :loading
          :disabled
          icon="i-heroicons-flag"
        />
      </UFormGroup>

      <UFormGroup
        label="Address"
        name="address.text"
        required
      >
        <CustomInputAddress
          v-model="state.address.text"
          :loading
          :disabled
          icon="i-heroicons-map-pin"
        />
      </UFormGroup>
      <UFormGroup
        label="Description"
        name="description"
      >
        <UTextarea
          v-model="state.description"
          :loading
          :disabled
        />
      </UFormGroup>

      <UButton
        type="submit"
        :disabled
        :loading
      >
        Submit
      </UButton>
    </UForm>
  </UCard>
</template>
