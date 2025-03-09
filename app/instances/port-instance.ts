// import { Model } from 'pinia-orm'

// export class PortInstance extends Model implements Port {
export class PortInstance implements Port {
  // static override entity = 'ports'
  constructor(data: Port) {
    // super()
    // Object.assign(this, data)
    this.id = data.id ?? ''
    this.name = data.name ?? ''
    this.active = data.active ?? true
    this.index = data.index ?? 0
    this.address = data.address ? new AddressInstance(data.address) : undefined
    this.fees = FeeItemInstance.fromJsonArray(data.fees)
    this.description = data.description

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

  name?: string
  address?: AddressInstanceType
  fees?: FeeItemInstanceType[]

  // database fields
  id?: string
  createdAt?: Date
  updatedAt?: Date
  deleted?: DeletedData
  active?: boolean
  index?: number
  description?: string

  // toTableRow = (): TableRowPort => {
  // const format = useFormat()
  // return {
  //   id: format.str_empty(this.id),
  //   name: format.str_empty(this.name),
  //   address: format.address(this.address),
  //   description: format.description(this.description),
  //   createdAt: format.datetime(this.createdAt),
  //   updatedAt: format.datetime(this.updatedAt),
  //   active: format.str_bool(this.active),
  //   fees: format.str_fee_items(this.fees),
  //   index: format.index(this.index)
  // }
  // }

  static mapToTableRow(data: Port, format = useFormat()): TableRowPort {
    return {
      id: format.str_empty(data.id),
      name: format.str_empty(data.name),
      code: format.str_empty(data.code),
      address: format.address(data.address),
      description: format.description(data.description),
      createdAt: format.datetime(data.createdAt),
      updatedAt: format.datetime(data.updatedAt),
      active: format.str_bool(data.active),
      fees: format.str_fee_items(data.fees),
      index: format.index(data.index)
    }
  }

  static toTableRows = (ports: Port[]): TableRowPort[] => {
    const format = useFormat()
    return ports.map(p => PortInstance.mapToTableRow(p, format))
  }

  toJson(): Port {
    return JSON.parse(JSON.stringify(this))
  }

  static toOptions(ports: Port[]): PortInstance[] {
    return ports.map(port => new PortInstance(port).toOption())
  }

  toOption(): PortInstance {
    return this.stripUpdatedAt()
  }

  stripUpdatedAt(): PortInstance {
    const { updatedAt, ...rest } = this
    return new PortInstance(rest)
  }

  companyReference = () => {
    const companyId = useUserStore().companyId
    if (!companyId) return undefined
    return useCompanyReference(companyId)
  }

  toReference(): DocReference | undefined {
    // return undefined
    return this.id ? this.companyReference()?.port(this.id) : undefined
  }

  toFirestore() {
    return this.toJson()
  }
}
