// import { add, format, isPast, isSameDay, subDays } from 'date-fns'

// import { defineStore } from 'pinia'

// const { time24To12, getDayOfWeek } = useUtils()
// export const usePortAdminStore = defineStore('port-admin', () => {
//   interface Sales {
//     total: number
//     subtotal: number
//   }

//   const userStore = useUserStore()

//   const firestore = useFirestoreRepo()
//   const reference = useReference()

//   const routesCount = ref<number>(0)
//   const routeSelected = ref<Route>()

//   const converter = useConverter()

//   // ==========================================================================
//   const sales = ref<Sales>({
//     total: 0,
//     subtotal: 0,
//   })
//   // ==========================================================================

//   const companyId = computed(() => userStore.role === 'port-admin' ? userStore.user?.company?.id : undefined)
//   const portId = computed(() => companyId ? userStore.user?.companyData?.port?.id : undefined)

//   const company = computed(() => userStore.user?.company)

//   const portSource = computed(() => companyId.value && portId.value ? reference.company_port(companyId.value, portId.value) : null)
//   const { data: port, pending: portPending } = useDocument<Port>(portSource.value)

//   const portsSource = computed(() => companyId.value ? reference.ports(companyId.value) : null)
//   const { data: ports, pending: portsPending } = useCollection<Port>(portsSource.value)

//   const usersSource = computed(() => companyId.value && portId.value ? reference.port_users(companyId.value, portId.value) : null)
//   const { data: users, pending: usersPending } = useCollection<UserCompanyData>(usersSource.value, { maxRefDepth: 1 })

//   const portRoutesSource = computed(() => companyId.value && portId.value ? reference.port_routes(companyId.value, portId.value) : null)
//   const { data: portRoutes, pending: portRoutesPending } = useCollection<Route>(portRoutesSource.value)

//   const routesSource = computed(() => companyId.value ? reference.routes(companyId.value) : null)
//   const { data: routes, pending: routesPending } = useCollection<Route>(routesSource.value)

//   const passengerTypesSource = computed(() => companyId.value ? reference.passenger_types(companyId.value) : null)
//   const { data: passengerTypes, pending: passengerTypesPending } = useCollection<PassengerType>(passengerTypesSource.value)

//   const cargoTypesSource = computed(() => companyId.value ? reference.cargo_types(companyId.value) : null)
//   const { data: cargoTypes, pending: cargoTypesPending } = useCollection<CargoType>(cargoTypesSource.value)

//   const conveyancesSource = computed(() => companyId.value ? reference.conveyances(companyId.value) : null)
//   const { data: conveyances, pending: conveyancesPending } = useCollection<Conveyance>(conveyancesSource.value)

//   const ticketsSource = computed(() => companyId.value && portId.value ? reference.port_tickets(companyId.value, portId.value).withConverter(converter.ticket) : null)
//   const { data: tickets, pending: ticketsPending } = useCollection<Ticket>(ticketsSource.value)

//   const cargoCategoriesSource = computed(() => companyId.value ? reference.cargo_categories(companyId.value) : null)
//   const { data: cargoCategories, pending: cargoCategoriesPending } = useCollection<CargoCategory>(cargoCategoriesSource.value)

//   const ticketUsers = ref<User[]>([])

//   debouncedWatch(tickets, (tkts) => {
//     sales.value = {
//       total: 0,
//       subtotal: 0,
//     }
//     const usersTemp: User[] = []
//     tickets.value.forEach((ticket: Ticket) => {
//       if (ticket.payment && ticket.payment.date) {
//         sales.value.total += ticket.total
//         sales.value.subtotal += ticket.subtotal
//       }
//       if (ticket.user)
//         usersTemp.push(ticket.user)
//     })

//     const usersTemp2 = usersTemp.filter((user: User, index: number) => {
//       return usersTemp.findIndex((item: User) => item.id === user.id) === index
//     })
//     ticketUsers.value = usersTemp2
//   }, { debounce: 1000 })

//   const getRouteStats = (
//     routeId: string,
//     selectedDateString: string,
//   ): Trip[] => {
//     const selectedDate = new Date(selectedDateString)

//     const routeTickets: Ticket[] = tickets.value.filter((item: Ticket) => {
//       return (
//         item.route.id === routeId && isSameDay(selectedDate, item.departure as Date)
//       )
//     })

//     const selectedRoute: Route | undefined = routes?.value.find(
//       (item) => item.id === routeId,
//     ) as Route | undefined

//     if (!selectedRoute)
//       return []

//     // filter the route data
//     const filteredTrips: Trip[] = []

//     for (let i = 0; i < (selectedRoute?.trips?.length ?? 0); i++) {
//       const item = selectedRoute?.trips?.[i]
//       if (!item) {
//         continue
//       }
//       const formattedTime = time24To12(item.time)

//       // ? FILTER TICKETS BY TIME
//       const routeTicketsByTime = routeTickets.filter((ticket: Ticket) => {
//         const ticketTime = format(ticket.departure as Date, 'hh:mm a')

//         return ticketTime === formattedTime
//       })

//       let passCount = 0
//       let cargoCount = 0
//       const listOfPassengers: any[] = []
//       routeTicketsByTime.forEach((ticket: Ticket) => {
//         const passengers = ticket.passengers.map(
//           (passenger: any, index: number) => {
//             return {
//               ...passenger,
//               ticketId: `${ticket.id}-${index + 1}`,
//             }
//           },
//         )
//         listOfPassengers.push(...passengers)
//         passCount += ticket.passengers.length
//         cargoCount += ticket.cargos.length
//       })

//       const passMax = selectedRoute.capacity?.passenger ?? 0
//       const cargoMax = selectedRoute.capacity?.cargo ?? 0
//       const passPercent = Math.round((passCount / passMax) * 10000) / 100
//       const cargoPercent = Math.round((cargoCount / cargoMax) * 10000) / 100

//       const dayOfWeek = getDayOfWeek(selectedDate)
//       const isNotAvailable = item.excludedDays.includes(dayOfWeek)

//       const tripAvailable
//         = (passPercent < 100 || cargoPercent < 100) && !isNotAvailable

//       const tripDeparture: Date = useDate().setTimeInDate(
//         selectedDate,
//         item.time,
//       )

//       const tripDuration: DurationInstance = { hours: 2 }
//       const tripArrival: Date = add(tripDeparture, tripDuration)

//       if (tripAvailable) {
//         filteredTrips.push({
//           available: tripAvailable,
//           company: routeTickets[0]?.company,
//           time: formattedTime,
//           route: selectedRoute,
//           departure: tripDeparture,
//           exception: item.excludedDays,
//           duration: tripDuration,
//           arrival: tripArrival,
//           passengers: listOfPassengers,
//           capacity: {
//             cargo: {
//               percent: cargoPercent,
//               max: cargoMax,
//               current: cargoCount,
//             },
//             passenger: {
//               percent: passPercent,
//               max: passMax,
//               current: passCount,
//             },
//           },
//         })
//       }
//     }

//     const tripDates: Date[] = filteredTrips.map((trip: Trip) => trip.departure)
//     const currentDateFromTrips = useDate().closestFutureDate(tripDates)

//     filteredTrips.forEach((trip: Trip) => {
//       if (trip.status)
//         return
//       if (currentDateFromTrips === trip.departure)
//         trip.status = 'in-progress'
//       else if (isPast(trip.departure))
//         trip.status = 'completed'
//       else
//         trip.status = 'scheduled'
//     })
//     return filteredTrips
//   }

//   const getTicketPassengerTypes = () => {
//     const passengerTypeStats: { [key: string]: number } = {}

//     tickets?.value?.forEach((ticket: any) => {
//       ticket?.passengerList?.forEach((passenger: any) => {
//         const typeName = passenger?.type?.name
//         if (typeName) {
//           if (passengerTypeStats[typeName]) {
//             passengerTypeStats[typeName]++
//           }
//           else
//             passengerTypeStats[typeName] = 1
//         }
//       })
//     })
//     return passengerTypeStats
//   }

//   const addCompanyPort = async (companyId: string, data: Port) => {
//     return await firestore.addCompanyPort(companyId, data)
//   }

//   const deleteCompanyPort = async (companyId: string, id: string) => {
//     return await firestore.deleteCompanyPort(companyId, id)
//   }

//   const addCargoCategory = async (companyId: string, data: CargoCategory) => {
//     return await firestore.addCargoCategory(companyId, data)
//   }

//   const deleteCargoCategory = async (companyId: string, id: string) => {
//     return await firestore.deleteCargoCategory(companyId, id)
//   }

//   const getTicketFromStore = (ticketId: string) => {
//     return tickets.value.find((ticket: Ticket) => ticket.id === ticketId)
//   }

//   // ==========================================================================
//   const selectedRouteDate = ref('')
//   const selectedRouteId = ref('')
//   const selectedRoute = computed((): Route | undefined => {
//     return routeSelected.value
//   })
//   const selectedRouteName = computed((): string => {
//     if (!selectedRoute.value)
//       return 'route'
//     return (
//       `${selectedRoute.value?.origin.name
//       } - ${
//       selectedRoute.value?.destination.name}`
//     )
//   })

//   const passengerCount = computed(() => {
//     let count = 0
//     tickets.value.forEach((e) => {
//       count += e.passengers.length
//     })
//     return count
//   })

//   const activePeriod = ref<TimelyPeriod>('week')

//   const { inputDateFormat } = useUtils()

//   const optionRoutes = computed(() => {
//     const rts = useMap().optionsFromRoutes(portRoutes.value)
//     selectedRouteId.value = rts[0]?.value ?? ''
//     selectedRouteDate.value = new Date().toLocaleDateString()

//     // return the routes
//     return rts
//   })

//   const trips = computed((): Trip[] => {
//     return getRouteStats(
//       selectedRouteId.value,
//       selectedRouteDate.value,
//     )
//   })

//   const getTicketsByDateRange = (
//     startDate: Date = subDays(new Date(), 7),
//     endDate: Date = new Date(),
//   ): Ticket[] => {
//     console.log(
//       'FROM getTicketsByDateRange: TICKETS: ',
//       tickets.value.length,
//     )
//     return tickets.value.filter((ticket) => {
//       const ticketDate = ticket.departure
//       return ticketDate >= startDate && ticketDate <= endDate
//     })
//   }

//   const getPassengerAndVehicleSeries = (
//     startDate: Date = subDays(new Date(), 7),
//     endDate: Date = new Date(),
//   ): { passengers: number[], vehicles: number[] } => {
//     const dates = useDate().getDatesBetween(startDate, endDate)
//     const passengers: number[] = []
//     const vehicles: number[] = []

//     dates.forEach((date) => {
//       const tickets = getTicketsByDate(date)
//       let passengerCount = 0
//       let vehicleCount = 0
//       tickets.forEach((ticket: Ticket) => {
//         passengerCount += ticket.passengers.length
//         vehicleCount += ticket.cargos.length
//       })

//       passengers.push(passengerCount)
//       vehicles.push(vehicleCount)
//     })

//     return {
//       passengers,
//       vehicles,
//     }
//   }

//   const getTicketsByDate = (date: Date): Ticket[] => {
//     return tickets.value.filter((ticket: Ticket) => {
//       return isSameDay(ticket.departure as Date, date)
//     })
//   }

//   // ==========================================================================

//   return {

//     companyId,
//     portId,
//     port,
//     tickets,
//     routes,
//     ports,
//     users,
//     portRoutes,

//     cargoCategories,
//     passengerTypes,
//     cargoTypes,
//     conveyances,
//     ticketUsers,
//     getTicketFromStore,
//     routesCount,
//     routeSelected,
//     deleteCompanyPort,
//     getRouteStats,
//     getTicketPassengerTypes,
//     addCargoCategory,
//     deleteCargoCategory,
//     addCompanyPort,
//     company,
//     sales,

//     // ==========================================================================
//     optionRoutes,
//     passengerCount,
//     selectedRouteDate,
//     selectedRouteId,
//     selectedRouteName,
//     trips,
//     getTicketsByDateRange,
//     activePeriod,
//     getPassengerAndVehicleSeries,

//     // ==========================================================================
//     portPending,
//     portsPending,
//     usersPending,
//     portRoutesPending,
//     routesPending,
//     passengerTypesPending,
//     cargoTypesPending,
//     conveyancesPending,
//     ticketsPending,
//     cargoCategoriesPending,

//   }
// })

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(usePortAdminStore, import.meta.hot))
// }
