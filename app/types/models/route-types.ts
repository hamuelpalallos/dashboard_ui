// ================== Route related export interfaces
export interface Route extends DatabaseRecord {
  origin?: Port
  destination?: Port
  capacity?: RouteCapacity
  passengerTypeClasses?: RoutePassengerTypeClass[]
  cargoTypeClasses?: RouteCargoTypeClass[]
  // trips?: TimeSchedule[]
  schedules: TimeSchedule[]
  duration?: DurationTime
}

export interface RouteSnapshot extends Route {
  originSnapshot: Port
  destinationSnapshot: Port
}

export interface RouteForm extends Omit<Route, 'origin' | 'destination' | 'passengerTypeClasses' | 'cargoTypeClasses' | 'capacity' | 'duration'> {
  // required fields
  active: boolean

  capacity: RouteCapacityForm
  origin: ReferenceId
  destination: ReferenceId
  passengerTypeClasses: RoutePassengerTypeClassForm[]
  cargoTypeClasses: RouteCargoTypeClassForm[]
  duration: number
}

export interface RouteFirestore extends Omit<Route, 'origin' | 'destination' | 'passengerTypeClasses' | 'cargoTypeClasses' | 'capacity' | 'duration'> {
  origin?: PortInstanceType
  destination?: PortInstanceType

  originReference?: DocRef
  destinationReference?: DocRef

  // originSnapshot?: Port
  // destinationSnapshot?: Port

  passengerTypeClasses: RoutePassengerTypeClassFirestore[]
  cargoTypeClasses: RouteCargoTypeClassFirestore[]
  capacity?: RouteCapacityFirestore
  duration: number
  // trips: TimeSchedule[]
  schedules: TimeSchedule[]
}
// const test: PortInstance = new PortInstance({
//   id: 'asdf',

// })

// ================== Passenger related interfaces
export interface RoutePassengerTypeClass extends PassengerTypeClass {
  id?: string
  rate: number
  class: PassengerTypeClass
}

export interface RoutePassengerTypeClassForm extends Omit<RoutePassengerTypeClass, 'class'> {
  class?: PassengerTypeClass
}

export interface RoutePassengerTypeClassFirestore extends Omit<RoutePassengerTypeClass, 'class'> {
  classReference: DocRef
}

// ================== Cargo related interfaces
export interface RouteCargoTypeClass extends CargoTypeClass {
  id?: string
  rate: number
  class: CargoTypeClass
}

export interface RouteCargoTypeClassForm extends Omit<RouteCargoTypeClass, 'class'> {
  // just to make it optional
  class?: CargoTypeClass
}

export interface RouteCargoTypeClassFirestore extends Omit<RouteCargoTypeClass, 'class'> {
  class: CargoTypeClassInstanceType // as snapshot
  classReference: DocRef
}
// ================== Route Capacity related interfaces
export interface RouteCapacity {
  cargo: number
  passenger: number
  cargoTypeFootprints: RouteCapacityFootprint[]
}

export interface RouteCapacityForm extends Omit<RouteCapacity, 'cargoTypeFootprints'> {
  cargoTypeFootprints: RouteCapacityFootprintForm[]
}

export interface RouteCapacityFirestore extends Omit<RouteCapacity, 'cargoTypeFootprints'> {
  cargoTypeFootprints: RouteCapacityFootprintFirestore[]
}

// ================== Route Capacity Footprint related interfaces
export interface RouteCapacityFootprint {
  id?: string
  allocation: number
  footprint?: CargoTypeFootprint
}

export interface RouteCapacityFootprintForm extends Omit<RouteCapacityFootprint, 'footprint'> {
  // just to make it optional
  footprint?: CargoTypeFootprint
}

export interface RouteCapacityFootprintFirestore extends Omit<RouteCapacityFootprint, 'footprint'> {
  id: string
  allocation: number
  footprintReference: DocRef
  footprintSnapshot?: CargoTypeFootprint
}
// ================== Trip related interfaces
export interface TimeSchedule {
  time: TimeOfDay | string
  // timeOfDay?: TimeOfDay
  excludedDays: DayOfWeek[]
  active: boolean
}

export type DayOfWeek = typeof DAYS_OF_WEEK[number]
