export interface User extends DatabaseRecord {
  name?: UserName
  image?: string
  bio?: string
  phone?: Phone
  email?: string
  address?: Address
  age?: number
  nationality?: string
  birthdate?: DateTime
  sex?: Sex
  // active?: boolean
  company?: Company
  issuedBy?: User
  // * LOCALLY CREATED
  companyData?: UserCompanyData
  companyDataReference?: DocRef

  companyReference?: DocRef
  issuedByReference?: DocRef
  // TODO: TO update this
  admin?: boolean
}

export type DateTime = Date /* | Timestamp */

export type Sex = typeof SEXES[number]
export type UserRole = typeof USER_ROLES[number]

export interface UserCompanyData extends DatabaseRecord {
  user?: User
  // active?: boolean
  startedAt?: DateTime
  endedAt?: DateTime
  role?: UserRole
  port?: Port
  authority?: CompanyAuthority
  userReference?: DocRef
  portReference?: DocRef
}

// export type CompanyUserOrNull = CompanyUser | undefined
export type UserOrNull = User | undefined
export type UserCompanyDataOrNull = UserCompanyData | undefined

export interface UserName {
  first?: string
  last?: string
  middle?: string
  display?: string
}

export type CompanyRef = RecordRef
export interface UserRef extends RecordRef {
  image?: string
  email?: string
}

export interface UserAddress {
  street?: string
  city?: string
  state?: string
  zip?: string
  region?: string
}

export interface RecordRef {
  id?: string
  name?: string
  reference?: DocRef
}

export interface CompanyAuthority {
  issuedBy?: User
  issuedAt?: DateTime
  code?: string
  expiredAt?: DateTime
  active?: boolean

  // references
  issuedByReference?: DocRef
}
