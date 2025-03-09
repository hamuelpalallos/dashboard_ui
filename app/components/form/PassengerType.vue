<script setup lang="ts">
type FormType = PassengerType
const { item } = defineProps<{ item?: FormType }>()

const { PassengerTypeSchema: schema } = useZodSchema()
const clientStore = useClientStore()
const {
  isNew,
  validate,
  state,
  loading,
  disabled,
  submit,
  meta
} = useFormState<FormType>({
  submit: clientStore.submitPassengerType,
  state: {
    active: true,
    fee: {
      type: 'percent-min',
      percent: 6,
      min: 15,
      max: 0,
      fixed: 0
    },
    ageRange: {
      type: 'min-max',
      min: 2,
      max: 60
    },
    ...item
  },
  meta: {
    category: 'Passenger Type'
  }
})

const formEl = ref()
const test = () => {
  console.log('error: ', formEl.value.getErrors())
  console.log('state: ', state)
}
</script>

<template>
  <UCard class="">
    <template #header>
      <div class="flex flex-col">
        <span class="text-lg font-bold">{{ isNew?'Create': 'Update' }} {{ meta.Category }}</span>
        <span class="text-sm">Please fill out the {{ meta.description }} form</span>
      </div>
    </template>

    <UForm
      ref="formEl"
      :validate
      :state
      :schema
      class="space-y-4"
      @submit="submit"
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
        name="name"
        label="Class Name"
        required
      >
        <UInput
          v-model="state.name"
          :loading
          :disabled
          icon="i-heroicons-flag"
        />
      </UFormGroup>

      <FormSection
        title="Age Range & Verify"
        description="Age Range & Verify configuration for passenger type class"
      >
        <UFormGroup
          name="verify"
          label="Verify"
          description="Requires proof"
        >
          <UToggle
            v-model="state.verify"
            :disabled
            :loading
          />
        </UFormGroup>
        <CustomInputNumberRange
          v-model="state.ageRange"
          name="ageRange"
          label="Age Range"
          :disabled
          :loading
        />
      </FormSection>
      <FormSection
        title="Rate & Fee"
        description="Rate & Fee configuration for passenger type class"
      >
        <UFormGroup
          name="rate"
          label="Rate"
        >
          <UInput
            v-model="state.rate"
            icon="lucide:philippine-peso"
            hint="Rate per passenger"
            type="number"
            min="0"
            name="rate"
            label="Rate"
            :disabled
            :loading
          />
        </UFormGroup>
        <CustomInputFee
          v-model="state.fee"
          name="fee"
          label="Fee"
          :disabled
          :loading
        />
      </FormSection>

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

      <div class="flex space-x-4">
        <UButton
          type="submit"
          :disabled
          :loading
        >
          Submit
        </UButton>

        <UButton
          type="button"
          :disabled
          :loading
          @click="test"
        >
          Test
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
