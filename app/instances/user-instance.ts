export class UserInstance implements User {
  constructor(data: User) {
    this.id = data.id
    this.name = data.name
    this.active = data.active ?? true
    this.index = data.index ?? 0
    this.address = data.address ? new AddressInstance(data.address) : undefined
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.deleted = data.deleted
    this.description = data.description
    this.email = data.email
    this.phone = data.phone
    this.bio = data.bio
    this.birthdate = data.birthdate
    this.admin = !!data.admin
  }

  name?: UserName
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

  email?: string
  phone?: Phone
  bio?: string
  birthdate?: Date
  sex?: Sex
  company?: Company
  image?: string
  nationality?: string
  issuedBy?: User
  admin?: boolean
  // set a getter for age calculated from birthdate
  get age(): number {
    const { calculateAge } = useUtils()
    return this.birthdate ? calculateAge(this.birthdate) : 0
  }

  toTableRow = (): TableRowUser => {
    const format = useFormat()
    return {
      id: format.str_empty(this.id),
      initials: format.initials(this.name),
      name: format.name(this.name),
      address: format.address(this.address),
      description: format.description(this.description),
      createdAt: format.datetime(this.createdAt),
      updatedAt: format.datetime(this.updatedAt),
      active: format.str_bool(this.active),
      index: format.index(this.index),
      bio: format.str_empty(this.bio),
      email: format.email(this.email),
      phone: format.phone(this.phone),
      birthdate: format.date(this.birthdate),
      age: format.age(this.birthdate),
      sex: format.sex(this.sex),
      company: format.company(this.company),
      image: format.image(this.image),
      nationality: format.nationality(this.nationality),
      issuedBy: format.user(this.issuedBy)
    }
  }

  toJson(): Port {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore() {
    return this.toJson()
  }

  toReference(): DocReference | undefined {
    return this.id ? useFirestoreReference().user(this.id) : undefined
  }
}

export class UserNameInstance implements UserName {
  constructor(data: UserName) {
    this.first = data?.first
    this.last = data?.last
    this.middle = data?.middle
    this.display = data?.display
  }

  first?: string
  last?: string
  middle?: string
  display?: string

  middleInitial(): string {
    return this.middle ? ` ${this.middle.charAt(0)}. ` : ' '
  }

  get full(): string {
    return `${this.first}${this.middleInitial()}${this.last}`
  }
}
