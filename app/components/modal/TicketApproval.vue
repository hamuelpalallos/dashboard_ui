<script setup lang="ts">
const { ticket } = defineProps<{ ticket?: Ticket }>()

const log = useLogger(true)
const isOpen = defineModel({
  type: Boolean
})

const format = useFormat()
const icon = useIcon()
const adminStore = useAdminStore()
const referenceNo = ref('')

const toast = useToastExt()
const approveTicket = async () => {
  try {
    log.i('Approve ticket', ticket)
    if (!ticket) return
    if (referenceNo.value.length < 4) {
      toast.error({
        title: 'Invalid Reference Number',
        description: 'Please enter a valid reference number, min. (4).'
      })
      return
    }
    await adminStore.approvePendingTicket(ticket, referenceNo.value)
    toast.success({
      title: 'Ticket Approved',
      description: `Ticket ${ticket.id} has been approved.`
    })
    isOpen.value = false
    referenceNo.value = ''
  } catch (error) {
    log.e('Error approving ticket', error)
  }
}
</script>

<template>
  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex gap-3">
            <UIcon
              :name="icon.ticket"
              :size="25"
            />
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Ticket Approval
            </h3>
          </div>

          <div class="flex items-center justify-between gap-4">
            <UColorModeButton />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </div>
      </template>
      <div>
        <div class="flex justify-between items-center gap-4">
          <CustomQrCode
            :value="ticket?.id??''"
          />

          <div class="flex flex-col justify-between w-full">
            <div class="flex items-center gap-4">
              <UAvatar
                :alt="format.initials(ticket?.user?.name, ticket?.user?.email?.charAt(0))"
                :src="ticket?.user?.image"
                size="md"
              />
              <div class="flex flex-col justify-between">
                <span class="text-xl font-bold">{{ format.user(ticket?.user) }}</span>
                <span class="text-xs font-italic">{{ format.email(ticket?.user?.email) }}</span>
              </div>
            </div>
            <UDivider
              class="py-3 text-xs"
            >
              <!-- <span>
                <UBadge
                  :color="TicketInstance.statusColor(ticket?.status)"
                  :label="ticket?.status"
                  size="xs"
                  variant="subtle"
                  class="uppercase"
                />
              </span> -->
            </UDivider>
            <div class="flex justify-between items-center gap-3">
              <span>
                <UBadge
                  :color="TicketInstance.statusColor(ticket?.status)"
                  :label="ticket?.status"
                  size="md"
                  variant="subtle"
                  class="uppercase"
                />
              </span>
              <div class="flex flex-col text-xs">
                <span class="text-xs">Departure date</span>
                <span class="font-bold">{{ format.datetime(ticket?.departure) }}</span>
              </div>
              <div class="flex flex-col text-xs">
                <span class="">Issued date</span>
                <span class="font-bold">{{ format.datetime(ticket?.paidAt) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4 space-y-4">
          <UCard>
            <div class="flex flex-col">
              <div class="mb-2 -mt-3 text-xs text-center">
                {{ format.company(ticket?.company) }}
              </div>
              <div class="flex items-center justify-between text-xl font-bold">
                <div class="pr-3 w-40">
                  {{ format.port(ticket?.route?.origin) }}
                </div>
                <div class="w-full grow">
                  <UDivider>
                    <div
                      class="flex items-center gap-2"
                    >
                      <UIcon
                        name="i-heroicons-arrow-right"
                        size="20"
                      />
                      <UAvatar
                        :alt="format.company(ticket?.company)"
                        :src="ticket?.company?.image"
                        size="md"
                      />
                      <UIcon
                        name="i-heroicons-arrow-right"
                        size="20"
                      />
                    </div>
                  </UDivider>
                </div>
                <div class="pl-3 w-40">
                  {{ format.port(ticket?.route?.destination) }}
                </div>
              </div>
              <div class="mt-2 -mb-3 text-xs text-center">
                <!-- <span class="">{{ format.datetime(ticket?.departure) }} </span> -->
                <span class="">( Estimated {{ format.duration({ minutes: 45 }) }} )</span>
              </div>
            </div>
          </UCard>
          <UCard
            v-for="(c, idx) in (ticket?.cargos??[])"
            :key="`c-${idx}`"
          >
            <div class="flex flex-col">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <UIcon
                    name="tdesign:vehicle"
                    size="40"
                  />
                  <div class="flex flex-col">
                    <span class="pr-3 text-md font-bold">{{ format.cargo(c) }}</span>
                    <span class="pr-3 text-xs">{{ c?.type?.description }}</span>
                  </div>
                </div>
                <div class="flex flex-col">
                  <span class="text-md font-bold">{{ c?.plate }}</span>
                  <span class="text-xs">Plate No.</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-md font-bold">{{ format.currency(c?.type?.class?.rate) }}</span>
                  <span class="text-xs">Amount</span>
                </div>
              </div>
            </div>
          </UCard>
          <div class="border rounded-lg dark:border-gray-700">
            <table class="divide-gray-200 dark:divide-gray-700 min-w-full divide-y">
              <thead class="h-8 px-4 text-xs font-bold uppercase dark:text-gray-500">
                <tr>
                  <th class="pl-4">
                    No.
                  </th>
                  <th>
                    Passenger
                  </th>
                  <th class="text-right">
                    Type
                  </th>
                  <th class="pr-4 text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(p, idx) in (ticket?.passengers??[])"
                  :key="`p-${idx}`"
                  class="border-gray-200 dark:border-gray-700 border-b"
                >
                  <!-- <td>{{ format.name(p?.name) }}</td> -->
                  <td class="pl-4">
                    {{ idx + 1 }}.
                  </td>
                  <td class="py-1">
                    <div class="text-muted-800 dark:text-muted-100 font-medium">
                      {{ format.name(p.name) }}
                    </div>
                    <div class="text-muted-400 mt-0.5 text-xs">
                      {{ format.capitalize(p.sex) }},
                      <!-- {{ item.birthdate }}, -->
                      {{ format.age(p.birthdate) }},
                      {{ format.capitalize(p?.nationality) }}
                    </div>
                  </td>
                  <td class="text-right">
                    {{ format.passenger_type(p?.type) }}
                  </td>
                  <td class="text-right pr-4">
                    {{ format.ticket_rate(p?.ticket) }}
                  </td>
                </tr>
                <tr class="text-sm">
                  <td
                    colspan="3"
                    class="text-right"
                  >
                    Subtotal
                  </td>
                  <td class="text-right pr-4">
                    {{ format.currency(ticket?.subtotal) }}
                  </td>
                </tr>
                <tr class="text-sm">
                  <td
                    colspan="3"
                    class="text-right"
                  >
                    Fees
                  </td>
                  <td class="text-right pr-4">
                    <span>+ {{ format.currency((ticket?.total??0) - (ticket?.subtotal??0)) }}</span>
                  </td>
                </tr>
                <tr class="text-sm">
                  <td
                    colspan="3"
                    class="text-right"
                  >
                    Total
                  </td>
                  <td class="text-right pr-4">
                    {{ format.currency(ticket?.total) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <UInput
              v-model.trim="referenceNo"
              name="Reference No."
              placeholder="External reference number"
              @change="(v) => referenceNo = v.toUpperCase()"
            />
          </div>
          <div class="text-right">
            <UButton @click="approveTicket">
              Approve
            </UButton>
          </div>
        </div>
      </div>

      <!-- <Placeholder class="h-32" /> -->
    </UCard>
  </UModal>
</template>
