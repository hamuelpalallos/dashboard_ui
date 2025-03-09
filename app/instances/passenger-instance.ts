export class PassengerInstance implements Passenger {
  constructor(data: Passenger) {
    this.id = data.id!
    this.name = new UserNameInstance(data.name)
    this.age = data.age
    this.sex = data.sex
    this.birthdate = data.birthdate
    this.nationality = data.nationality
    this.address = data.address
    this.ticket = data.ticket
    this.type = new PassengerTypeInstance(data.type)
    this.ticketSnapshot = data.ticketSnapshot
    this.cargoSnapshot = data.cargoSnapshot
    this.companySnapshot = data.companySnapshot
    this.phone = data.phone
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.status = data.status
    this.active = data.active
    this.index = data.index
    this.description = data.description
  }

  status: PassengerStatus
  active?: boolean
  index?: number
  description?: string

  id: string
  name: UserNameInstanceType
  age: number
  sex: Sex
  birthdate?: Date
  nationality?: string
  phone?: Phone

  address: Address
  type: PassengerTypeInstance
  ticket: PassengerTicket
  companySnapshot?: PassengerCompanySnapshot
  ticketSnapshot?: PassengerTicketSnapshot
  cargoSnapshot?: PassengerCargoSnapshot
  createdAt?: Date
  updatedAt?: Date

  static classToTableRow(c: PassengerTypeClass): TableRowPassengerTypeClass {
    const format = useFormat()
    return {
      id: format.str_empty(c.id),
      name: format.str_empty(c.name),
      description: format.str_empty(c.description),
      ageRange: format.age_range(c.ageRange),
      rate: format.currency(c.rate),
      verify: format.str_bool(c.verify),
      fee: format.fee(c),
      active: format.str_bool(c.active),
      createdAt: format.date(c.createdAt),
      updatedAt: format.date(c.updatedAt),
      index: format.index(c.index)
    }
  }

  toTableRow(): TableRowPassenger {
    const format = useFormat()
    return {
      id: format.str_empty(this.id),
      name: format.name(this.name),
      age: format.integer(this.age),
      createdAt: format.date(this.createdAt),
      updatedAt: format.date(this.updatedAt),
      description: format.passenger_description(this.toJson()),
      sex: format.sex(this.sex),
      birthdate: format.date(this.birthdate),
      nationality: format.nationality(this.nationality),
      route: format.route(this.ticketSnapshot?.route),
      ticket: format.ticket(this.ticketSnapshot),
      cargo: format.cargo(this.cargoSnapshot),
      type: format.passenger_type(this.type),
      company: format.company(this.companySnapshot),
      phone: format.phone(this.phone),
      departure: format.datetime(this.ticketSnapshot?.departure),
      address: format.address(this.address, 32),
      rate: format.rate_snapshot(this.type),
      status: format.passenger_status(this.status)
    }
  }

  static toPDFRows = (
    passengers: Passenger[]
  ): string[][] => {
    return passengers.map(i => new PassengerInstance(i).toPDFRow())
  }

  toPDFRow = (): string[] => {
    const row = this.toTableRow()
    const utils = useUtils()
    return [
      row.name,
      row.age,
      row.sex,
      utils.removeEmojis(row.nationality),
      row.address,
      row.id
    ]
  }

  static toTableRows(passengers: Passenger[]): TableRowPassenger[] {
    const format = useFormat()
    return passengers.map(i => PassengerInstance.mapToTableRow(i, format))
  }

  static mapToTableRow(data: Passenger, format: UseFormat = useFormat()): TableRowPassenger {
    return {
      id: format.str_empty(data.id),
      name: format.name(data.name),
      age: format.integer(data.age),
      createdAt: format.date(data.createdAt),
      updatedAt: format.date(data.updatedAt),
      description: format.passenger_description(data),
      sex: format.sex(data.sex),
      birthdate: format.date(data.birthdate),
      nationality: format.nationality(data.nationality),
      route: format.route(data.ticketSnapshot?.route),
      ticket: format.ticket(data.ticketSnapshot),
      cargo: format.cargo(data.cargoSnapshot),
      type: format.passenger_type(data.type),
      company: format.company(data.companySnapshot),
      phone: format.phone(data.phone),
      departure: format.datetime(data.ticketSnapshot?.departure),
      address: format.address(data.address, 32),
      rate: format.rate_snapshot(data.type),
      status: format.passenger_status(data.status)
    }
  }

  static toManifestRows(passengers: Passenger[]): PassengerManifest[] {
    return passengers.map(i => new PassengerInstance(i).toManifest())
  }

  static toInstance(data: Passenger): PassengerInstance {
    return new PassengerInstance(data)
  }

  static toInstances(data: Passenger[]): PassengerInstance[] {
    return data.map(i => new PassengerInstance(i))
  }

  toManifest(): PassengerManifest {
    const row = this.toTableRow()
    return {
      name: row.name,
      age: row.age,
      sex: row.sex,
      nationality: row.nationality,
      address: row.address,
      id: row.id
    }
  }

  toJson(): Passenger {
    return JSON.parse(JSON.stringify(this))
  }

  stripUpdatedAt(shallow = false): PassengerInstance {
    const { updatedAt, ...rest } = this
    if (!shallow) {
      rest.type = this.type.stripUpdatedAt()
    }
    return new PassengerInstance(rest)
  }

  static getStatus(status?: TicketStatus): PassengerStatus {
    switch (status) {
      case 'paid': return 'booked'
      case 'inspected': return 'booked'
      case 'used': return 'boarded'
      case 'unpaid': return 'planned'
      case 'cancelled': return 'cancelled'
      case 'refunded': return 'refunded'
      default: return status ?? 'planned'
    }
  }
}

export class PassengerTypeInstance implements PassengerType {
  constructor(data: PassengerType) {
    // Object.assign(this, data)
    this.name = data.name
    this.class = data.class ? new PassengerTypeClassInstance(data.class) : undefined
    this.classSnapshot = data.classSnapshot ? new PassengerTypeClassInstance(data.classSnapshot) : undefined
    this.free = data.free
    this.id = data.id
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    // this.deleted = data.deleted
    this.active = data.active
    this.index = data.index
  }

  name: string
  class?: PassengerTypeClassInstance
  classSnapshot?: PassengerTypeClassInstanceType
  free?: boolean

  // database fields
  id?: string
  createdAt?: DateTime
  updatedAt?: DateTime
  deleted?: DeletedData
  active?: boolean
  index?: number
  description?: string

  static toTableRows(types: PassengerType[]): TableRowPassengerType[] {
    const format = useFormat()
    return types.map(i => PassengerTypeInstance.mapToTable(i, format))
  }

  static mapToTable(data: PassengerType, format: UseFormat) {
    return {
      id: format.str_empty(data.id),
      name: format.str_empty(data.name),
      class: format.passenger_type_class(data.class),
      classSnapshot: format.passenger_type_class(data.classSnapshot),
      free: format.str_bool(data.free),
      createdAt: format.date(data.createdAt),
      updatedAt: format.date(data.updatedAt),
      active: format.str_bool(data.active),
      index: format.index(data.index),
      description: format.str_empty(data.description)
    }
  }

  toTableRow(): TableRowPassengerType {
    const format = useFormat()
    return PassengerTypeInstance.mapToTable(this, format)
  }

  toFirestore(): PassengerTypeFirestore {
    const company_reference = useUserStore().companyReference
    return {
      index: this.index,
      name: this.name,
      classSnapshot: this.class,
      classReference: this.class?.id ? company_reference?.passenger_type(this.class.id) : undefined
    }
  }

  toReference(): DocRef | undefined {
    if (!this.id) return undefined
    return useUserStore().companyReference?.passenger_type(this.id)
  }

  stripUpdatedAt(shallow = false): PassengerTypeInstance {
    const { updatedAt, ...rest } = this
    if (!shallow) {
      rest.class = this.class?.stripUpdatedAt()
    }
    return new PassengerTypeInstance(rest)
  }

  toJson(): PassengerType {
    return JSON.parse(JSON.stringify(this))
  }
}

export class PassengerTypeClassInstance implements PassengerTypeClass {
  constructor(data: PassengerTypeClass) {
    // Object.assign(this, data)
    this.ageRange = data?.ageRange ? new NumberRangeInstance(data.ageRange) : undefined
    this.fee = data?.fee ? new FeeInstance(data.fee) : undefined
    this.id = data.id ?? ''
    this.active = data.active ?? true
    this.index = data.index ?? 0
    this.description = data.description ?? ''
    this.name = data.name ?? ''
    this.rate = data.rate ?? 0
    this.verify = data.verify ?? false
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  name?: string
  verify?: boolean
  ageRange?: NumberRangeInstanceType
  rate?: number
  fee?: FeeInstanceType

  // database fields
  id: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  index?: number
  description?: string

  toJson(): PassengerTypeClass {
    return JSON.parse(JSON.stringify(this))
  }

  static mapToTableRow(data: PassengerTypeClass, format = useFormat()): TableRowPassengerTypeClass {
    return {
      id: format.str_empty(data.id),
      name: format.str_empty(data.name),
      description: format.str_empty(data.description),
      ageRange: format.age_range(data.ageRange),
      rate: format.currency(data.rate),
      verify: format.str_bool(data.verify),
      fee: format.fee(data),
      active: format.str_bool(data.active),
      createdAt: format.date(data.createdAt),
      updatedAt: format.date_relative(data.updatedAt),
      index: format.index(data.index)
    }
  }

  static toTableRows(classes: PassengerTypeClass[]): TableRowPassengerTypeClass[] {
    const format = useFormat()
    return classes.map(i => PassengerTypeClassInstance.mapToTableRow(i, format))
  }

  stripUpdatedAt() {
    const { updatedAt, ...rest } = this
    return new PassengerTypeClassInstance(rest)
  }

  toFirestore() {
    return this.toJson()
  }
}
