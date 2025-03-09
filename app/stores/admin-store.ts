import { startOfDay, endOfDay, sub } from 'date-fns'
// import type { Query } from 'firebase-admin/firestore'
import { defineStore } from 'pinia'

// export type FireQuery = Query<any, { [x: string]: any }>
export const useAdminStore = defineStore('admin-store', () => {
  const log = useLogger(false)
  const devMode = useDevMode()
  const userStore = useUserStore()
  const userId = computed(() => userStore.userId)
  watch(userId, (uid) => {
    log.i('ADMIN STORE: UID:', uid)
    if (!uid) $reset()
  })
  const hasAccess = computed(() => {
    return !!(import.meta.client
      && userId.value
      && userStore?.user?.admin)
  })

  const admin_repo = computed(() => useAdminRepo(userStore.user, devMode.mode.value))
  const { convertReferenceSnapshotObjects: convertToNative } = useUtils()
  const dateRange = ref<DateRange>({ start: startOfDay(sub(new Date(), { days: 14 })), end: endOfDay(new Date()) })

  const $reset = () => {
    ticketsData.value = []
    devMode.$reset()
    dateRange.value = { start: sub(new Date(), { days: 14 }), end: new Date() }
  }

  const reference = computed(() => useFirestoreReference(devMode.mode.value))

  const ticketsSource = computed(() => hasAccess.value ? reference.value.tickets_query(dateRange.value) : null)
  const { data: ticketsData, pending: ticketsPending } = useCollection<Ticket>(ticketsSource, { maxRefDepth: 0 })
  const tickets = computed<Ticket[]>(() => ticketsData.value?.map(t => convertToNative(t)) ?? [])

  const approvePendingTicket = async (ticket: Ticket, number: string) => {
    return await admin_repo.value.approvePendingTicket(ticket, number)
  }
  const ticketRows = computed(() => TicketInstance.toTableRows(tickets.value))
  return {
    $reset,
    ticketsData,
    ticketsSource,
    approvePendingTicket,
    devMode,
    ticketsPending,
    ticketRows,
    dateRange,
    tickets,
    hasAccess
  }
})
