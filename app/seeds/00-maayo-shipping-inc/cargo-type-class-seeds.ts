import { seed_active, seed_createdAt } from './index-seeds'

const createdAt = seed_createdAt
const active = seed_active
const included = {
  passenger: 2
}
const includedOne = {
  passenger: 1
}
const fee: Fee = {
  type: 'percent-min',
  min: 15,
  percent: 6,
  max: 0,
  fixed: 0
}
const smallCargoRate = 950
const mediumCargoRate = 1030
const largeCargoRate = 1150

const truckSmallCargoRate = 1200

const truckRegular4wCargoRate = 1500
const truckRegular6wCargoRate = 1700

const truckLargeCargoRate = 2000
const truckLargeExtendedCargoRate = 2500

// SMALL TRUCKS = 1200
// REGULAR TRUCKS = 1500
// LARGE TRUCKS = 2000
// LARGE TRUCKS EXTENDED = 2500

// ==============================================VV

// const multiCabCargoRate = 950
// const suvMediumCargoRate = 1030
// const suvLargeCargoRate = 1150

const bicycleCargoRate = 230
const motorcycleRegularCargoRate = 300
const motorcycleBigCargoRate = 420
const atvCargoRate = 420

const tricycleCargoRate = 450
const chariotCargoRate = 750

// ==============================================^^

export const seed_classBicycle: CargoTypeClass = {
  id: 'ct-cl-bicycle',
  name: 'Bicycle',
  rate: bicycleCargoRate,
  fee,
  included: includedOne,
  createdAt,
  active
}
export const seed_classMotorCycleRegular: CargoTypeClass = {
  id: 'ct-cl-motorcycle-regular',
  name: 'Motorcycle Regular (Below 500cc)',
  rate: motorcycleRegularCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classMotorCycleBig: CargoTypeClass = {
  id: 'ct-cl-motorcycle-big',
  name: 'Motorcycle Big (Above 500cc)',
  rate: motorcycleBigCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classATV: CargoTypeClass = {
  id: 'ct-cl-atv',
  name: 'ATV',
  rate: atvCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classTricycle: CargoTypeClass = {
  id: 'ct-cl-tricycle',
  name: 'Tricycle',
  rate: tricycleCargoRate,
  fee,
  included,
  createdAt,
  active
}

export const seed_classChariot: CargoTypeClass = {
  id: 'ct-cl-chariot',
  name: 'Chariot',
  rate: chariotCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classCarSmall: CargoTypeClass = {
  id: 'ct-cl-car-small',
  name: 'Car (Small)',
  rate: smallCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classCarMedium: CargoTypeClass = {
  id: 'ct-cl-car-medium',
  name: 'Car (Medium)',
  rate: mediumCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classCarLarge: CargoTypeClass = {
  id: 'ct-cl-car-large',
  name: 'Car (Large)',
  // class: classCarLarge,
  rate: largeCargoRate,
  included,
  fee,
  createdAt,
  active
}
export const seed_classTruckSmall: CargoTypeClass = {
  id: 'ct-cl-truck-small',
  name: 'Truck (Small)',
  rate: truckSmallCargoRate,
  fee,
  included,
  createdAt,
  active
}

export const seed_classTruckRegular4w: CargoTypeClass = {
  id: 'ct-cl-truck-reg-4w',
  name: 'Truck Regular (4W)',
  rate: truckRegular4wCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classTruckRegular6w: CargoTypeClass = {
  id: 'ct-cl-truck-reg-6w',
  name: 'Truck Regular (6W)',
  rate: truckRegular6wCargoRate,
  fee,
  included,
  createdAt,
  active
}

export const seed_classTruckLarge: CargoTypeClass = {
  // name: 'Truck (Bongo Extended / Elf 4W)',
  id: 'ct-cl-truck-large',
  name: 'Truck Large',
  rate: truckLargeCargoRate,
  fee,
  included,
  createdAt,
  active
}
export const seed_classTruckLargeExtended: CargoTypeClass = {
  // name: 'Truck (Bongo Extended / Elf 4W)',
  id: 'ct-cl-truck-large-ex',
  name: 'Truck Large (Extended)',
  rate: truckLargeExtendedCargoRate,
  fee,
  included,
  createdAt,
  active
}

// export const seed_classTruckCanter: CargoTypeClass = {
//   id: 'ct-cl-truck-canter-6w',
//   name: 'Truck Canter (6W)',
//   rate: 1700,
//   fee,
//   included,
//   createdAt,
//   active,
// }
// export const seed_classTruckFusoFighter: CargoTypeClass = {
//   id: 'ct-cl-truck-fuso-fighter',
//   name: 'Truck (Fuso Fighter)',
//   rate: 2000,
//   fee,
//   included,
//   createdAt,
//   active,
// }
// export const seed_classTruckIsuzuForwardEx: CargoTypeClass = {
//   id: 'ct-cl-truck-isuzu-forward-ex',
//   name: 'Truck (Isuzu Forward Extended)',
//   rate: 2000,
//   fee,
//   included,
//   createdAt,
//   active,
// }

export const all: CargoTypeClass[] = [
  // bicycles
  seed_classBicycle,
  // motorcycles
  seed_classMotorCycleRegular,
  seed_classMotorCycleBig,
  // atv
  seed_classATV,
  // with sidecar
  seed_classTricycle,
  seed_classChariot,
  // cars
  seed_classCarSmall,
  seed_classCarMedium,
  seed_classCarLarge,
  // trucks
  seed_classTruckSmall,
  seed_classTruckRegular4w,
  seed_classTruckRegular6w,
  seed_classTruckLarge,
  seed_classTruckLargeExtended

  // seed_classTruckBongoEx,
  // seed_classTruckCanter,
  // seed_classTruckFusoFighter,
  // seed_classTruckIsuzuForwardEx,

]
