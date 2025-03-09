<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { item, callback } = defineProps<{ item?: TripCancellation, callback?: () => void }>()

const log = useLogger()

const formName = 'Trip Cancellation'

const { TripCancellationSchema: schema } = useZodSchema()

// const { initialTripCancellation: initialValue } = useZodForm()

const clientStore = useClientStore()

// const itemSchema = computed(() => {
//   return item ? (TripCancellationInstance.fromJson(item).toSchema()) : {}
// })

const state = reactive({
  // id: '',

  // type: 'default',
  // routes: [],
  // active: true,
  // withNotice: true,
  // description: '',
  // title: ''
  ...TripCancellationInstance.initialValue(),
  ...(item ? TripCancellationInstance.fromJson(item).toSchema() : {}),
  dateSetting: {
    type: 'range',
    mode: 'datetime',
    range: {
      start: new Date(),
      end: new Date()
    }
  } as DateSetting
})

const isNew = computed(() => !state?.id)
const loading = ref(false)
const disabled = computed(() => loading.value)
const validate = (_state: any): FormError[] => {
  // const errors = []
  // const foundPort = clientStore.findPort(state.name)
  // if (foundPort && foundPort?.id !== state.id) {
  //   errors.push({ path: 'name', message: 'Port name already exists' })
  // }
  return []
}

const toast = useToastExt()
const onSubmit = async (event: FormSubmitEvent<TripCancellationSchemaType>) => {
  loading.value = true
  try {
    log('Form values:', event.data)
    const data = TripCancellationInstance.schemaToJson(event.data)
    await clientStore.submitTripCancellation(data)
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

const optionsRouteInstances = computed(() => clientStore.routes.map((i) => {
  return new RouteInstance(i)
}))
const form = ref()
const logState = () => {
  // log('selected date setting: ', selectedDateSetting.value)
  log('item: ', item)
  log('state: ', state)
  log('state errors: ', form.value?.getErrors())
  // log('selected time: ', selectedTime.value)
}
</script>

<template>
  <UCard class="">
    <template #header>
      <div class="flex flex-col">
        <span class="text-lg font-bold">{{ isNew?'Create': 'Update' }} {{ formName.toLowerCase() }} details</span>
        <span class="text-sm">Please fill out the {{ formName.toLowerCase() }} form</span>
      </div>
    </template>

    <UForm
      :ref="form"
      :schema
      :validate
      :state
      class="space-y-4"
      @submit="onSubmit"
    >
      <div class="flex gap-4">
        <div class="w-1/2">
          <UCard>
            <UFormGroup
              label="Active"
              help="Enable cancellation"
              name="active"
            >
              <UToggle
                v-model="state.active"
                :disabled
                :loading
              />
            </UFormGroup>
          </UCard>
        </div>
        <div class="w-1/2">
          <UCard>
            <UFormGroup
              label="Include Notice"
              name="withNotice"
              help="Create a notice for this"
            >
              <UToggle
                v-model="state.withNotice"
                :disabled
                :loading
              />
            </UFormGroup>
          </UCard>
        </div>
      </div>
      <UFormGroup
        label="Title / Reason"
        name="title"
        required
      >
        <UInput
          v-model="state.title"
          :loading
          :disabled
          icon="i-heroicons-stop-circle"
        />
      </UFormGroup>

      <div>
        <UFormGroup
          label="Date Range"
          name="dateSetting"
          required
        >
          <CustomInputDateTime
            v-model="state.dateSetting"
            mode="datetime"
            type="range"
            block
            icon="i-heroicons-calendar"
            :range-options="false"
            :columns="1"
            :loading
            :disabled
          />
        </UFormGroup>
      </div>

      <UFormGroup
        label="Routes"
        name="routes"
        required
      >
        <USelectMenu
          v-model="state.routes"
          :loading
          :disabled
          icon="i-heroicons-map"
          :options="optionsRouteInstances"
          option-attribute="name"
          by="id"
          multiple
          :placeholder="loading? 'Loading...' : 'Select routes'"
          searchable
        />
      </UFormGroup>
      <UFormGroup
        required
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
      <UButton
        v-if="clientStore.devMode"
        class="ml-4"
        variant="outline"
        :disabled
        :loading
        @click="logState"
      >
        Log state
      </UButton>
    </UForm>
  </UCard>
</template>
