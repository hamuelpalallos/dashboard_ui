export interface ConveyanceCapacity {
  cargo: number
  passenger: number
  cargoTypeFootprints: ConveyanceCapacityFootprint[]
}

export interface ConveyanceCapacityForm extends Omit<ConveyanceCapacity, 'cargoTypeFootprints'> {
  cargoTypeFootprints: ConveyanceCapacityFootprintForm[]
}

export interface ConveyanceCapacityFirestore extends Omit<ConveyanceCapacity, 'cargoTypeFootprints'> {
  cargoTypeFootprints: ConveyanceCapacityFootprintFirestore[]
}

// ================== Route Capacity Footprint related interfaces
export interface ConveyanceCapacityFootprint {
  id: string
  allocation: number
  footprint: CargoTypeFootprint
}

export interface ConveyanceCapacityFootprintForm extends Omit<ConveyanceCapacityFootprint, 'footprint'> {
  // just to make it optional
  footprint?: CargoTypeFootprint
}

export interface ConveyanceCapacityFootprintFirestore extends Omit<ConveyanceCapacityFootprint, 'footprint'> {
  id: string
  allocation: number
  footprintReference: DocRef
  footprintSnapshot?: CargoTypeFootprint
}
