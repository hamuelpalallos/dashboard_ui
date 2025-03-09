import { seed_active, seed_createdAt } from './index-seeds'

const createdAt = seed_createdAt
const active = seed_active
let index = 0
export const seed_conveyances: Conveyance[] = [
  {
    id: 'cv-ship-generic',
    name: 'Generic Ship',
    description: 'Generic Fast craft',
    type: 'ship',
    index: index++,
    active,
    createdAt
  }
]
