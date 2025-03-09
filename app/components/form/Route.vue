<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { item, callback } = defineProps<{ item?: Route, callback?: () => void }>()

const log = useLogger()

const formName = 'Route'

const { RouteSchema: schema } = useZodSchema()
const { initialRoute } = useZodForm('route')
const clientStore = useClientStore()

const state = reactive({
  ...initialRoute,
  ...(item ? new RouteInstance(item) : {})
})

const isNew = computed(() => !state.id)
const loading = ref(false)
const disabled = computed(() => loading.value)
const validate = (state: any): FormError[] => {
  const errors = []
  const foundExistingItem = clientStore.findRoute(state)
  // if (state.origin?.id === state.destination?.id) {
  //   errors.push({ path: 'destination', message: `${formName} name already exists` })
  // }
  if (foundExistingItem && foundExistingItem?.id !== state.id) {
    errors.push({ path: 'destination', message: `${formName} already exists` })
  }

  return errors
}
const toast = useToastExt()
const onSubmit = async (event: FormSubmitEvent<RouteSchemaType>) => {
  loading.value = true
  try {
    log('state: ', event.data)
    // log('jsonify: ', RouteInstance.schemaToJson(event.data))
    await clientStore.submitRoute(event.data as Route)

    callback?.()

    toast.success({
      description: `${formName} has been ${isNew.value ? 'created' : 'updated'}!`
    })
  } catch (e) {
    toast.error({
      description: `${e}`
    })
  }

  loading.value = false
}

const optionsPortInstances = computed(() => clientStore.ports.map((i) => {
  return new PortInstance(i)
}))
const optionsOrigin = computed(() => {
  return optionsPortInstances.value
})
const optionsDestination = computed(() => {
  return optionsPortInstances.value?.filter(i => i.id !== state.origin?.id)
})
const optionsDay = computed(() => {
  return [
    { value: 1, lbl: 'Mon', label: 'Monday' },
    { value: 2, lbl: 'Tue', label: 'Tuesday' },
    { value: 3, lbl: 'Wed', label: 'Wednesday' },
    { value: 4, lbl: 'Thu', label: 'Thursday' },
    { value: 5, lbl: 'Fri', label: 'Friday' },
    { value: 6, lbl: 'Sat', label: 'Saturday' },
    { value: 7, lbl: 'Sun', label: 'Sunday' }
  ]
})
const optionsActive = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]
const optionsFootprintSize = computed(() => {
  return clientStore.cargoTypeFootprints.map(i => new CargoTypeFootprintInstance(i))
})

const optionsCargoTypeClass = computed(() => {
  return clientStore.cargoTypeClasses.map(i => new CargoTypeClassInstance(i))
})
const optionsPassengerTypeClass = computed(() => {
  return clientStore.passengerTypeClasses.map(i => new PassengerTypeClassInstance(i))
})

const selectedFootprints = computed(() => state.capacity?.cargoTypeFootprints?.filter(i => !!i) ?? [])
const selectedFootprintIds = computed(() => selectedFootprints.value?.map(i => i.id) ?? [])

const selectedCargoTypeClasses = computed(() => state.cargoTypeClasses?.filter(i => !!i) ?? [])
const selectedCargoTypeClassIds = computed(() => selectedCargoTypeClasses.value?.map(i => i.id) ?? [])

const selectedPassengerTypeClasses = computed(() => state.passengerTypeClasses?.filter(i => !!i) ?? [])
const selectedPassengerTypeClassIds = computed(() => selectedPassengerTypeClasses.value?.map(i => i.id) ?? [])

const getAvailableFootprints = (id?: string) => {
  return optionsFootprintSize.value.filter(i => !selectedFootprintIds.value.includes(i.id) || i.id === id)
}

const getAvailableCargoTypeClasses = (id?: string) => {
  return optionsCargoTypeClass.value.filter(i => !selectedCargoTypeClassIds.value.includes(i.id) || i.id === id)
}

const getAvailablePassengerTypeClasses = (id?: string) => {
  return optionsPassengerTypeClass.value.filter(i => !selectedPassengerTypeClassIds.value.includes(i.id) || i.id === id)
}

// adding all existing options
const addAllFootprint = () => {
  state.capacity.cargoTypeFootprints = optionsFootprintSize.value.map((f) => {
    const existing = selectedFootprints.value.find(i => i.id === f.id)
    return existing ?? new RouteCapacityFootprintInstance({ footprint: f.toJson(), allocation: 10 })
  })
}
const addAllCargoTypeClass = () => {
  state.cargoTypeClasses = optionsCargoTypeClass.value.map((c) => {
    const existing = selectedCargoTypeClasses.value.find(i => i.id === c.id)
    return existing ?? new RouteCargoTypeClassInstance({ class: c.toJson(), rate: c.rate ?? 0 })
  })
}
const addAllPassengerTypeClass = () => {
  state.passengerTypeClasses = optionsPassengerTypeClass.value.map((c) => {
    const existing = selectedPassengerTypeClasses.value.find(i => i.id === c.id)
    return existing ?? new RoutePassengerTypeClassInstance({ class: c.toJson(), rate: c.rate ?? 0 })
  })
}
const add8Schedules = () => {
  const exLen = state.schedules.length
  // loop to add 8 schedules only but should not exceed 24 items
  const maxLoop = (24 - exLen) < 8 ? (24 - exLen) : 8
  // log('maxLoop: ', maxLoop)
  for (let i = 0; i < maxLoop; i++) {
    addFieldSchedule()
  }
}
const sortSchedules = () => {
  state.schedules.sort((a, b) => {
    if (a.time.hours !== b.time.hours) {
      return a.time.hours - b.time.hours
    }
    if (a.time.minutes !== b.time.minutes) {
      return a.time.minutes - b.time.minutes
    }
    return a.time.seconds - b.time.seconds
  })
  form.value?.clear()
}

// removing all fields
const removeAllFootprint = () => {
  state.capacity.cargoTypeFootprints = []
}
const removeAllCargoTypeClass = () => {
  state.cargoTypeClasses = []
}
const removeAllPassengerTypeClass = () => {
  state.passengerTypeClasses = []
}
const removeAllSchedules = () => {
  state.schedules = []
}
// removing fields
const removeFieldFootprint = (idx: number) => {
  state.capacity?.cargoTypeFootprints?.splice(idx, 1)
  form.value?.clear()
}
const removeFieldCargoTypeClass = (idx: number) => {
  state.cargoTypeClasses?.splice(idx, 1)
  form.value?.clear()
}
const removeFieldPassengerTypeClass = (idx: number) => {
  state.passengerTypeClasses?.splice(idx, 1)
  form.value?.clear()
}
const removeFieldSchedule = (key: string) => {
  state.schedules?.splice(state.schedules?.findIndex(s => s.key === key), 1)
  form.value?.clear()
}

// adding fields
const addFieldFootprint = () => {
  state.capacity?.cargoTypeFootprints?.push(new RouteCapacityFootprintInstance({ allocation: 10 }))
}
const addFieldCargoTypeClass = () => {
  state.cargoTypeClasses?.push(new RouteCargoTypeClassInstance())
}
const addFieldPassengerTypeClass = () => {
  state.passengerTypeClasses?.push(new RoutePassengerTypeClassInstance())
}
const addFieldSchedule = () => {
  if (state.schedules.length >= 24) return
  const lastValue = state.schedules?.[state.schedules.length - 1]
  const newValue = lastValue?.copyWith({ excludedDays: [], active: true }) ?? TimeScheduleInstance.start()
  if (lastValue) newValue.addHour()
  state.schedules?.push(newValue)
}

// extras
const toggleAllSchedules = (v?: boolean) => {
  state.schedules.forEach(s => s.active = v ?? !s.active)
}

const stateErrors = ref()
const form = ref()

const logState = () => {
  // log('selected date setting: ', selectedDateSetting.value)
  log('state errors: ', form.value?.getErrors())
  // log('selected time: ', selectedTime.value)
}
</script>

<template>
  <UCard class="">
    <template #header>
      <div class="flex flex-col">
        <span class="text-lg font-bold">{{ isNew?'Create': 'Update' }} {{ formName?.toLowerCase() }} details</span>
        <span class="text-sm">Please fill out the port form</span>
      </div>
    </template>

    <UForm
      ref="form"
      :schema
      :validate
      :state
      :errors="stateErrors"
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
      <div class="flex gap-4">
        <div class="w-full">
          <UFormGroup
            label="Origin"
            name="origin"
            required
          >
            <USelectMenu
              v-model="state.origin"
              :options="optionsOrigin"
              :loading
              :disabled="disabled || !isNew"
              option-attribute="name"
              by="id"
              icon="i-heroicons-map-pin"
            />
          </UFormGroup>
        </div>
        <div class="w-full">
          <UFormGroup
            label="Destination"
            name="destination"
            required
          >
            <USelectMenu
              v-model="state.destination"
              :options="optionsDestination"
              :loading
              :disabled="disabled || !isNew"
              option-attribute="name"
              by="id"
              icon="i-heroicons-map-pin"
            />
          </UFormGroup>
        </div>
      </div>
      <div class="col-span-12 space-y-4">
        <UCard
          :ui="{ header: { padding: '!p-3' }, body: { padding: '!p-3' } }"
        >
          <template #header>
            <div class="col-span-12">
              <p class="font-bold text-sm">
                Route Capacity &amp; Allocations
              </p>
              <p class="text-gray-600 dark:text-gray-400 text-xs">
                This will limit the route bookings
              </p>
            </div>
          </template>
          <div class="space-y-4">
            <UButtonGroup
              class="w-full"
              size="xs"
            >
              <UFormGroup
                class="w-full"
                label="Vehicle Capacity"
                name="capacity.cargo"
              >
                <UInput
                  v-model="state.capacity!.cargo"
                  type="number"
                />
              </UFormGroup>
              <UFormGroup
                class="w-full"
                label="Passenger Capacity"
                name="capacity.passenger"
              >
                <UInput
                  v-model="state.capacity!.passenger"
                  type="number"
                />
              </UFormGroup>
            </UButtonGroup>
            <div
              class="space-y-2 flex flex-col"
            >
              <UButtonGroup
                v-for="(footprint, index) in selectedFootprints?? []"
                :key="`${footprint.key}-${index}`"
                size="xs"
              >
                <div class="flex-auto">
                  <UFormGroup
                    :label="index === 0 ? 'Footprint' : ''"
                    :name="`capacity.cargoTypeFootprints.${index}.footprint`"
                    class="basis-1/2"
                  >
                    <USelectMenu
                      v-model="footprint.footprint"
                      :options="getAvailableFootprints(footprint.footprint.id)"
                      option-attribute="name"
                      by="id"
                    />
                  </UFormGroup>
                </div>

                <div class="w-32 flex">
                  <UFormGroup
                    class="w-full"
                    :label="index === 0 ? 'Allocation' : ''"
                    :name="`capacity.cargoTypeFootprints.${index}.allocation`"
                  >
                    <UInput
                      v-model="footprint.allocation"
                      type="number"
                    />
                  </UFormGroup>
                  <div>
                    <UButton
                      :class="index === 0? 'mt-6': ''"
                      color="gray"
                      icon="i-heroicons-x-mark"
                      @click="removeFieldFootprint(index)"
                    />
                  </div>
                </div>
              </UButtonGroup>
            </div>
            <UButtonGroup size="xs">
              <UButton
                variant="outline"
                class="gap-2"
                icon="i-heroicons-plus"
                label="Add vehicle custom allocation"
                @click="addFieldFootprint()"
              />
              <UButton
                variant="outline"
                class="gap-2"
                icon="i-heroicons-plus"
                label="Add all"
                @click="addAllFootprint"
              />
              <UButton
                variant="outline"
                class="gap-2"
                icon="i-heroicons-trash"
                @click="removeAllFootprint"
              />
            </UButtonGroup>
          </div>
        </UCard>

        <UCard
          :ui="{ header: { padding: '!p-3' }, body: { padding: '!p-3' } }"
        >
          <template #header>
            <div class="col-span-12">
              <p class="font-bold text-sm">
                Route Rates
              </p>
              <p class="text-gray-600 dark:text-gray-400 text-xs">
                Route specific rates for different categories
              </p>
            </div>
          </template>
          <div class="flex gap-4 md:flex-col">
            <div class="w-1/2 sm:w-full space-y-2">
              <div class="space-y-2 flex flex-col w-full">
                <UButtonGroup
                  v-for="(classItem, index) in state.passengerTypeClasses?? []"
                  :key="`${classItem.key}-${index}`"
                  size="xs"
                >
                  <div class="flex-auto">
                    <UFormGroup
                      :label="index === 0 ? 'Passenger Class' : ''"
                      :name="`passengerTypeClasses.${index}.class`"
                      class="basis-1/2"
                    >
                      <USelectMenu
                        v-model="classItem.class"
                        :options="getAvailablePassengerTypeClasses(classItem.class.id)"
                        option-attribute="name"
                        by="id"
                      />
                    </UFormGroup>
                  </div>

                  <div class="w-24 sm:w-32 flex">
                    <UFormGroup
                      class="w-full"
                      :label="index === 0 ? 'Rate' : ''"
                      :name="`passengerTypeClasses.${index}.rate`"
                    >
                      <UInput
                        v-model="classItem.rate"
                        type="number"
                      />
                    </UFormGroup>
                    <div>
                      <UButton
                        :class="index === 0? 'mt-6': ''"
                        color="gray"
                        icon="i-heroicons-x-mark"
                        @click="removeFieldPassengerTypeClass(index)"
                      />
                    </div>
                  </div>
                </UButtonGroup>
              </div>
              <UButtonGroup size="xs">
                <UButton
                  variant="outline"
                  class="gap-2"
                  icon="i-heroicons-plus"
                  label="Add passenger class"
                  @click="addFieldPassengerTypeClass()"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  icon="i-heroicons-plus"
                  label="Add all"
                  @click="addAllPassengerTypeClass()"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  icon="i-heroicons-trash"
                  @click="removeAllPassengerTypeClass()"
                />
              </UButtonGroup>
            </div>
            <div class="w-1/2 sm:w-full space-y-2">
              <div class="space-y-2 flex flex-col w-full">
                <UButtonGroup
                  v-for="(classItem, index) in state.cargoTypeClasses?? []"
                  :key="`${classItem.key}-${index}`"
                  size="xs"
                >
                  <div class="flex-auto w-0">
                    <UFormGroup
                      :label="index === 0 ? 'Vehicle Class' : ''"
                      :name="`cargoTypeClasses.${index}.class`"
                      class="basis-1/2"
                    >
                      <USelectMenu
                        v-model="classItem.class"
                        :options="getAvailableCargoTypeClasses(classItem.class.id)"
                        option-attribute="name"
                        by="id"
                      />
                    </UFormGroup>
                  </div>

                  <div class="w-24 sm:w-32 flex">
                    <UFormGroup
                      class="w-full"
                      :label="index === 0 ? 'Rate' : ''"
                      :name="`cargoTypeClasses.${index}.rate`"
                    >
                      <UInput
                        v-model="classItem.rate"
                        type="number"
                      />
                    </UFormGroup>
                    <div>
                      <UButton
                        :class="index === 0? 'mt-6': ''"
                        color="gray"
                        icon="i-heroicons-x-mark"
                        @click="removeFieldCargoTypeClass(index)"
                      />
                    </div>
                  </div>
                </UButtonGroup>
              </div>
              <UButtonGroup size="xs">
                <UButton
                  variant="outline"
                  class="gap-2"
                  icon="i-heroicons-plus"
                  label="Add vehicle class"
                  @click="addFieldCargoTypeClass()"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  icon="i-heroicons-plus"
                  label="Add all"
                  @click="addAllCargoTypeClass()"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  icon="i-heroicons-trash"
                  @click="removeAllCargoTypeClass()"
                />
              </UButtonGroup>
            </div>
          </div>
        </UCard>

        <UCard
          :ui="{ header: { padding: '!p-3' }, body: { padding: '!p-3' } }"
        >
          <template #header>
            <div class="col-span-12">
              <p class="font-bold text-sm">
                Route Trip Schedules
              </p>
              <p class="text-gray-600 dark:text-gray-400 text-xs">
                Route specific trip schedules allow for bookings
              </p>
            </div>
          </template>
          <div class="flex gap-4 md:flex-col">
            <div class="w-1/2 sm:w-full space-y-2">
              <div class="space-y-2 flex flex-col w-full">
                <UButtonGroup
                  v-for="(sc, index) in state.schedules?? []"
                  :key="`${sc.key}-${index}`"
                  size="xs"
                >
                  <div class="flex-auto w-0">
                    <UFormGroup
                      :label="index === 0 ? 'Time' : ''"
                      :name="`schedules.${index}.time`"
                      class="basis-1/2"
                    >
                      <CustomInputDateTime
                        v-model:tod="sc.time"
                        mode="time"
                        type="single"
                        icon="ph:clock"
                        class="w-full"
                      />
                    </UFormGroup>
                  </div>
                  <div class="flex-auto w-1/5">
                    <UFormGroup
                      :label="index === 0 ? 'Excluded days' : ''"
                      :name="`schedules.${index}.excludedDays`"
                      class="basis-1/2"
                    >
                      <USelectMenu
                        v-model="sc.excludedDays"
                        :options="optionsDay"
                        option-attribute="label"
                        value-attribute="value"
                        multiple
                      />
                    </UFormGroup>
                  </div>

                  <div class="w-24 sm:w-32 flex">
                    <UFormGroup
                      class="w-full"
                      :label="index === 0 ? 'Active' : ''"
                      :name="`schedules.${index}.active`"
                    >
                      <USelectMenu
                        v-model="sc.active"
                        option-attribute="label"
                        value-attribute="value"
                        :options="optionsActive"
                      >
                        <template #label="{ selected }">
                          {{ selected.label }}
                        </template>
                      </USelectMenu>
                    </UFormGroup>
                    <div>
                      <UButton
                        :class="index === 0? 'mt-6': ''"
                        color="gray"
                        icon="i-heroicons-x-mark"
                        @click="removeFieldSchedule(sc.key)"
                      />
                    </div>
                  </div>
                </UButtonGroup>
              </div>
              <UButtonGroup size="xs">
                <UButton
                  variant="outline"
                  class="gap-2"
                  :disabled="state.schedules.length >= 24"
                  icon="i-heroicons-plus"
                  label="Add"
                  @click="addFieldSchedule()"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  :disabled="state.schedules.length >= 24"
                  label="Add 8"
                  icon="i-heroicons-plus"
                  @click="add8Schedules()"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  :disabled="state.schedules.length >= 24"
                  label="Sort"
                  icon="i-heroicons-arrow-down-circle"
                  @click="sortSchedules()"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  label="Enable"
                  icon="i-heroicons-check-circle"
                  @click="toggleAllSchedules(true)"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  label="Disable"
                  icon="i-heroicons-x-circle"
                  @click="toggleAllSchedules(false)"
                />
                <UButton
                  variant="outline"
                  class="gap-2"
                  icon="i-heroicons-trash"
                  @click="removeAllSchedules()"
                />
              </UButtonGroup>
            </div>
          </div>
        </UCard>
      </div>

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
