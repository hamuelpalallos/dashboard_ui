export class ConveyanceInstance {
  constructor(data: Conveyance) {
    // Object.assign(this, data)
    this.id = data.id
    this.name = data.name
    this.type = data.type
    this.description = data.description
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.deleted = data.deleted
    this.active = data.active
    this.index = data.index
  }

  name: string
  description: string
  type: ConveyanceType
  id?: string
  createdAt?: Date
  updatedAt?: Date
  deleted?: DeletedData
  active?: boolean
  index?: number

  static instantiate(data?: Conveyance): ConveyanceInstance | undefined {
    return data ? new ConveyanceInstance(data) : undefined
  }

  static toTableRows = (items: Conveyance[]): TableRowConveyance[] => {
    const format = useFormat()
    return items.map((i) => {
      return {
        id: format.str_empty(i.id),
        name: format.str_empty(i.name),
        description: format.description(i.description),
        type: format.capitalize(i.type),
        active: format.str_bool(i.active),
        index: format.index(i.index),
        createdAt: format.datetime(i.createdAt),
        updatedAt: format.datetime(i.updatedAt)
      }
    })
  }

  toJson(): ConveyanceInstance {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore() {
    return this.toJson()
  }

  companyReference = () => {
    const companyId = useUserStore().companyId
    if (!companyId) return undefined
    return useCompanyReference(companyId)
  }

  toReference(): DocReference | undefined {
    return this.id ? this.companyReference()?.conveyance(this.id) : undefined
  }

  stripUpdatedAt(): ConveyanceInstance {
    const { updatedAt, ...rest } = this
    return new ConveyanceInstance(rest)
  }
}

// const conveyance1: Conveyance = {
//   name: 'Conveyance1',
//   type: 'bus',
//   description: 'A bus',
//   id: '1',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   deleted: undefined,
//   active: true,
//   index: 1,
// }

// const conveyanceInstance = new ConveyanceInstance(conveyance1)

// console.log(conveyanceInstance.stripUpdatedAt().toJson())
