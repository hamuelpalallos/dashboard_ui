// specific car with specific plate number
export interface Cargo extends DatabaseRecord {
  type: CargoType
  plate: string
  passengers?: Passenger[]
  //
  status?: CargoStatus
  ticketSnapshot?: Ticket
}

export interface CargoType extends DatabaseRecord {
  name: string
  category: CargoTypeCategory
  description: string

  footprint: CargoTypeFootprint
  // This will determine the rate of the cargo
  class: CargoTypeClass

  // newly added by @hamuelpalallos
  classSnapshot?: CargoTypeClass
  footprintSnapshot?: CargoTypeFootprint
  categorySnapshot?: CargoTypeCategory
}
export interface CargoTypeFirestore extends Omit<CargoType, 'class' | 'category' | 'footprint'> {
  // TODO: disable null later
  classReference: DocRef | null
  categoryReference: DocRef | null
  footprintReference: DocRef | null
  class: CargoTypeClassInstanceType
  category: CargoTypeCategoryInstanceType
  footprint: CargoTypeFootprintInstanceType
}

export interface DimensionRange {
  unit: LengthUnit // 'default' is 'm'
  width: NumberRange
  height: NumberRange
  length: NumberRange
}

export interface Dimension {
  unit: LengthUnit // 'default' is 'm'
  width: number
  height: number
  length: number
}
export interface Weight {
  unit: WeightUnit // 'default' is 'kg'
  value: number
}
export interface CargoTypeFootprint extends DatabaseRecord {
  name: string
  size: number
  dimensionRange?: DimensionRange
  weightRange?: WeightRange
}

export interface CargoIncluded {
  passenger: number
}

export interface CargoTypeCategory extends DatabaseRecord {
  name: string
  index?: number
}

// This will determine the rate of the cargo
export interface CargoTypeClass extends DatabaseRecord {
  name?: string
  included?: CargoIncluded
  rate?: number
  fee?: Fee
}

export type ConveyanceType = typeof CONVEYANCE_TYPES[number]
export interface Conveyance extends DatabaseRecord {
  name: string
  description: string
  type: ConveyanceType
}
