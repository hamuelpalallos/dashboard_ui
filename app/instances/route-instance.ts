import { v4 as uuidv4 } from 'uuid'

export class RouteInstance implements Route {
  constructor(data: Route) {
    this.id = data.id ?? ''
    this.origin = data?.origin ? new PortInstance(data.origin) : undefined
    this.destination = data?.destination ? new PortInstance(data.destination) : undefined
    this.duration = data.duration ? new DurationInstance(data.duration) : new DurationInstance({ hours: 1 })
    this.capacity = data.capacity ? new RouteCapacityInstance(data.capacity) : new RouteCapacityInstance({ cargo: 0, passenger: 0, cargoTypeFootprints: [] })
    this.passengerTypeClasses = data.passengerTypeClasses?.map(i => new RoutePassengerTypeClassInstance(i)) ?? []
    this.cargoTypeClasses = data.cargoTypeClasses?.map(i => new RouteCargoTypeClassInstance(i)) ?? []
    this.schedules = data.schedules?.map(i => new TimeScheduleInstance(i)) ?? []
    this.index = data.index ?? 0
    this.active = data.active ?? false
    this.duration = data.duration ? new DurationInstance(data.duration) : new DurationInstance({ hours: 1 })
    this.description = data.description ?? ''
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  id: string
  origin?: PortInstanceType
  destination?: PortInstanceType
  capacity: RouteCapacityInstance
  passengerTypeClasses: RoutePassengerTypeClassInstance[]
  cargoTypeClasses: RouteCargoTypeClassInstance[]
  schedules: TimeScheduleInstanceType[]
  duration: DurationInstanceType
  createdAt?: Date
  updatedAt?: Date
  deleted?: DeletedData
  active: boolean
  index: number
  description: string

  get name() {
    return `${this.origin?.name} → ${this.destination?.name}`
  }

  static getName(route: Route): string {
    return `${route.origin?.name} → ${route.destination?.name}`
  }

  static toTableRows = (routes: Route[]): TableRow<Route>[] => {
    return routes.map(i => new RouteInstance(i).toTableRow())
  }

  toTableRow = (): TableRow<Route> => {
    const format = useFormat()

    return {
      id: format.str_empty(this.id),
      origin: format.port(this.origin?.toJson()),
      destination: format.port(this.destination),
      active: format.str_bool(this.active),
      capacity: format.route_capacity(this.capacity),
      passengerTypeClasses: format.count(this.passengerTypeClasses),
      cargoTypeClasses: format.count(this.cargoTypeClasses),
      // trips: format.count(this.trips),
      schedules: format.schedules(this.schedules),
      createdAt: format.datetime(this.createdAt),
      updatedAt: format.datetime(this.updatedAt),
      description: format.str_empty(this.description),
      duration: format.duration(this.duration),
      index: format.index(this.index)
    }
  }

  // schema = () => RouteSchema

  getSchemaInitialValues = (): RouteSchemaType => {
    return {
      id: '',
      origin: undefined,
      destination: undefined,
      index: 0,
      active: true,
      duration: undefined,
      passengerTypeClasses: [],
      cargoTypeClasses: [],
      // trips: [],
      schedules: [],
      description: undefined,
      capacity: new RouteCapacityInstance({
        cargo: 10,
        passenger: 20,
        cargoTypeFootprints: []
      })
    }
  }

  toSchema(): RouteSchemaType {
    return {
      id: this.id!,
      duration: this.duration,
      origin: this.origin,
      destination: this.destination,
      index: this.index,
      active: this.active,
      passengerTypeClasses: this.passengerTypeClasses?.map(i => i.toSchema()),
      cargoTypeClasses: this.cargoTypeClasses?.map(i => i?.toSchema()),
      schedules: this.schedules,
      description: this.description,
      capacity: this.capacity?.toSchema()
    }
  }

  static schemaToJson(schema: RouteSchemaType): Route {
    return {
      id: schema.id,
      duration: schema.duration?.toJson(),
      origin: schema.origin?.toJson(),
      destination: schema.destination?.toJson(),
      index: schema.index,
      active: schema.active,
      passengerTypeClasses: schema.passengerTypeClasses.map(i => i.toJson()),
      cargoTypeClasses: schema.cargoTypeClasses?.map(i => i.toJson()),
      schedules: schema.schedules?.map(i => i.toJson()),
      description: schema.description,
      capacity: schema.capacity
    }
  }

  toJson(): Route {
    const json = JSON.parse(JSON.stringify(this))
    json.duration = this.duration?.toJson()
    return json
  }

  toFirestore = (): RouteFirestore | undefined => {
    const userStore = useUserStore()
    const company_reference = userStore.companyReference
    if (!company_reference) return undefined
    const jsonFirestore: RouteFirestore = {
      active: this.active,
      origin: this.origin,
      destination: this.destination,
      originReference: this?.origin?.id ? company_reference.port(this?.origin.id) : undefined,
      destinationReference: this?.origin?.id ? company_reference.port(this.destination!.id!) : undefined,
      index: this?.index ?? 0,
      capacity: this.capacity?.toFirestore(),
      passengerTypeClasses: this?.passengerTypeClasses?.map(i => i.toFirestore()) ?? [],
      cargoTypeClasses: this?.cargoTypeClasses?.map(i => i.toFirestore()) ?? [],
      schedules: this?.schedules.sort((a, b) => {
        if (a.time.hours !== b.time.hours) {
          return a.time.hours - b.time.hours
        }
        if (a.time.minutes !== b.time.minutes) {
          return a.time.minutes - b.time.minutes
        }
        return a.time.seconds - b.time.seconds
      })?.map(i => i.toFirestore()) ?? [],
      duration: this.duration.toFirestore(),
      description: this?.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return jsonFirestore
  }

  companyReference = () => {
    const companyId = useUserStore().companyId
    if (!companyId) return undefined
    return useCompanyReference(companyId)
  }

  toReference(): DocReference | undefined {
    // return undefined
    return this.id ? this.companyReference()?.route(this.id) : undefined
  }

  toForm = (): RouteForm => {
    const map = useMap()
    return {
      id: this.id,
      active: this.active ?? false,
      origin: map.reference_id(this.origin),
      destination: map.reference_id(this.destination),
      index: this.index,
      capacity: this.capacity!,
      passengerTypeClasses: this.passengerTypeClasses ?? [],
      cargoTypeClasses: this.cargoTypeClasses ?? [],

      // trips: this.trips,
      schedules: this.schedules,
      duration: this.duration?.inMicroseconds ?? new DurationInstance({ hours: 1 }).inMicroseconds,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  static toForms = (routes: Route[]): RouteForm[] => {
    return routes.map(i => new RouteInstance(i).toForm())
  }

  // stripUpdatedAt = (shallow = false) => {
  //   const { updatedAt, ...rest } = this
  //   if (!shallow) {
  //     rest.origin = this.origin?.stripUpdatedAt()
  //     rest.destination = this.destination?.stripUpdatedAt()
  //     rest.capacity = this.capacity?.stripUpdatedAt()
  //     rest.passengerTypeClasses = this.passengerTypeClasses.map(i => i.stripUpdatedAt(shallow))
  //     rest.cargoTypeClasses = this.cargoTypeClasses.map(i => i.stripUpdatedAt(shallow))

  //     // rest.schedules = this.schedules.map((i) => i.stripUpdatedAt())
  //   }
  //   return new RouteInstance(rest)
  // }
}

export class RouteCapacityInstance implements RouteCapacity {
  constructor(data: RouteCapacity) {
    Object.assign(this, data)
    this.cargo = data.cargo ?? 0
    this.passenger = data.passenger ?? 0
    this.cargoTypeFootprints = data.cargoTypeFootprints?.map(i => new RouteCapacityFootprintInstance(i)) ?? []
  }

  cargoTypeFootprints: RouteCapacityFootprintInstance[]

  cargo: number
  passenger: number

  toSchema() {
    this.cargoTypeFootprints.map(i => i.toSchema())
    return this
  }

  toJson() {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore(): RouteCapacityFirestore {
    return {
      ...this.toJson() ?? { cargo: 0, passenger: 0 },
      cargoTypeFootprints: RouteCapacityFootprintInstance.toFirestores(this.cargoTypeFootprints)
    }
  }

  static toFirestores = (data: RouteCapacityInstance[]): RouteCapacityFirestore[] => {
    return data.map(i => i.toFirestore()) ?? []
  }

  stripUpdatedAt(shallow = false) {
    const { ...rest } = this
    rest.cargoTypeFootprints = this.cargoTypeFootprints.map(i => i.stripUpdatedAt(shallow))
    return new RouteCapacityInstance(rest)
  }
}

export class RoutePassengerTypeClassInstance implements RoutePassengerTypeClass {
  constructor(data?: Partial<RoutePassengerTypeClass>) {
    // Object.assign(this, data)
    // this.id = data.id

    this._key = uuidv4()
    this._class = new PassengerTypeClassInstance(data?.class ?? {})
    this.rate = data?.rate ?? 0
  }

  private readonly _key: string

  get key() {
    return this._key
  }

  // id: string
  get id() {
    return this.class.id
  }

  set class(v: PassengerTypeClassInstanceType) {
    // console.log('set passenger type class: ', v)
    if (this.rate === 0) {
      this.rate = v?.rate ?? 0
    }
    this._class = v
  }

  get class() {
    return this._class
  }

  rate: number
  private _class: PassengerTypeClassInstanceType

  toJson(): RoutePassengerTypeClass {
    return { ...JSON.parse(JSON.stringify(this)), id: this.id }
  }

  toSchema(): RoutePassengerTypeClassInstance {
    // const schema = this.toJson()
    this.rate ??= 0
    this.class = this.class.stripUpdatedAt()
    return this
  }

  toFirestore() {
    const company_reference = useUserStore().companyReference
    if (!company_reference) throw new Error('RoutePassengerTypeClassInstance: No company reference found')
    return {
      id: this.id,
      rate: this.rate,
      classSnapshot: this.class,
      classReference: company_reference.passenger_type_class(this.class.id)
    }
  }

  static toFirestores = (data: RoutePassengerTypeClassInstance[]) => {
    return data.map(i => i.toFirestore()) ?? []
  }

  // stripUpdatedAt(shallow = false) {
  //   const { ...rest } = this
  //   if (!shallow) {
  //     rest.class = this.class.stripUpdatedAt()
  //   }
  //   return new RoutePassengerTypeClassInstance(rest)
  // }
}

export class RouteCargoTypeClassInstance implements RouteCargoTypeClass {
  constructor(data?: Partial<RouteCargoTypeClass>) {
    // Object.assign(this, data)
    this._key = uuidv4()
    this._class = new CargoTypeClassInstance(data?.class ?? {})
    // this.id = data.id ?? ''
    this.rate = data?.rate ?? 0
  }

  private readonly _key: string

  get key() {
    return this._key
  }

  get id() {
    return this.class.id
  }

  set class(v: CargoTypeClassInstanceType) {
    if (this.rate === 0) {
      this.rate = v?.rate ?? 0
    }
    this._class = v
  }

  get class() {
    return this._class
  }

  rate: number
  private _class: CargoTypeClassInstanceType

  toJson() {
    return {
      ...JSON.parse(JSON.stringify(this)),
      id: this.id
    }
  }

  toSchema() {
    const schema = this.toJson()
    schema.rate = this.rate ?? 0
    schema.class = this.class
    return schema
  }

  toFirestore(): RouteCargoTypeClassFirestore {
    // const company_reference = useCompanyReference(companyId)
    const company_reference = useUserStore().companyReference
    if (!company_reference) throw new Error('RouteCargoTypeClassInstance: No company reference')
    return {
      id: this.id,
      rate: this.rate,
      class: this.class,
      classReference: company_reference.cargo_type_class(this.class.id)
    }
  }

  // stripUpdatedAt(shallow = false) {
  //   const { ...rest } = this
  //   if (!shallow) {
  //     rest.class = this.class.stripUpdatedAt()
  //   }
  //   return new RouteCargoTypeClassInstance(rest)
  // }
}

export class RouteCapacityFootprintInstance implements RouteCapacityFootprint {
  constructor(data: RouteCapacityFootprint) {
    // Object.assign(this, data)
    // this.id = data.id
    this._key = uuidv4()
    this.allocation = data.allocation
    this.footprint = new CargoTypeFootprintInstance(data.footprint!)
  }

  // how to create a key to this instance when created and will not change and readonly
  get key(): string {
    return this._key
  }

  get id() {
    return this.footprint?.id
  }

  private readonly _key: string
  allocation: number
  footprint: CargoTypeFootprintInstanceType

  toSchema() {
    const schema = this.toJson()
    schema.footprint = this.footprint
    return schema
  }

  toJson() {
    return {
      ...(JSON.parse(JSON.stringify(this))),
      id: this.id
    }
  }

  toFirestore(): RouteCapacityFootprintFirestore {
    const json = this.toJson()
    const userStore = useUserStore()
    const company_reference = userStore.companyReference
    if (!company_reference) throw new Error('RouteCapacityFootprintFirestore: No company reference')
    return {
      id: json.id,
      allocation: json.allocation,
      footprintReference: company_reference.cargo_type_footprint(json.footprint.id),
      footprintSnapshot: this.footprint?.toFirestore()
    }
  }

  static toFirestores = (data: RouteCapacityFootprintInstance[]): RouteCapacityFootprintFirestore[] => {
    return data.map(i => i.toFirestore()) ?? []
  }

  stripUpdatedAt(shallow = false) {
    const { ...rest } = this
    if (!shallow) {
      rest.footprint = this.footprint.stripUpdatedAt()
    }
    return new RouteCapacityFootprintInstance(rest)
  }
}
