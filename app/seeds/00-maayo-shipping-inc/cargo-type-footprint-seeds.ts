let index = 0
const createdAt: Date = new Date(CREATED_AT_STRING)
const active = true
export const seed_bicycleFootprint: CargoTypeFootprint = {
  id: 'ct-ft-bicycle',
  size: CARGO_TYPE_FOOTPRINT_SIZE_BICYCLE,
  name: 'Bicycle Footprint',
  description: 'Generic Bicycle Footprint',
  index: index++,
  dimensionRange: {
    unit: 'meter',
    length: {
      type: 'min-max',
      min: 1500,
      max: 2500
    },
    width: {
      type: 'min-max',
      min: 500,
      max: 1000
    },
    height: {
      type: 'min-max',
      min: 2000,
      max: 2000
    }
  },
  weightRange: {
    unit: 'kilogram',
    min: 10000,
    max: 20000
  },
  active,
  createdAt
}

export const seed_motorcycleFootprint: CargoTypeFootprint = {
  id: 'ct-ft-motorcycle',
  size: CARGO_TYPE_FOOTPRINT_SIZE_MOTORCYCLE,
  name: 'Motorcycle Footprint',
  description: 'Generic Motorcycle Footprint',
  index: index++,
  active,
  createdAt
}

export const seed_atvFootprint: CargoTypeFootprint = {
  id: 'ct-ft-atv',
  size: CARGO_TYPE_FOOTPRINT_SIZE_ATV,
  name: 'ATV Footprint',
  description: 'Generic ATV Footprint',
  index: index++,
  active,
  createdAt
}

export const seed_carrierFootprint: CargoTypeFootprint = {
  id: 'ct-ft-carrier',
  size: CARGO_TYPE_FOOTPRINT_SIZE_CARRIER,
  name: 'Carrier Footprint',
  description: 'Generic Carrier Footprint',
  index: index++,
  active,
  createdAt
}

export const seed_carSmallFootprint: CargoTypeFootprint = {
  id: 'ct-ft-car-small',
  size: CARGO_TYPE_FOOTPRINT_SIZE_CAR_SMALL,
  name: 'Car Small Footprint',
  description: 'Generic Car Small Footprint',
  index: index++,
  active,
  createdAt
}

export const seed_carMediumFootprint: CargoTypeFootprint = {
  id: 'ct-ft-car-medium',
  size: CARGO_TYPE_FOOTPRINT_SIZE_CAR_MEDIUM,
  name: 'Car Medium Footprint',
  description: 'Generic Car Medium Footprint',
  index: index++,
  active,
  createdAt
}

export const seed_carLargeFootprint: CargoTypeFootprint = {
  id: 'ct-ft-car-large',
  size: CARGO_TYPE_FOOTPRINT_SIZE_CAR_LARGE,
  name: 'Car Large Footprint',
  description: 'Generic Car Large Footprint',
  index: index++,
  active,
  createdAt
}

// export const seed_carXLFootprint: CargoTypeFootprint = {
//   id: 'ct-ft-car-xl',
//   size: CARGO_TYPE_FOOTPRINT_SIZE_CAR_XL,
//   name: 'Car XL Footprint',
//   description: 'Generic Car XL Footprint',
//   index: index++,
//   active,
//   createdAt,
// }
export const seed_truckFootprint: CargoTypeFootprint = {
  id: 'ct-ft-truck',
  size: CARGO_TYPE_FOOTPRINT_SIZE_TRUCK,
  name: 'Truck Footprint',
  description: 'Generic Truck Footprint',
  index: index++,
  active,
  createdAt
}

export const seed_cargoTypeFootprints: CargoTypeFootprint[] = [
  seed_bicycleFootprint,
  seed_motorcycleFootprint,
  seed_atvFootprint,
  seed_carrierFootprint,
  seed_carSmallFootprint,
  seed_carMediumFootprint,
  seed_carLargeFootprint,
  // seed_carXLFootprint,
  seed_truckFootprint

]
