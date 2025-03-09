export class TripInstance implements Trip {
  constructor(data: Trip) {
    this.type = data.type
    this.schedule = data.schedule ? new TimeScheduleInstance(data.schedule) : undefined
    this.route = new RouteInstance(data.route)
    // this.passengers = data.passengers?.map((passenger) => new PassengerInstance(passenger)) ?? []
    this.departure = new Date(data.departure)
    // this.cargos = data.cargos?.map((cargo) => new CargoInstance(cargo)) ?? []
    this.company = data.company ? new CompanyInstance(data.company) : undefined
    this.duration = new DurationInstance(data?.duration ?? { hours: 1 })
    this.arrival = data.arrival ? new Date(data.arrival) : undefined
    this.status = data.status
    this.conveyance = data.conveyance ? new ConveyanceInstance(data.conveyance) : undefined
    this.number = data.number
    this.tickets = data.tickets?.map(i => new TicketInstance(i)) ?? []
    this.active = data.active ?? false
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.index = data.index
    this.description = data.description
    this.company = data?.company ? new CompanyInstance(data.company) : undefined
    this.id = data.id
  }

  type: TripType
  active?: boolean
  description?: string
  // time: TimeScheduleInstanceType
  route: RouteInstanceType
  tickets: TicketInstanceType[]
  // passengers: PassengerInstanceType[]
  // cargos: CargoInstanceType[]
  departure: Date
  schedule?: TimeScheduleInstanceType

  company?: CompanyInstanceType

  duration?: DurationInstanceType
  arrival?: Date
  status?: TripStatus
  conveyance?: ConveyanceInstanceType // vessel
  number?: string // voyageNo
  id?: string
  // tickets?: Ticket[]
  createdAt?: Date
  updatedAt?: Date
  index?: number

  //  toSchema(initialValues?: TripSchemaType): TripSchemaType {
  //   return {
  //     type: initialValues?.type ?? this.type,
  //     schedule: initialValues?.schedule ?? this.schedule,
  //     route: initialValues?.route ?? this.route,
  //     departure: initialValues?.departure ?? this.departure,
  //     duration: initialValues?.duration ?? this.duration,
  //     arrival: initialValues?.arrival ?? this.arrival,
  //     status: initialValues?.status ?? this.status,
  //     conveyance: initialValues?.conveyance ?? this.conveyance,
  //     number: initialValues?.number ?? this.number ?? '',
  //     active: initialValues?.active ?? false,
  //     id: initialValues?.id ?? this.id ?? this.generateId(),
  //   }

  toSchema(newVal?: Trip): TripSchemaType {
    return {
      company: newVal?.company ? new CompanyInstance(newVal?.company).stripUpdatedAt() : this.company?.stripUpdatedAt(),
      type: newVal?.type ?? this.type,
      schedule: newVal?.schedule ? new TimeScheduleInstance(newVal?.schedule) : undefined,
      route: newVal?.route ? new RouteInstance(newVal?.route) : this.route,
      departure: newVal?.departure ?? this.departure,
      // passengers: newVal?.passengers?.map((passenger) => new PassengerInstance(passenger)) ?? this.passengers?.map((p) => p.stripUpdatedAt()),
      // cargos: newVal?.cargos?.map((cargo) => new CargoInstance(cargo)) ?? this.cargos?.map((c) => c.stripUpdatedAt()),
      tickets: newVal?.tickets?.map(i => new TicketInstance(i).stripUpdatedAt()) ?? [],
      duration: newVal?.duration ? new DurationInstance(newVal?.duration) : this.duration,
      arrival: newVal?.arrival ?? this.arrival,
      status: newVal?.status ?? this.status,
      conveyance: newVal?.conveyance ? new ConveyanceInstance(newVal?.conveyance).stripUpdatedAt() : this.conveyance?.stripUpdatedAt(),
      number: newVal?.number ?? this.number ?? '',
      active: newVal?.active ?? false,
      description: newVal?.description ?? this.description,
      id: newVal?.id ?? this.id
    }
  }

  toPassengerPDFRows = (): string[][] => {
    return PassengerInstance.toPDFRows(this.toPassengers())
  }

  toCargoPDFRows = (): string[][] => {
    return CargoInstance.toPDFRows(this.toCargos())
  }

  toPassengers = (): Passenger[] => {
    return this.tickets.flatMap(ticket => ticket.toPassengers())
  }

  toCargos = (): Cargo[] => {
    return this.tickets.flatMap(ticket => ticket.toCargos())
  }

  // static fromCompound(data: TripCompound): TripInstance {
  //   return new TripInstance({
  //     type: 'sea',
  //     schedule: TimeScheduleInstance.none,
  //     route: new RouteInstance(data.route),
  //     passengers: data.passengers.map((passenger) => new PassengerInstance(passenger)),
  //     departure: new Date(data.departure),
  //     cargos: data.cargos.map((cargo) => new CargoInstance(cargo)),
  //     duration: new DurationInstance(data.duration ?? { hours: 1 }),
  //     // arrival: new Date(data.arrival),
  //     status: data.status,
  //     conveyance: data.conveyance ? new ConveyanceInstance(data.conveyance) : undefined,
  //     number: data.number ?? '',
  //     id: data.id,
  //   })
  // }
  static capacityByDateRange = (tickets: Ticket[], routes: Route[], selectedRoutes: Route[], date1: Date, date2: Date): TripCapacity => {
    const dates = useDate().between_dates(date1, date2)
    let cargoCount = 0
    let passengerCount = 0
    let cargoAllocation = 0
    let passengerAllocation = 0
    let filteredTickets: Ticket[] = tickets
    // let scheduleCount = 0
    // const schedules: TimeSchedule[] = []

    const myRoutes = selectedRoutes.length ? selectedRoutes : routes
    // console.log('🚀 ~ //toSchema ~ myRoutes Capacity:', myRoutes?.[0]?.capacity)

    dates.forEach((date) => {
      myRoutes.forEach((route) => {
        const dateActiveSchedule = TimeScheduleInstance.activeSchedules(route.schedules, date)
        dateActiveSchedule.forEach((_schedule) => {
          passengerAllocation += route.capacity?.passenger ?? 0
          cargoAllocation += route.capacity?.cargo ?? 0
        })
        // scheduleCount += dateActiveSchedule.length
      })
    })

    filteredTickets = tickets.filter(ticket => myRoutes.some(r => r.id === ticket.route.id))

    filteredTickets.forEach((ticket) => {
      passengerCount += ticket.passengers.length
      cargoCount += ticket.cargos.length
    })

    const capacity = {
      cargo: {
        percent: (cargoCount / cargoAllocation) * 100,
        max: cargoAllocation,
        current: cargoCount
      },
      passenger: {
        percent: (passengerCount / passengerAllocation) * 100,
        max: passengerAllocation,
        current: passengerCount
      }
    }
    // console.log('🚀 ~ //toSchema ~ capacity:', capacity)
    return capacity
    // const trips = filteredTickets.map((ticket) => ({
    //   capacity: {
    //     cargo: {
    //       percent: (cargoCount / cargoAllocation) * 100,
    //       max: cargoAllocation,
    //       current: cargoCount,
    //     },
    //     passenger: {
    //       percent: (passengerCount / passengerAllocation) * 100,
    //       max: passengerAllocation,
    //       current: passengerCount,
    //     },
    //   },
    // }))

    // trips.forEach((trip) => {
    //   totalTripCapacity.cargo.percent += trip.capacity.cargo.percent
    //   totalTripCapacity.cargo.max += trip.capacity.cargo.max
    //   totalTripCapacity.cargo.current += trip.capacity.cargo.current
    //   totalTripCapacity.passenger.percent += trip.capacity.passenger.percent
    //   totalTripCapacity.passenger.max += trip.capacity.passenger.max
    //   totalTripCapacity.passenger.current += trip.capacity.passenger.current
    // })
    // return totalTripCapacity
  }

  static convertCompound = (compound: TripCompound): Trip => {
    return {
      type: 'sea',
      id: compound?.id,
      departure: compound?.departure,
      schedule: compound?.schedule,
      arrival: compound?.arrival,
      status: compound?.status,
      route: compound?.route,
      // passengers: compound?.passengers,
      // cargos: compound?.cargos,
      tickets: compound?.tickets,
      duration: compound?.duration,
      company: compound?.company
    }
  }

  toJson() {
    return JSON.parse(JSON.stringify(this))
  }

  companyReference = () => {
    const companyId = useUserStore().companyId
    if (!companyId) return undefined
    return useCompanyReference(companyId)
  }

  toFirestore() {
    return {
      id: this.id,
      departure: this.departure,
      schedule: this.schedule,
      route: this.route,
      number: this.number,
      tickets: this.tickets,
      // passengers: this.passengers,
      // cargos: this.cargos,
      description: this.description,
      duration: this.duration,
      conveyance: this.conveyance,
      type: this.type,
      status: this.status,
      arrival: this.arrival
    }
  }

  static merge = (oldVal: Trip, newVal: Trip): Trip => {
    return {
      // ...oldVal,
      // ...newVal,
      number: newVal.number ?? oldVal.number,
      id: newVal.id ?? oldVal.id,
      departure: newVal.departure ?? oldVal.departure,
      arrival: newVal.arrival ?? oldVal.arrival,
      type: newVal.type ?? oldVal.type,
      schedule: newVal.schedule ?? oldVal.schedule,
      company: newVal.company ?? oldVal.company,
      route: newVal.route ?? oldVal.route,
      // passengers: newVal.passengers ?? oldVal.passengers,
      // cargos: newVal.cargos ?? oldVal.cargos,
      tickets: newVal.tickets ?? oldVal.tickets ?? [],
      duration: newVal.duration ?? oldVal.duration,
      conveyance: newVal.conveyance ?? oldVal.conveyance
    }
  }

  generateId(): string {
    const departureDate = new Date(this.departure)
    const year = departureDate.getFullYear()
    const month = String(departureDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(departureDate.getDate()).padStart(2, '0')
    let hours = departureDate.getHours()
    const minutes = String(departureDate.getMinutes()).padStart(2, '0')
    const seconds = String(departureDate.getSeconds()).padStart(2, '0')
    const amPm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0')
    return `${this.route?.id}-${year}-${month}-${day}-${formattedHours}-${minutes}-${seconds}-${amPm}`
  }

  static generateId(trip: Trip): string {
    return new TripInstance(trip).generateId()
  }

  static toTableRows = (items: Trip[]): TableRow<Trip>[] => {
    const format = useFormat()
    return items.map(i => TripInstance.mapToTableRow(i, format))
  }

  static instancesToTableRows = (trips?: TripInstance[]): TableRow<Trip>[] => {
    return trips?.map(i => i.toTableRow()) ?? []
  }

  static mapToTableRow = (data: Trip, format = useFormat()): TableRow<Trip> => {
    return {
      id: format.str_empty(data.id),
      company: format.company(data.company),
      route: format.route(data.route),
      type: format.str_empty(data.type),
      departure: format.datetime(data.departure),
      number: format.str_empty(data.number),
      arrival: format.datetime(data.arrival),
      tickets: format.count(data.tickets),
      status: format.str_empty(data.status),
      schedule: format.schedule(data.schedule),
      active: format.str_bool(data.active),
      conveyance: format.str_empty(data.conveyance?.name),
      duration: format.duration(data.duration),
      createdAt: format.datetime(data.createdAt),
      updatedAt: format.datetime(data.updatedAt),
      description: format.str_empty(data.description),
      index: format.index(data.index)
    }
  }

  toTableRow = (): TableRow<Trip> => {
    return TripInstance.mapToTableRow(this)
  }
}
