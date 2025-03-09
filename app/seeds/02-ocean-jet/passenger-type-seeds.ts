import { seed_active, seed_createdAt } from './index-seeds'
import { seed_pt_class_business, seed_pt_class_open_air, seed_pt_class_tourist } from './passenger-type-class-seeds'

let passengerIndex = 0
const active = seed_active
const createdAt = seed_createdAt

export const all: PassengerType[] = [
  {
    id: 'ocj-pt-open-air',
    name: 'Open Air',
    description: 'Open Air',
    index: passengerIndex++,
    class: seed_pt_class_open_air,
    active,
    createdAt
  }, {
    id: 'ocj-pt-tourist',
    name: 'Tourist',
    description: 'Tourist Class',
    index: passengerIndex++,
    class: seed_pt_class_tourist,
    active,
    createdAt
  }, {
    id: 'ocj-pt-business',
    name: 'Business Class',
    description: 'Business Class',
    index: passengerIndex++,
    class: seed_pt_class_business,
    active,
    createdAt
  }
]

export const types = {
  openAir: all.find(i => i.id === 'ocj-pt-open-air'),
  tourist: all.find(i => i.id === 'ocj-pt-tourist'),
  business: all.find(i => i.id === 'ocj-pt-business')
}
