export interface PassengerTypeCompound {
  type: PassengerType
  count: number
}

export interface Avatar {
  'data-nui-tooltip'?: string
  'src'?: string
  'srcDark'?: string
  'text'?: string
  'color'?: string
  'icon'?: string
}

export interface RouteCompound {
  route: Route
  conductors: UserCompanyData[]
  portAdmin?: UserCompanyData
  conductorAvatars: Avatar[]
}

export interface CompanyUserCompound {
  user: UserCompanyData
  scannedTickets: number
}

export interface CompanyCompound {
  company?: Company
  ports: number
  routes: number
  conveyances: number
}

export interface SalesCompound {
  company: Company
  tickets: Ticket[]
  dateSetting: DateSetting
  routes: Route[]
  subtotal: number
  total: number
  refund: number
  fee: number

  cargoClassCount: { name: string, count: number }[]

}


export interface OptionConfig {
  selected?: boolean
  filter?: ((item: any) => boolean)
  [key: string]: any
}

export interface OptionItem extends OptionConfig {
  label: string
  value: any
}

