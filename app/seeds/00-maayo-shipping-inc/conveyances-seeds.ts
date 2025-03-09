import { seed_active, seed_createdAt } from './index-seeds'

const createdAt = seed_createdAt
const active = seed_active
let index = 0
export const seed_conveyances: Conveyance[] = [
  {
    id: 'cv-ship-lct-martin-2',
    name: 'LCT MARTIN II',
    description: 'Maayo Shipping Inc. Barge',
    type: 'ship',
    index: index++,
    active,
    createdAt
  },
  {
    id: 'cv-ship-lct-martin-3',
    name: 'LCT MARTIN III',
    description: 'Maayo Shipping Inc. Barge',
    type: 'ship',
    index: index++,
    active,
    createdAt
  },
  {
    id: 'cv-ship-lct-martin-5',
    name: 'LCT MARTIN V',
    description: 'Maayo Shipping Inc. Barge',
    type: 'ship',
    index: index++,
    active,
    createdAt
  },
  {
    id: 'cv-ship-lct-martin-7',
    name: 'LCT MARTIN 7',
    description: 'Maayo Shipping Inc. Barge',
    type: 'ship',
    index: index++,
    active,
    createdAt
  },
  {
    id: 'cv-ship-lct-martin-8',
    name: 'LCT MARTIN 8',
    description: 'Maayo Shipping Inc. Barge, Vertical Clearance 4.7m',
    type: 'ship',
    index: index++,
    active,
    createdAt
  },
  {
    id: 'cv-ship-lct-wilcox-2',
    name: 'LCT WILCOX II',
    description: 'Maayo Shipping Inc. Barge',
    type: 'ship',
    index: index++,
    active,
    createdAt
  },
  {
    id: 'cv-ship-mv-bato-twin-1',
    name: 'MV BATO TWIN-1',
    description: 'Largest Maayo Shipping Inc. Barge',
    type: 'ship',
    index: index++,
    active,
    createdAt
  }

]
