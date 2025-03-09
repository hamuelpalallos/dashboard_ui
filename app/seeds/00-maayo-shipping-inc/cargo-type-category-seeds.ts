import { seed_createdAt } from './index-seeds'

const createdAt = seed_createdAt
const active = true
export const seed_smallCarCategory: CargoTypeCategory = {
  id: 'ct-cc-compact-cars',
  name: 'Small cars',
  active,
  createdAt
}
export const seed_mediumCarCategory: CargoTypeCategory = {
  id: 'ct-cc-medium-car',
  name: 'Medium Cars',
  active,
  createdAt
}
export const seed_largeCarCategory: CargoTypeCategory = {
  id: 'ct-cc-large-car',
  name: 'Large Cars',
  active,
  createdAt
}
export const seed_bicycleCategory: CargoTypeCategory = {
  id: 'ct-cc-bicycle',
  name: 'Bicycle',
  active,
  createdAt
}
export const seed_motorcycleCategory: CargoTypeCategory = {
  id: 'ct-cc-motorcycle',
  name: 'Motorcycle',
  active,
  createdAt
}
export const seed_atvCategory: CargoTypeCategory = {
  id: 'ct-cc-atv',
  //   description: 'All-terrain vehicle',
  name: 'ATV',
  active,
  createdAt
}
export const seed_pedicabCategory: CargoTypeCategory = {
  id: 'ct-cc-pedicab',
  name: 'Pedicab',
  active,
  createdAt
}
export const seed_chariotCategory: CargoTypeCategory = {
  id: 'ct-cc-chariot',
  name: 'Chariot',
  active,
  createdAt
}
export const seed_compactCarsCategory: CargoTypeCategory = {
  id: 'ct-cc-car-compact',
  name: 'Compact Cars',
  active,
  createdAt
}
export const seed_mediumCarsCategory: CargoTypeCategory = {
  id: 'ct-cc-car-medium',
  name: 'Medium Cars',
  active,
  createdAt
}
export const seed_largeCarsCategory: CargoTypeCategory = {
  id: 'ct-cc-car-large',
  name: 'Large Cars',
  active,
  createdAt
}
export const seed_bongoCategory: CargoTypeCategory = {
  id: 'ct-cc-bongo',
  name: 'Bongo',
  active,
  createdAt
}
export const seed_truckCategory: CargoTypeCategory = {
  id: 'ct-cc-truck',
  name: 'Truck',
  active,
  createdAt
}

export const all = [
  seed_smallCarCategory,
  seed_mediumCarCategory,
  seed_largeCarCategory,
  seed_bicycleCategory,
  seed_motorcycleCategory,
  seed_atvCategory,
  seed_pedicabCategory,
  seed_chariotCategory,
  seed_compactCarsCategory,
  seed_mediumCarsCategory,
  seed_largeCarsCategory,
  seed_bongoCategory,
  seed_truckCategory
]
