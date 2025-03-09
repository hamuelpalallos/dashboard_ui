import { all } from './cargo-type-class-seeds'
import { seed_motorcycleFootprint } from './cargo-type-footprint-seeds'
import { seed_active, seed_createdAt } from './index-seeds'
import { seed_passengerTypeClasses } from './passenger-type-class-seeds'
import { seed_portBato, seed_portLarena, seed_portLiloan, seed_portSibulan, seed_portTampi } from './port-seeds'

const motorcycleFootprint = seed_motorcycleFootprint
const createdAt = seed_createdAt
const active = seed_active
const capacity: RouteCapacity = {
  cargo: 10,
  passenger: 50,
  cargoTypeFootprints: [{
    id: motorcycleFootprint.id ?? 'no-id',
    allocation: 15,
    footprint: motorcycleFootprint
  }]
}
const passengerTypeClasses: RoutePassengerTypeClass[] = seed_passengerTypeClasses.map((i) => {
  return {
    id: i.id ?? 'no-id',
    rate: i.rate ?? 0,
    class: i
  }
}) ?? []

const cargoTypeClasses: RouteCargoTypeClass[] = all.map((i) => {
  return {
    id: i.id ?? 'no-id',
    rate: i.rate ?? 0,
    class: i
  }
}) ?? []

let index = 0
export const seed_routes: Route[] = [
  {
    id: 'rt-bato-tampi',
    origin: seed_portBato,
    destination: seed_portTampi,
    active,
    capacity,
    schedules: [
      {
        time: '04:00',
        excludedDays: [],
        active
      },
      {
        time: '05:00',
        excludedDays: [],
        active
      },
      {
        time: '06:30',
        excludedDays: [],
        active
      },
      {
        time: '08:00',
        excludedDays: [],
        active
      },
      {
        time: '09:30',
        excludedDays: [],
        active
      },
      {
        time: '10:30',
        excludedDays: [],
        active
      },
      {
        time: '11:30',
        excludedDays: [],
        active
      },
      {
        time: '12:30',
        excludedDays: [],
        active
      },
      {
        time: '14:00',
        excludedDays: [],
        active
      },
      {
        time: '15:30',
        excludedDays: [],
        active
      },
      {
        time: '17:00',
        excludedDays: [],
        active
      },
      {
        time: '18:30',
        excludedDays: [],
        active
      },
      {
        time: '20:00',
        excludedDays: [],
        active
      },
      {
        time: '21:30',
        excludedDays: [],
        active
      },
      {
        time: '23:30',
        excludedDays: [],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '04:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '05:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '06:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '08:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '09:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '10:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '11:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '12:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '14:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '15:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '17:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '18:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '20:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '21:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '23:30',
    //     excludedDays: [],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  },
  {
    id: 'rt-bato-larena',
    origin: seed_portBato,
    destination: seed_portLarena,
    active,
    capacity,
    schedules: [
      {
        time: '13:00',
        excludedDays: [1, 3, 5, 7],
        active
      },
      {
        time: '15:00',
        excludedDays: [1, 2, 3, 4, 5, 6],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '13:00',
    //     excludedDays: [1, 3, 5, 7],
    //     active,
    //   },
    //   {
    //     time: '15:00',
    //     excludedDays: [1, 2, 3, 4, 5, 6],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  },
  {
    id: 'rt-larena-bato',
    origin: seed_portLarena,
    destination: seed_portBato,
    active,
    capacity,
    schedules: [
      {
        time: '13:00',
        excludedDays: [3],
        active
      },
      {
        time: '15:00',
        excludedDays: [1, 2, 3, 4, 5, 6],
        active
      },
      {
        time: '16:00',
        excludedDays: [1, 2, 3, 4, 5, 6],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '13:00',
    //     excludedDays: [3],
    //     active,
    //   },
    //   {
    //     time: '15:00',
    //     excludedDays: [1, 2, 3, 4, 5, 6],
    //     active,
    //   },
    //   {
    //     time: '16:00',
    //     excludedDays: [1, 2, 3, 4, 5, 6],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  },
  {
    id: 'rt-larena-liloan',
    origin: seed_portLarena,
    destination: seed_portLiloan,
    active,
    capacity,
    schedules: [
      {
        time: '02:00',
        excludedDays: [1, 3, 5, 7],
        active
      },
      {
        time: '07:00',
        excludedDays: [1, 2, 3, 4, 5, 6],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '02:00',
    //     excludedDays: [1, 3, 5, 7],
    //     active,
    //   },
    //   {
    //     time: '07:00',
    //     excludedDays: [1, 2, 3, 4, 5, 6],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  },
  {
    id: 'rt-liloan-sibulan',
    origin: seed_portLiloan,
    destination: seed_portSibulan,
    active,
    capacity,
    schedules: [
      {
        time: '04:30',
        excludedDays: [],
        active
      },
      {
        time: '06:00',
        excludedDays: [],
        active
      },
      {
        time: '07:30',
        excludedDays: [],
        active
      },
      {
        time: '09:00',
        excludedDays: [],
        active
      },
      {
        time: '10:30',
        excludedDays: [],
        active
      },
      {
        time: '12:00',
        excludedDays: [],
        active
      },
      {
        time: '13:30',
        excludedDays: [],
        active
      },
      {
        time: '15:00',
        excludedDays: [],
        active
      },
      {
        time: '16:30',
        excludedDays: [],
        active
      },
      {
        time: '18:00',
        excludedDays: [],
        active
      },
      {
        time: '19:30',
        excludedDays: [],
        active
      },
      {
        time: '21:00',
        excludedDays: [],
        active
      },
      {
        time: '22:30',
        excludedDays: [],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '04:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '06:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '07:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '09:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '10:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '12:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '13:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '15:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '16:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '18:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '19:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '21:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '22:30',
    //     excludedDays: [],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  },
  {
    id: 'rt-liloan-larena',
    origin: seed_portLiloan,
    destination: seed_portLarena,
    active,
    capacity,
    schedules: [
      {
        time: '02:00',
        excludedDays: [3],
        active
      },
      {
        time: '07:00',
        excludedDays: [1, 2, 3, 4, 5, 6],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '02:00',
    //     excludedDays: [3],
    //     active,
    //   },
    //   {
    //     time: '07:00',
    //     excludedDays: [1, 2, 3, 4, 5, 6],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  },
  {
    id: 'rt-sibulan-liloan',
    origin: seed_portSibulan,
    destination: seed_portLiloan,
    active,
    capacity,
    schedules: [
      {
        time: '04:30',
        excludedDays: [],
        active
      },
      {
        time: '06:00',
        excludedDays: [],
        active
      },
      {
        time: '07:30',
        excludedDays: [],
        active
      },
      {
        time: '09:00',
        excludedDays: [],
        active
      },
      {
        time: '10:30',
        excludedDays: [],
        active
      },
      {
        time: '12:00',
        excludedDays: [],
        active
      },
      {
        time: '13:30',
        excludedDays: [],
        active
      },
      {
        time: '15:00',
        excludedDays: [],
        active
      },
      {
        time: '16:30',
        excludedDays: [],
        active
      },
      {
        time: '18:00',
        excludedDays: [],
        active
      },
      {
        time: '19:30',
        excludedDays: [],
        active
      },
      {
        time: '21:00',
        excludedDays: [],
        active
      },
      {
        time: '22:30',
        excludedDays: [],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '04:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '06:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '07:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '09:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '10:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '12:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '13:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '15:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '16:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '18:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '19:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '21:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '22:30',
    //     excludedDays: [],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  },
  {
    id: 'rt-tampi-bato',
    origin: seed_portTampi,
    destination: seed_portBato,
    active,
    capacity,
    schedules: [
      {
        time: '04:00',
        excludedDays: [],
        active
      },
      {
        time: '05:00',
        excludedDays: [],
        active
      },
      {
        time: '06:30',
        excludedDays: [],
        active
      },
      {
        time: '08:00',
        excludedDays: [],
        active
      },
      {
        time: '09:30',
        excludedDays: [],
        active
      },
      {
        time: '10:30',
        excludedDays: [],
        active
      },
      {
        time: '11:30',
        excludedDays: [],
        active
      },
      {
        time: '12:30',
        excludedDays: [],
        active
      },
      {
        time: '14:00',
        excludedDays: [],
        active
      },
      {
        time: '15:30',
        excludedDays: [],
        active
      },
      {
        time: '17:00',
        excludedDays: [],
        active
      },
      {
        time: '18:30',
        excludedDays: [],
        active
      },
      {
        time: '20:00',
        excludedDays: [],
        active
      },
      {
        time: '21:30',
        excludedDays: [],
        active
      },
      {
        time: '23:30',
        excludedDays: [],
        active
      }

    ],
    // trips: [
    //   {
    //     time: '04:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '05:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '06:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '08:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '09:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '10:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '11:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '12:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '14:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '15:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '17:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '18:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '20:00',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '21:30',
    //     excludedDays: [],
    //     active,
    //   },
    //   {
    //     time: '23:30',
    //     excludedDays: [],
    //     active,
    //   },

    // ],
    passengerTypeClasses,
    cargoTypeClasses,
    createdAt,
    index: index++
  }
]
