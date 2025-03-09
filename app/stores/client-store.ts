import { startOfDay, endOfDay, isSameDay, sub, subDays } from 'date-fns'

import { defineStore } from 'pinia'

interface Sales {
  total: number
  subtotal: number
}

export const useClientStore = defineStore('client-store', () => {
  const log = useLogger()
  const disabled = ref(false)
  // const dev = useDevMode()
  const maxRefDepth: number = 0
  const userStore = useUserStore()
  const devMode = computed(() => userStore.devMode)
  const isAdminUser = computed(() => !!userStore?.user?.admin)
  // const allowedDevMode = computed(() => dev.mode.value && import.meta.env.DEV)
  const companyId = computed(() => userStore.user?.company?.id)
  const hasAccess = computed(() => {
    const allowed = userStore.userRole === 'company-admin'
      && companyId.value
      && !isAdminUser.value
      && !disabled.value
    // log.i('CLIENT_STORE: ACCESS:', allowed)
    return !!allowed
  })
  // watch(hasAccess, (ac) => {
  //   log.i('CLIENT_STORE: HAS ACCESS', ac)
  // })

  const firestore = reactive(useFirestoreRepo(devMode.value))
  const databaseName = computed(() => (firestore.db as any)?._databaseId?.database?.toString())
  const storage = useStorageRepo()
  const filter = useFilter()
  const routesCount = ref<number>(0)

  const { convertReferenceSnapshotObjects: convertToNative } = useUtils()

  const selectedRoute = computed<Route | undefined>(() => {
    const rt = routes.value.find(route => route.id === selectedRouteId.value)
    if (rt) {
      const { updatedAt, createdAt, ...rest } = rt
      return rest
    }
    return undefined
  })

  const selectedRouteId = ref<string>('')
  const selectedRouteDate = ref('')

  const sales = ref<Sales>({
    total: 0,
    subtotal: 0
  })

  // ========================================

  const dateRange = ref<DateRange>({ start: startOfDay(sub(new Date(), { days: 14 })), end: endOfDay(new Date()) })

  const $reset = () => {
    ticketsData.value = []
    // routes.value = []
    ports.value = []
    users.value = []
    // conveyances.value = []
    // tripCancellations.value = []
    cargoTypes.value = []
    cargoTypeCategories.value = []
    cargoTypeClasses.value = []
    cargoTypeFootprints.value = []
    notices.value = []
    passengerTypes.value = []
    passengerTypeClasses.value = []
    trips.value = []
    dateRange.value = { start: sub(new Date(), { days: 7 }), end: new Date() }
  }

  const company_reference = computed(() => hasAccess.value ? useCompanyReference(companyId.value!, devMode.value) : null)
  const company_repo = computed(() => hasAccess.value ? useCompanyRepo(companyId.value ?? 'no_company_id', devMode.value) : null)

  const company = computed(() => userStore.user?.company)

  const routesSource = computed(() => hasAccess.value ? company_reference.value?.routes_query() : null)
  const { data: routesData, pending: routesPending } = useCollection<Route>(routesSource, { maxRefDepth })
  const routes = computed<Route[]>(() => routesData.value?.map(i => convertToNative(i)) ?? [])

  const portsSource = computed(() => hasAccess.value ? company_reference.value?.ports_query() : null)
  const { data: ports, pending: portsPending } = useCollection<Port>(portsSource, { maxRefDepth })

  const usersSource = computed(() => hasAccess.value ? company_reference.value?.users() : null)
  const { data: users, pending: usersPending } = useCollection<UserCompanyData>(usersSource, { maxRefDepth })

  const passengerTypesSource = computed(() => hasAccess.value ? company_reference.value?.passenger_types() : null)
  const { data: passengerTypes, pending: passengerTypesPending } = useCollection<PassengerType>(passengerTypesSource, { maxRefDepth })

  const cargoTypesSource = computed(() => hasAccess.value ? company_reference.value?.cargo_types() : null)
  const { data: cargoTypes, pending: cargoTypesPending } = useCollection<CargoType>(cargoTypesSource, { maxRefDepth })

  const conveyancesSource = computed(() => hasAccess.value ? company_reference.value?.conveyances() : null)
  const { data: conveyancesData, pending: conveyancesPending } = useCollection<Conveyance>(conveyancesSource, { maxRefDepth })
  const conveyances = computed(() => conveyancesData.value?.map(i => convertToNative(i)) ?? [])

  const tripCancellationsSource = computed(() => hasAccess.value ? company_reference.value?.trip_cancellations_query() : null)
  const { data: tripCancellationsData, pending: tripCancellationsPending } = useCollection<TripCancellation[]>(tripCancellationsSource, { maxRefDepth: 1 })
  const tripCancellations = computed(() => tripCancellationsData.value?.map(i => convertToNative(i)) ?? [])

  const ticketsSource = computed(() => hasAccess.value ? company_reference.value?.tickets_query(dateRange.value) : null)
  const { data: ticketsData, pending: ticketsPending } = useCollection<Ticket>(ticketsSource, { maxRefDepth })
  const tickets = computed(() => ticketsData.value?.map(t => convertToNative(t)) ?? [])

  const cargoTypeCategoriesSource = computed(() => hasAccess.value ? company_reference.value?.cargo_type_categories() : null)

  const { data: cargoTypeCategories, pending: cargoTypeCategoriesPending } = useCollection<CargoTypeCategory>(cargoTypeCategoriesSource, { maxRefDepth })

  const cargoTypeClassesSource = computed(() => hasAccess.value ? company_reference.value?.cargo_type_classes() : null)
  const { data: cargoTypeClasses, pending: cargoTypeClassesPending } = useCollection<CargoTypeClass>(cargoTypeClassesSource, { maxRefDepth })

  const cargoTypeFootprintsSource = computed(() => hasAccess.value ? company_reference.value?.cargo_type_footprints() : null)
  const { data: cargoTypeFootprints, pending: cargoTypeFootprintsPending } = useCollection<CargoTypeFootprint>(cargoTypeFootprintsSource, { maxRefDepth })

  const noticesSource = computed(() => hasAccess.value ? company_reference.value?.notices_query() : null)
  const { data: notices, pending: noticesPending } = useCollection<Notice>(noticesSource, { maxRefDepth })

  const passengerTypeClassesSource = computed(() => hasAccess.value ? company_reference.value?.passenger_type_classes() : null)
  const { data: passengerTypeClasses, pending: passengerTypeClassesPending } = useCollection<PassengerTypeClass>(passengerTypeClassesSource, { maxRefDepth })

  const tripsSource = computed(() => hasAccess.value ? company_reference.value?.trips_query() : null)
  const { data: trips, pending: tripsPending } = useCollection<Trip>(tripsSource, { maxRefDepth })

  const ticketUsers = ref<User[]>([])

  const passengers = computed<Passenger[]>(() => {
    return TicketInstance.toPassengers(tickets.value)
  })

  const cargos = computed<Cargo[]>(() => {
    return TicketInstance.toCargos(tickets.value)
  })

  const totalConvenienceFee = computed(() => {
    const total = tickets.value.reduce((acc, ticket) => acc + ticket.total, 0)
    const subTotal = tickets.value.reduce((acc, ticket) => acc + ticket.subtotal, 0)
    return total - subTotal
  })

  debouncedWatch(routes, (routeList) => {
    if (selectedRouteId.value === '' && routeList.length > 0) {
      selectedRouteId.value = filter.active(routeList)?.[0]?.id ?? ''
    }
  }, { debounce: 1000 })

  debouncedWatch(tickets, (ticketsValue) => {
    sales.value = {
      total: 0,
      subtotal: 0
    }

    const usersTemp: User[] = []
    ticketsValue.forEach((ticket: Ticket) => {
      if (ticket.payment && ticket.payment.date && ticket.usedAt) {
        sales.value.total += ticket.total
        sales.value.subtotal += ticket.subtotal
      }
      if (ticket.user)
        usersTemp.push(ticket.user)
    })

    const usersTemp2 = usersTemp.filter((user: User, index: number) => {
      return usersTemp.findIndex((item: User) => item.id === user.id) === index
    })
    ticketUsers.value = usersTemp2
  }, { debounce: 1000 })

  const getTicketPassengerTypes = () => {
    const passengerTypeStats: { [key: string]: number } = {}

    tickets?.value?.forEach((ticket: any) => {
      ticket?.passengerList?.forEach((passenger: any) => {
        const typeName = passenger?.type?.name
        if (typeName) {
          if (passengerTypeStats[typeName]) {
            passengerTypeStats[typeName]++
          } else
            passengerTypeStats[typeName] = 1
        }
      })
    })
    return passengerTypeStats
  }

  const addCompanyCargoCategory = async (companyId: string, data: CargoTypeCategory) => {
    return await firestore.addCompanyCargoCategory(companyId, data)
  }

  const deleteCargoCategory = async (companyId: string, id: string) => {
    return await firestore.deleteCargoCategory(companyId, id)
  }

  const deletePassengerTypeClass = async (id: string) => {
    return await firestore.deletePassengerTypeClass(companyId.value!, id)
  }

  const getTicketFromStore = (ticketId: string) => {
    return tickets.value.find((ticket: Ticket) => ticket.id === ticketId)
  }

  const updateCompanyInfo = async (data: Partial<Company>, image?: File) => {
    try {
      const companyId = company.value?.id
      if (!companyId)
        return
      if (image) {
        if (company.value?.image)
          await storage.deleteCompanyImage(company.value?.image)

        const imageUrl = await storage.uploadCompanyImage(companyId, image)
        data.image = imageUrl ?? null
      }
      await firestore.updateCompanyInfo(companyId, data)
    } catch (error) {
      log.e('Company info update failed', error)
    }
  }

  const selectedRouteName = computed((): string => {
    if (!selectedRoute.value)
      return 'route'
    return (
      `${selectedRoute.value?.origin?.name ?? 'Origin'
      } - ${
        selectedRoute.value?.destination?.name ?? 'Destination'}`
    )
  })

  const passengerCount = computed(() => {
    return 0
    // return modifiedTickets.value?.reduce((acc, ticket) => acc + ticket.passengers.length, 0) ?? 0
  })

  const activePeriod = ref<TimelyPeriod>('week')

  const optionRoutes = computed(() => {
    const rts = useMap().optionsFromRoutes(routes.value)
    selectedRouteId.value = rts[0]?.value ?? ''
    selectedRouteDate.value = new Date().toLocaleDateString()

    return rts
  })

  const tripCompounds = computed((): TripCompound[] => {
    return useCompound().trips_route(tickets.value, routes.value, selectedRoute.value, new Date())
  })

  const getTicketsByDateRange = (
    startDate: Date = subDays(new Date(), 7),
    endDate: Date = new Date()
  ): Ticket[] => {
    return tickets.value.filter((ticket: Ticket) => {
      const ticketDate = ticket.departure!
      return ticketDate >= startDate && ticketDate <= endDate
    })
  }

  const getPassengerAndVehicleSeries = (
    startDate: Date = subDays(new Date(), 7),
    endDate: Date = new Date()
  ): { passengers: number[], vehicles: number[] } => {
    const dates = useDate().getDatesBetween(startDate, endDate)
    const passengers: number[] = []
    const vehicles: number[] = []

    dates.forEach((date) => {
      const tickets = getTicketsByDepartureDate(date)
      let passengerCount = 0
      let vehicleCount = 0
      tickets.forEach((ticket: Ticket) => {
        passengerCount += ticket.passengers.length
        vehicleCount += ticket.cargos.length
      })

      passengers.push(passengerCount)
      vehicles.push(vehicleCount)
    })

    return {
      passengers,
      vehicles
    }
  }

  const getTicketsByUsedAt = (date: Date): Ticket[] => {
    return tickets.value?.filter((ticket: Ticket) => {
      return isSameDay(ticket.usedAt as Date, date)
    })
  }

  const getTicketsByDepartureDate = (date: Date): Ticket[] => {
    return tickets.value?.filter((ticket: Ticket) => {
      return isSameDay(ticket.departure as Date, date)
    })
  }

  const createCompanyPort = async (data: Port) => {
    if (!companyId.value) return
    return await firestore.createCompanyPort(companyId.value!, data)
  }

  const submitPort = async (data: Port | Port[]) => {
    try {
      if (!companyId.value) return // throw exception
      console.log('submitPort 2', companyId.value, data)
      console.log('submitPort DB name:', databaseName.value)

      return await company_repo.value?.submitPort(data)
    } catch (e) {
      log.e('submitPort error:', e)
    }
  }

  const deletePort = async (portIds: string[]) => {
    if (!companyId.value) return
    return await company_repo.value?.deletePort(portIds)
  }

  const deleteNotice = async (portIds: string[]) => {
    if (!companyId.value) return
    return await company_repo.value?.deleteNotice(portIds)
  }

  const toggleActivePort = async (id: string | string[], active: boolean) => {
    if (!companyId.value) return
    return await company_repo.value?.toggleActivePort(id, active)
  }
  const toggleActivePassengerTypeClass = async (id: string | string[], active: boolean) => {
    if (!companyId.value) return
    return await company_repo.value?.toggleActivePassengerTypeClass(id, active)
  }

  const toggleActiveNotice = async <T extends string>(id: T | T[], active: boolean) => {
    if (!companyId.value) return
    return await company_repo.value?.toggleActiveNotice(id, active)
  }

  const submitTripCancellation = async <T extends TripCancellation>(data: T | T[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitTripCancellation(data)
  }

  const toggleActiveTripCancellation = async <T extends TripCancellation>(data: T | T[], active: boolean) => {
    if (!companyId.value) return
    return await company_repo.value?.toggleActiveTripCancellation(data, active)
  }

  const deleteTripCancellation = async (ids: string | string[]) => {
    if (!companyId.value) return
    return await company_repo.value?.deleteTripCancellation(ids)
  }

  const submitRoute = async (data: Route | Route[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitRoute(data)
  }

  const deleteRoute = async (ids: string | string[]) => {
    if (!companyId.value) return
    return await company_repo.value?.deleteRoute(ids)
  }

  const toggleActiveRoute = async (id: string | string[], active: boolean) => {
    if (!companyId.value) return
    return await company_repo.value?.toggleActiveRoute(id, active)
  }

  const submitNotice = async (data: Notice | Notice[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitNotice(data)
  }
  const submitCargoType = async (data: CargoType | CargoType[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitCargoType(data)
  }
  const submitCargoTypeCategory = async (data: CargoTypeCategory | CargoTypeCategory[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitCargoTypeCategory(data)
  }
  const submitCargoTypeFootprint = async (data: CargoTypeFootprint | CargoTypeFootprint[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitCargoTypeFootprint(data)
  }
  const submitCargoTypeClass = async (data: CargoTypeClass | CargoTypeClass[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitCargoTypeClass(data)
  }
  const submitPassengerType = async (data: PassengerType | PassengerType[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitPassengerType(data)
  }
  const submitPassengerTypeClass = async (data: PassengerTypeClass | PassengerTypeClass[]) => {
    if (!companyId.value) return
    console.log('submitPassengerTypeClass 2', data)
    return await company_repo.value?.submitPassengerTypeClass(data)
  }

  const submitTrip = async (data: Trip | Trip[]) => {
    if (!companyId.value) return
    return await company_repo.value?.submitTrip(data)
  }

  const ticketRows = computed(() => TicketInstance.toTableRows(tickets.value))
  const routeRows = computed(() => RouteInstance.toTableRows(routes.value))
  const portRows = computed(() => PortInstance.toTableRows(ports.value))
  const noticeRows = computed(() => NoticeInstance.toTableRows(notices.value))
  const conveyanceRows = computed(() => ConveyanceInstance.toTableRows(conveyances.value))
  const passengerTypeRows = computed(() => PassengerTypeInstance.toTableRows(passengerTypes.value))
  const tripCancellationRows = computed(() => TripCancellationInstance.toTableRows(tripCancellations.value))
  const cargoTypeRows = computed(() => CargoTypeInstance.toTableRows(cargoTypes.value))
  const tripRows = computed(() => TripInstance.toTableRows(trips.value))

  const passengerTypeClassRows = computed(() => PassengerTypeClassInstance.toTableRows(passengerTypeClasses.value))
  const cargoTypeClassRows = computed(() => CargoTypeClassInstance.toTableRows(cargoTypeClasses.value))

  const passengerRows = computed(() => PassengerInstance.toTableRows(passengers.value))
  const cargoRows = computed(() => CargoInstance.toTableRows(cargos.value))

  // HELPERS
  const findPort = (name?: string) => {
    if (!name) return undefined
    return ports.value?.find(port => port.name?.trim().toLowerCase() === name?.trim()?.toLowerCase())
  }

  const findRoute = (route?: Route) => {
    if (!route || !route.origin?.id || !route.destination?.id) return undefined
    return routes.value?.find(r => r.origin?.id === route.origin?.id && r.destination?.id === route?.destination?.id)
  }

  const portExists = (name?: string): boolean => !!findPort(name)

  const deleteRecord = company_repo.value?.deleteRecord

  return {
    deleteRecord,
    deletePassengerTypeClass,
    toggleActivePassengerTypeClass,
    passengerTypeClassRows,
    cargoTypeClassRows,
    $reset,
    findPort,
    findRoute,
    portExists,
    ticketCount: ticketsData.value.length,
    devMode,
    disabled,
    ticketsData,
    hasAccess,
    isAdminUser,
    companyId,
    ticketsSource,
    passengerRows,
    cargoRows,
    tripRows,
    cargoTypeRows,
    tripCancellationRows,
    passengerTypeRows,
    conveyanceRows,
    noticeRows,
    portRows,
    ticketRows,
    routeRows,
    dateRange,
    tickets,
    passengers,
    totalConvenienceFee,
    toggleActiveNotice,
    deleteNotice,
    submitTrip,
    submitPassengerType,
    submitPassengerTypeClass,
    submitCargoTypeClass,
    submitCargoTypeFootprint,
    submitCargoTypeCategory,
    submitCargoType,
    submitNotice,
    toggleActivePort,
    deleteRoute,
    submitPort,
    submitRoute,
    toggleActiveTripCancellation,
    deleteTripCancellation,
    submitTripCancellation,
    createCompanyPort,
    updateCompanyInfo,
    ticketsPending,

    routes,
    ports,
    users,

    conveyances,
    ticketUsers,

    getTicketFromStore,
    routesCount,

    deletePort,

    getTicketPassengerTypes,
    addCompanyCargoCategory,
    deleteCargoCategory,

    company,
    sales,

    tripCancellations,
    tripCancellationsPending,

    portsPending,

    usersPending,
    routesPending,

    conveyancesPending,

    optionRoutes,
    passengerCount,
    selectedRouteDate,
    selectedRouteId,
    selectedRoute,
    selectedRouteName,
    tripCompounds,
    getTicketsByDateRange,
    activePeriod,
    getPassengerAndVehicleSeries,

    getTicketsByUsedAt,
    getTicketsByDepartureDate,

    passengerTypes,
    cargoTypes,
    cargoTypeCategories,

    notices,
    noticesPending,

    trips,
    tripsPending,
    cargos,
    passengerTypesPending,
    cargoTypesPending,
    cargoTypeCategoriesPending,
    cargoTypeClasses,
    cargoTypeClassesPending,
    cargoTypeFootprints,
    cargoTypeFootprintsPending,
    passengerTypeClasses,
    passengerTypeClassesPending,
    toggleActiveRoute
  }
}
)

//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
}
