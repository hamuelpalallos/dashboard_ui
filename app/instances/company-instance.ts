export class CompanyInstance implements Company {
  constructor(data: Company) {
    this.image = data.image
    this.email = data.email
    this.website = data.website
    this.address = data.address
    this.name = data.name
    this.desc = data.desc
    this.type = data.type
    this.phone = data.phone
    this.description = data.description
    this.index = data.index
    this.active = data.active
    this.createdAt = data.createdAt
    this.updatedAt = data?.updatedAt
    this.id = data.id
    this.config = data.config
  }

  image?: string
  email?: string
  website?: string
  address?: Address
  name?: string
  desc?: string
  type?: CompanyType
  phone?: Phone
  config?: CompanyConfig
  //
  description?: string
  index?: number
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  id?: string

  stripUpdatedAt() {
    const { updatedAt, ...rest } = this
    return new CompanyInstance(rest)
  }
}
