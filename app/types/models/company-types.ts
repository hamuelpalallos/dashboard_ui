export type CompanyType = 'sea' | 'land' | 'air'
export type CompanyConfigType = 'internal' | 'external' | 'automated'
export interface Company extends DatabaseRecord {
  image?: string
  email?: string
  website?: string
  address?: Address
  name?: string
  desc?: string
  type?: CompanyType
  phone?: Phone
  config?: CompanyConfig
  // administrators?: string[]
}
export interface CompanyConfig {
  type?: CompanyConfigType
  withCargo?: boolean
}
