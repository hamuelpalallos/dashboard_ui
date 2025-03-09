// import { isSameDay, subDays } from 'date-fns'
// import { defineStore } from 'pinia'

// export const useDashboardStore = defineStore(
//   'dashboard',
//   () => {
//     const clientAdmintStore = useClientStore()

//     const selectedRouteDate = ref('')
//     const selectedRouteId = ref('')
//     const selectedRoute = computed((): Route | undefined => {
//       return clientAdmintStore.routeSelected
//     })
//     const selectedRouteName = computed((): string => {
//       if (!selectedRoute.value) return 'route'
//       return (
//         selectedRoute.value?.origin.name +
//         ' - ' +
//         selectedRoute.value?.destination.name
//       )
//     })

//     const passengerCount = computed(() => {
//       let count = 0
//       clientAdmintStore.tickets.forEach((e) => {
//         count += e.passengers.length
//       })
//       return count
//     })

//     const activePeriod = ref<TimelyPeriod>('week')

//     const { inputDateFormat } = useUtils()

//     const optionRoutes = computed(() => {
//       const rts = useMap().optionsFromRoutes(clientAdmintStore.routes)
//       selectedRouteId.value = rts[0]?.value ?? ''
//       selectedRouteDate.value = new Date().toLocaleDateString()

//       // return the routes
//       return rts
//     })

//     const trips = computed((): Trip[] => {
//       const temp = clientAdmintStore.getRouteStats(
//         selectedRouteId.value,
//         selectedRouteDate.value,
//       )

//       return temp
//     })

//     const getTicketsByDateRange = (
//       startDate: Date = subDays(new Date(), 7),
//       endDate: Date = new Date(),
//     ): Ticket[] => {
//       console.log(
//         'FROM getTicketsByDateRange: TICKETS: ',
//         clientAdmintStore.tickets.length,
//       )
//       return clientAdmintStore.tickets.filter((ticket) => {
//         const ticketDate = ticket.departure
//         return ticketDate >= startDate && ticketDate <= endDate
//       })
//     }

//     const getPassengerAndVehicleSeries = (
//       startDate: Date = subDays(new Date(), 7),
//       endDate: Date = new Date(),
//     ): { passengers: number[]; vehicles: number[] } => {
//       const dates = useDate().getDatesBetween(startDate, endDate)
//       const passengers: number[] = []
//       const vehicles: number[] = []

//       dates.forEach((date) => {
//         const tickets = getTicketsByDate(date)
//         let passengerCount = 0
//         let vehicleCount = 0
//         tickets.forEach((ticket: Ticket) => {
//           passengerCount += ticket.passengers.length
//           vehicleCount += ticket.cargos.length
//         })

//         passengers.push(passengerCount)
//         vehicles.push(vehicleCount)
//       })

//       return {
//         passengers,
//         vehicles,
//       }
//     }

//     const getTicketsByDate = (date: Date): Ticket[] => {
//       return clientAdmintStore.tickets.filter((ticket: Ticket) => {
//         return isSameDay(ticket.departure as Date, date)
//       })
//     }

//     return {
//       optionRoutes,
//       passengerCount,
//       selectedRouteDate,
//       selectedRouteId,
//       selectedRouteName,
//       trips,
//       getTicketsByDateRange,
//       activePeriod,
//       getPassengerAndVehicleSeries,
//     }
//   }
// )
