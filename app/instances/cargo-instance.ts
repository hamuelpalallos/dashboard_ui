export class CargoInstance implements Cargo {
  constructor(data: Cargo) {
    this.type = new CargoTypeInstance(data.type)
    this.plate = data.plate
    this.passengers = data.passengers?.map(p => new PassengerInstance(p)) ?? []
    this.id = data.id
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.active = data.active
    this.index = data.index
    this.description = data.description
  }

  id?: string
  type: CargoTypeInstance
  plate: string
  passengers: PassengerInstanceType[]
  createdAt?: Date
  updatedAt?: Date
  active?: boolean
  index?: number
  description?: string

  static classToTableRow(c: CargoTypeClass): TableRowCargoTypeClass {
    const format = useFormat()
    return {
      id: format.str_empty(c.id),
      name: format.str_empty(c.name),
      description: format.str_empty(c.description),
      included: format.cargo_included(c.included),
      rate: format.currency(c.rate),
      fee: format.fee(c),
      active: format.str_bool(c.active),
      createdAt: format.date(c.createdAt),
      updatedAt: format.date(c.updatedAt),
      index: format.index(c.index)
    }
  }

  static footprintToTableRow(footprint: CargoTypeFootprint): TableRowCargoTypeFootprint {
    const format = useFormat()
    return {
      id: format.str_empty(footprint.id),
      name: format.str_empty(footprint.name),
      description: format.str_empty(footprint.description),
      size: format.size(footprint.size),
      dimensionRange: format.dimension_range(footprint.dimensionRange, 'Generic'),
      weightRange: format.weight_range(footprint.weightRange, 'Generic'),
      active: format.str_bool(footprint.active),
      createdAt: format.date(footprint.createdAt),
      updatedAt: format.date(footprint.updatedAt),
      index: format.index(footprint.index)
    }
  }

  stripUpdatedAt(shallow = false): CargoInstance {
    const { updatedAt, ...rest } = this
    if (!shallow) {
      rest.type = this.type.stripUpdatedAt()
    }
    return new CargoInstance(rest)
  }

  static footprintsToTableRows(footprints: CargoTypeFootprint[]): TableRowCargoTypeFootprint[] {
    return footprints.map(footprint => CargoInstance.footprintToTableRow(footprint))
  }

  static classesToTableRows(classes: CargoTypeClass[]): TableRowCargoTypeClass[] {
    return classes.map(c => CargoInstance.classToTableRow(c))
  }

  static toTableRows(items: Cargo[]): TableRowCargo[] {
    const format = useFormat()
    return items.map(i => CargoInstance.mapToTableRow(i, format))
  }

  toTableRow(): TableRowCargo {
    return CargoInstance.mapToTableRow(this)
  }

  static mapToTableRow = (data: Cargo, format: UseFormat = useFormat()): TableRowCargo => {
    return {
      status: format.lowercase(data?.status),
      departure: format.departure(data.ticketSnapshot?.departure),
      ticket: format.ticket(data.ticketSnapshot),
      id: format.str_empty(data.id),
      route: format.route(data.ticketSnapshot?.route),
      type: format.cargo_type(data.type),
      plate: format.uppercase(data.plate),
      passengers: format.count(data.passengers),
      active: format.str_bool(data.active),
      description: format.description(data.description ?? data.type?.description),
      createdAt: format.date(data.createdAt),
      updatedAt: format.date(data.updatedAt),
      category: format.cargo_type_category(data.type.categorySnapshot),
      rate: format.currency(data.type.classSnapshot?.rate),
      index: format.index(data.index)
    }
  }

  toPDFRow = (): string[] => {
    // const format = useFormat()
    const row = this.toTableRow()
    return [
      row.plate,
      row.type,
      // row.category,
      row.description,
      row.id
    ]
  }

  toPDFFeeRow = (): string[] => {
    // const format = useFormat()
    const row = this.toTableRow()
    return [
      row.plate,
      row.type,
      // row.category,
      row.description,

      row.id
    ]
  }

  static toPDFRows = (data: Cargo[]): string[][] => {
    return data.map(item => new CargoInstance(item).toPDFRow())
  }
}

export class CargoTypeInstance implements CargoType {
  constructor(data: CargoType) {
    this.id = data?.id
    this.name = data?.name ?? '__ __'
    this.description = data?.description
    this.class = new CargoTypeClassInstance(data.class)
    this.classSnapshot = data.classSnapshot ? new CargoTypeClassInstance(data.classSnapshot) : undefined
    this.footprint = new CargoTypeFootprintInstance(data.footprint)
    this.footprintSnapshot = data.footprintSnapshot ? new CargoTypeFootprintInstance(data.footprintSnapshot) : undefined
    this.category = new CargoTypeCategoryInstance(data.category)
    this.categorySnapshot = data.categorySnapshot ? new CargoTypeCategoryInstance(data.categorySnapshot) : undefined
    this.active = data?.active ?? false
    this.index = data?.index
    this.createdAt = data?.createdAt
    this.updatedAt = data?.updatedAt
  }

  id?: string
  name: string
  category: CargoTypeCategoryInstance
  categorySnapshot?: CargoTypeCategoryInstance
  footprint: CargoTypeFootprintInstance
  footprintSnapshot?: CargoTypeFootprintInstance
  class: CargoTypeClassInstance
  classSnapshot?: CargoTypeClassInstance
  description: string
  active?: boolean
  index?: number
  createdAt?: Date
  updatedAt?: Date

  toFirestore(): CargoTypeFirestore {
    const company_reference = useUserStore().companyReference
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      index: this.index,
      description: this.description,
      categoryReference: this.category.id ? company_reference?.cargo_type_category(this.category.id) ?? null : null,
      footprintReference: this.footprint.id ? company_reference?.cargo_type_footprint(this.footprint.id) ?? null : null,
      classReference: this.class.id ? company_reference?.cargo_type_class(this.class.id) ?? null : null,
      class: this.class,
      category: this.category,
      footprint: this.footprint
    }
  }

  toReference(): DocReference | undefined {
    return this.id ? useUserStore().companyReference?.cargo_type(this.id) : undefined
  }

  stripUpdatedAt(shallow = false): CargoTypeInstance {
    const { updatedAt, ...rest } = this
    if (!shallow) {
      rest.class = this.class.stripUpdatedAt()
      rest.category = this.category.stripUpdatedAt()
      rest.footprint = this.footprint.stripUpdatedAt()
    }
    return new CargoTypeInstance(rest)
  }

  static toOptions = (data: CargoType[]): CargoTypeInstance[] => {
    return data.map(item => new CargoTypeInstance(item).stripUpdatedAt())
  }

  toTableRow = (): TableRow<CargoType> => {
    const format = useFormat()
    return CargoTypeInstance.mapToTableRow(this, format)
  }

  static mapToTableRow = (data: CargoType, format = useFormat()): TableRow<CargoType> => {
    return {
      id: format.str_empty(data.id),
      name: format.str_empty(data.name),
      class: format.cargo_type_class(data.class),
      category: format.cargo_type_category(data.category),
      footprint: format.cargo_type_footprint(data.footprint),
      footprintSnapshot: format.cargo_type_footprint(data.footprintSnapshot),
      categorySnapshot: format.cargo_type_category(data.categorySnapshot),
      active: format.str_bool(data.active),
      description: format.description(data.description),
      createdAt: format.date(data.createdAt),
      updatedAt: format.date(data.updatedAt),
      index: format.index(data.index),
      classSnapshot: format.cargo_type_class(data.class)
    }
  }

  static toTableRows = (items: CargoType[]): TableRowCargoType[] => {
    const format = useFormat()
    return items.map(i => CargoTypeInstance.mapToTableRow(i, format))
  }

  static objectToTableRow = (data: CargoType): TableRowCargoType => {
    return new CargoTypeInstance(data).toTableRow()
  }

  static objectListToTableRowList = (data: CargoType[]): TableRowCargoType[] => {
    return data.map(item => CargoTypeInstance.objectToTableRow(item))
  }
}

export class CargoTypeClassInstance implements CargoTypeClass {
  constructor(data: CargoTypeClass) {
    this.id = data?.id ?? ''
    this.included = data?.included ? new CargoIncludedInstance(data.included) : undefined
    this.fee = data?.fee ? new FeeInstance(data.fee) : undefined
    this.active = data?.active ?? false
    this.index = data?.index
    this.name = data?.name
    this.rate = data?.rate
    this.description = data?.description
    this.createdAt = data?.createdAt
    this.updatedAt = data?.updatedAt
  }

  static toTableRows(data: CargoTypeClass[]): TableRowCargoTypeClass[] {
    const format = useFormat()
    return data.map(item => CargoTypeClassInstance.mapToTableRows(item, format))
  }

  static mapToTableRows(data: CargoTypeClass, format = useFormat()): TableRowCargoTypeClass {
    return {
      id: format.str_empty(data.id),
      name: format.str_empty(data.name),
      rate: format.number(data.rate),
      included: format.cargo_included(data.included),
      fee: format.str_fee(data.fee),
      active: format.str_bool(data.active),
      description: format.description(data.description),
      createdAt: format.date(data.createdAt),
      updatedAt: format.date(data.updatedAt),
      index: format.index(data.index)
    }
  }

  name?: string
  rate?: number
  included?: CargoIncludedInstance
  fee?: FeeInstanceType

  id: string
  active?: boolean
  index?: number
  description?: string
  createdAt?: Date
  updatedAt?: Date

  toJson(): CargoTypeClass {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore() {
    return this.toJson()
  }

  stripUpdatedAt(): CargoTypeClassInstance {
    const { updatedAt, ...rest } = this
    return new CargoTypeClassInstance(rest)
  }

  toReference(): DocReference | undefined {
    return this.id ? useUserStore().companyReference?.cargo_type_class(this.id) : undefined
  }
}

export class CargoIncludedInstance implements CargoIncluded {
  constructor(data: CargoIncluded) {
    this.passenger = data.passenger
  }

  passenger: number
  toJson() {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore() {
    return this.toJson()
  }
}

export class CargoTypeCategoryInstance implements CargoTypeCategory {
  constructor(data: CargoTypeCategory) {
    // this.id = data.id
    this.id = data?.id
    this.name = data?.name ?? EMPTY_STRING_DEFAULT
    this.index = data?.index
    this.description = data?.description ?? EMPTY_STRING_DEFAULT
    this.active = data?.active
    this.createdAt = data?.createdAt
    this.updatedAt = data?.updatedAt
  }

  id?: string
  name: string
  index?: number
  description?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date

  toTableRow(): TableRow<CargoTypeCategory> {
    const format = useFormat()
    return {
      id: format.str_empty(this.id),
      name: format.str_empty(this.name),
      description: format.str_empty(this.description),
      active: format.str_bool(this.active),
      createdAt: format.date(this.createdAt),
      updatedAt: format.date(this.updatedAt),
      index: format.index(this.index)
    }
  }

  static toTableRow(data: CargoTypeCategory): TableRow<CargoTypeCategory> {
    return new CargoTypeCategoryInstance(data).toTableRow()
  }

  static toTableRows(data: CargoTypeCategory[]): TableRow<CargoTypeCategory>[] {
    return data.map(item => new CargoTypeCategoryInstance(item).toTableRow())
  }

  toJson(): CargoTypeCategory {
    return JSON.parse(JSON.stringify(this))
  }

  stripUpdatedAt(): CargoTypeCategoryInstance {
    const { updatedAt, ...rest } = this
    return new CargoTypeCategoryInstance(rest)
  }

  toFirestore() {
    return this.toJson()
  }

  toReference(): DocReference | undefined {
    return this.id ? useUserStore().companyReference?.cargo_type_category(this.id) : undefined
  }
}

export class CargoTypeFootprintInstance implements CargoTypeFootprint {
  constructor(data: CargoTypeFootprint) {
    // Object.assign(this, data)
    this.id = data?.id
    this.name = data?.name
    this.size = data?.size ?? 0
    this.dimensionRange = data?.dimensionRange ? new DimensionRangeInstance(data.dimensionRange) : undefined
    this.weightRange = data?.weightRange ? new WeightRangeInstance(data.weightRange) : undefined
    this.createdAt = data?.createdAt
    this.updatedAt = data?.updatedAt
    this.active = data?.active
    this.index = data?.index
  }

  name: string
  size: number
  dimensionRange?: DimensionRangeInstanceType
  weightRange?: WeightRangeInstanceType
  createdAt?: Date
  updatedAt?: Date
  active?: boolean
  index?: number
  id?: string

  toJson(): CargoTypeFootprint {
    return JSON.parse(JSON.stringify(this))
  }

  stripUpdatedAt(): CargoTypeFootprintInstance {
    const { updatedAt, ...rest } = this
    return new CargoTypeFootprintInstance(rest)
  }

  toFirestore(): CargoTypeFootprint {
    return this.toJson()
  }

  toReference(): DocReference | undefined {
    return this.id ? useUserStore().companyReference?.cargo_type_footprint(this.id) : undefined
  }
}
