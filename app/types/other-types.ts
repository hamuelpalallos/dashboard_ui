export interface PassengerManifest {
  name: string
  age: string
  sex: string
  nationality: string
  address: string
  // ticketNo: string
  id: string
}

export interface CargoManifest {
  plate: string
  type: string
  category: string
  description: string
  id: string
}

export interface RouteData {
  id: string
  origin: Port
  destination: Port
  vessel?: string // not implemented yet
  voyageNo?: string // not implemented yet

}

export interface ManifestData {
  passengers: string[][]
  // TODO: --> cargos: string[][]
  route: RouteData
  company: any
  date: string // departure date
  time: string // departure time
}

export enum FeeTypes {
  fixed = 'fixed',
  percent = 'percent',
  percentMin = 'percent-min',
  percentMax = 'percent-max',
  percentMinMax = 'percent-min-max'
}

export const typeLabels: Record<FeeTypes, string> = {
  [FeeTypes.fixed]: 'Fixed',
  [FeeTypes.percent]: 'Percentage',
  [FeeTypes.percentMin]: 'Percentage with Min',
  [FeeTypes.percentMax]: 'Percentage with Max',
  [FeeTypes.percentMinMax]: 'Percentage with Min & Max'
}

// const types: FeeTypes[] = Object.values(FeeTypes)
// const optionTypes = types.map((type) => {
//   return {
//     value: type, // value: "fixed" || "percentage" || "minPercentage" || "minMaxPercentage"
//     label: type // i want to create a label like "Fixed" || "Percentage" || "Min Percentage" || "Min Max Percentage"
//   }
// })

export interface SalesStatistic {
  tickets: Ticket[]
  date: Date
  total: number
  passenger: number
  cargo: number
}

export interface TripCompound {
  id?: string
  company?: Company
  schedule: TimeSchedule
  route: Route
  tickets: Ticket[]
  departure: Date
  duration?: Duration
  arrival?: Date
  status?: TripStatus
  available?: boolean
  number?: string
  conveyance?: Conveyance
  capacity: TripCapacity
  // exception: number[]
  // passengers: Passenger[]
  // time: string
  // cargos: Cargo[]
}
export interface TripStatistic {
  routes?: Route[]
  capacity: TripCapacity
  status?: TripStatus
  departure: Date
}
export interface TripCapacity {
  cargo: TripCapacityItem
  passenger: TripCapacityItem
}

export interface TripCapacityItem {
  percent: number
  max: number
  current: number
}
export type TripType = typeof TRIP_TYPES[number]

export type TripStatus = typeof TRIP_STATUSES[number]

export interface Included {
  passenger: number
}

export interface Destination {
  id: string
  name: string
}

export type TimelyPeriod = 'hour' | 'day' | 'week' | 'month' | 'year'

export interface Trip extends DatabaseRecord {
  type: TripType
  schedule?: TimeSchedule
  route: Route
  departure: Date
  number?: string // voyageNo
  company?: Company
  duration?: DurationTime
  status?: TripStatus
  conveyance?: Conveyance // vessel

  arrival?: Date
  // passengers?: Passenger[]
  // cargos?: Cargo[]
  tickets: Ticket[]

}
