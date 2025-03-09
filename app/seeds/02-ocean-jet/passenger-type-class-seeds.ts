import { seed_active, seed_createdAt, seed_fee } from './index-seeds'

const createdAt = seed_createdAt
const active = seed_active
const verify = false
const ageRange: NumberRange = {
  type: 'min',
  min: 2,
  max: 0
}

const fee: Fee = seed_fee

let index = 0
export const seed_pt_class_free: PassengerTypeClass = {
  id: 'ocj-pt-cl-free',
  name: 'Free',
  description: 'Free class',
  ageRange: {
    type: 'max',
    min: 0,
    max: 1
  },
  rate: 0,
  fee: {
    type: 'fixed',
    percent: 0,
    fixed: 0,
    min: 0,
    max: 0
  },
  verify: true,
  active,
  createdAt
}

export const seed_pt_class_open_air: PassengerTypeClass = {
  id: 'ocj-pt-cl-open-air',
  name: 'Open Air',
  description: 'Open Air Class',
  ageRange,
  fee,
  verify,
  active,
  createdAt,
  index: index++

}
export const seed_pt_class_tourist: PassengerTypeClass = {
  id: 'ocj-pt-cl-tourist',
  name: 'Tourist',
  description: 'Tourist Class',
  rate: 110,
  ageRange,
  fee,
  verify,
  active,
  createdAt,
  index: index++
}
export const seed_pt_class_business: PassengerTypeClass = {
  id: 'ocj-pt-cl-business',
  name: 'Business',
  description: 'Business Class',
  rate: 90,
  ageRange,
  verify,
  fee,
  active,
  createdAt,
  index: index++
}

export const all: PassengerTypeClass[] = [
  seed_pt_class_open_air,
  seed_pt_class_tourist,
  seed_pt_class_business
]

export const clss = {
  openAir: seed_pt_class_open_air,
  tourist: seed_pt_class_tourist,
  business: seed_pt_class_business
}
