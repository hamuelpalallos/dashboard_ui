import { seed_active, seed_createdAt } from './index-seeds'
import { clss } from './passenger-type-class-seeds'
import { ports } from './port-seeds'

const createdAt = seed_createdAt
const active = seed_active
const activeSchedule = true
const capacity: RouteCapacity = {
  cargo: 0,
  passenger: 50,
  cargoTypeFootprints: []
}

const cargoTypeClasses: RouteCargoTypeClass[] = []
const excludedDays: DayOfWeek[] = []
let index = 0

const seed_route_bacolod_iloilo = {
  id: `ocj-rt-${ports.bacolod?.code}-${ports.iloilo?.code}`,
  origin: ports.bacolod,
  destination: ports.iloilo,
  active,
  capacity,
  schedules: [
    {
      time: '05:45',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '08:50',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '16:00',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 550
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 550
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 800
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}

const seed_route_iloilo_bacolod: Route = {
  id: `ocj-rt-${ports.iloilo?.code}-${ports.bacolod?.code}`,
  origin: ports.iloilo,
  destination: ports.bacolod,
  active,
  capacity,
  schedules: [
    {
      time: '07:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '11:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '14:30',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '17:30',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 550
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 550
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 800
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_batangas_calapan = {
  id: `ocj-rt-${ports.batangas?.code}-${ports.calapan?.code}`,
  origin: ports.batangas,
  destination: ports.calapan,
  active,
  capacity,
  schedules: [
    {
      time: '07:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '11:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '14:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '17:40',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 600
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 600
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 850
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_calapan_batangas = {
  id: `ocj-rt-${ports.calapan?.code}-${ports.batangas?.code}`,
  origin: ports.calapan,
  destination: ports.batangas,
  active,
  capacity,
  schedules: [
    {
      time: '05:50',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '09:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '12:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '16:00',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 600
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 600
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 850
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_cebu_getafe = {
  id: `ocj-rt-${ports.cebu?.code}-${ports.getafe?.code}`,
  origin: ports.cebu,
  destination: ports.getafe,
  active,
  capacity,
  schedules: [
    {
      time: '06:30',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '10:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '13:30',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '17:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '18:45',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 450
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 450
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 800
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_getafe_cebu = {
  id: `ocj-rt-${ports.getafe?.code}-${ports.cebu?.code}`,
  origin: ports.getafe,
  destination: ports.cebu,
  active,
  capacity,
  schedules: [
    {
      time: '06:30',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '08:15',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '11:45',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '15:15',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '18:45',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 450
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 450
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 800
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_cebu_maasin = {
  id: `ocj-rt-${ports.cebu?.code}-${ports.maasin?.code}`,
  origin: ports.cebu,
  destination: ports.maasin,
  active,
  capacity,
  schedules: [
    {
      time: '07:00',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 1100
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 1100
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1600
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_maasin_cebu = {
  id: `ocj-rt-${ports.maasin?.code}-${ports.cebu?.code}`,
  origin: ports.maasin,
  destination: ports.cebu,
  active,
  capacity,
  schedules: [
    {
      time: '15:30',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 1100
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 1100
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1600
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_cebu_ormoc = {
  id: `ocj-rt-${ports.cebu?.code}-${ports.ormoc?.code}`,
  origin: ports.cebu,
  destination: ports.ormoc,
  active,
  capacity,
  schedules: [
    {
      time: '06:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '09:30',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '16:30',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 1100
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 1100
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1600
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_ormoc_cebu = {
  id: `ocj-rt-${ports.ormoc?.code}-${ports.cebu?.code}`,
  origin: ports.ormoc,
  destination: ports.cebu,
  active,
  capacity,
  schedules: [
    {
      time: '06:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '09:30',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '16:30',
      excludedDays,
      active: activeSchedule
    }

  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 1100
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 1100
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1600
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_cebu_palompon = {
  id: `ocj-rt-${ports.cebu?.code}-${ports.palompon?.code}`,
  origin: ports.cebu,
  destination: ports.palompon,
  active,
  capacity,
  schedules: [
    {
      time: '10:00',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 1100
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 1100
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1600
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_palompon_cebu = {
  id: `ocj-rt-${ports.palompon?.code}-${ports.cebu?.code}`,
  origin: ports.palompon,
  destination: ports.cebu,
  active,
  capacity,
  schedules: [
    {
      time: '13:30',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 1100
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 1100
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1600
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_cebu_tagbilaran = {
  id: `ocj-rt-${ports.cebu?.code}-${ports.tagbilaran?.code}`,
  origin: ports.cebu,
  destination: ports.tagbilaran,
  active,
  capacity,
  schedules: [
    {
      time: '05:10',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '06:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '07:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '08:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '09:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '10:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '11:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '14:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '15:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '16:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '17:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '18:40',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 800
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 800
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1200
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_tagbilaran_cebu = {
  id: `ocj-rt-${ports.tagbilaran?.code}-${ports.cebu?.code}`,
  origin: ports.tagbilaran,
  destination: ports.cebu,
  active,
  capacity,
  schedules: [
    {
      time: '06:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '07:05',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '08:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '09:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '10:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '11:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '14:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '15:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '16:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '17:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '17:40',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '18:40',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 800
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 800
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1200
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_dumaguete_tagbilaran = {
  id: `ocj-rt-${ports.dumaguete?.code}-${ports.tagbilaran?.code}`,
  origin: ports.dumaguete,
  destination: ports.tagbilaran,
  active,
  capacity,
  schedules: [
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 900
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 900
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1400
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_tagbilaran_dumaguete = {
  id: `ocj-rt-${ports.tagbilaran?.code}-${ports.dumaguete?.code}`,
  origin: ports.tagbilaran,
  destination: ports.dumaguete,
  active,
  capacity,
  schedules: [
    {
      time: '10:40',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 900
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 900
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1400
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_dumaguete_siquijor = {
  id: `ocj-rt-${ports.dumaguete?.code}-${ports.siquijor?.code}`,
  origin: ports.dumaguete,
  destination: ports.siquijor,
  active,
  capacity,
  schedules: [
    {
      time: '07:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '11:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '19:10',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 350
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 350
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 580
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_siquijor_dumaguete = {
  id: `ocj-rt-${ports.siquijor?.code}-${ports.dumaguete?.code}`,
  origin: ports.siquijor,
  destination: ports.dumaguete,
  active,
  capacity,
  schedules: [
    {
      time: '06:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '10:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '12:00',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '18:00',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 350
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 350
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 580
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_surigao_maasin = {
  id: `ocj-rt-${ports.surigao?.code}-${ports.maasin?.code}`,
  origin: ports.surigao,
  destination: ports.maasin,
  active,
  capacity,
  schedules: [
    {
      time: '13:00',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 800
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 800
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1200
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_maasin_surigao = {
  id: `ocj-rt-${ports.maasin?.code}-${ports.surigao?.code}`,
  origin: ports.maasin,
  destination: ports.surigao,
  active,
  capacity,
  schedules: [
    {
      time: '10:30',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 800
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 800
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1200
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_siquijor_tagbilaran = {
  id: `ocj-rt-${ports.siquijor?.code}-${ports.tagbilaran?.code}`,
  origin: ports.siquijor,
  destination: ports.tagbilaran,
  active,
  capacity,
  schedules: [
    {
      time: '08:20',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '14:30',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 800
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 800
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1200
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
const seed_route_tagbilaran_siquijor = {
  id: `ocj-rt-${ports.tagbilaran?.code}-${ports.siquijor?.code}`,
  origin: ports.tagbilaran,
  destination: ports.siquijor,
  active,
  capacity,
  schedules: [
    {
      time: '07:30',
      excludedDays,
      active: activeSchedule
    },
    {
      time: '15:20',
      excludedDays,
      active: activeSchedule
    }
  ],
  passengerTypeClasses: [
    {
      id: clss.openAir.id,
      class: clss.openAir,
      rate: 800
    },
    {
      id: clss.tourist.id,
      class: clss.tourist,
      rate: 800
    },
    {
      id: clss.business.id,
      class: clss.business,
      rate: 1200
    }
  ],
  cargoTypeClasses,
  createdAt,
  index: index++
}
export const all: Route[] = [
  seed_route_bacolod_iloilo,
  seed_route_iloilo_bacolod,
  seed_route_batangas_calapan,
  seed_route_calapan_batangas,
  seed_route_cebu_getafe,
  seed_route_getafe_cebu,
  seed_route_cebu_maasin,
  seed_route_maasin_cebu,
  seed_route_cebu_ormoc,
  seed_route_ormoc_cebu,
  seed_route_cebu_palompon,
  seed_route_palompon_cebu,
  seed_route_cebu_tagbilaran,
  seed_route_tagbilaran_cebu,
  seed_route_dumaguete_tagbilaran,
  seed_route_tagbilaran_dumaguete,
  seed_route_dumaguete_siquijor,
  seed_route_siquijor_dumaguete,
  seed_route_surigao_maasin,
  seed_route_maasin_surigao,
  seed_route_siquijor_tagbilaran,
  seed_route_tagbilaran_siquijor
]

export const routes: { [key: string]: Route } = {
  bacolod_iloilo: seed_route_bacolod_iloilo,
  iloilo_bacolod: seed_route_iloilo_bacolod,
  batangas_calapan: seed_route_batangas_calapan,
  calapan_batangas: seed_route_calapan_batangas,
  cebu_getafe: seed_route_cebu_getafe,
  getafe_cebu: seed_route_getafe_cebu,
  cebu_maasin: seed_route_cebu_maasin,
  maasin_cebu: seed_route_maasin_cebu,
  cebu_ormoc: seed_route_cebu_ormoc,
  ormoc_cebu: seed_route_ormoc_cebu,
  cebu_palompon: seed_route_cebu_palompon,
  palompon_cebu: seed_route_palompon_cebu,
  cebu_tagbilaran: seed_route_cebu_tagbilaran,
  tagbilaran_cebu: seed_route_tagbilaran_cebu,
  dumaguete_tagbilaran: seed_route_dumaguete_tagbilaran,
  tagbilaran_dumaguete: seed_route_tagbilaran_dumaguete,
  dumaguete_siquijor: seed_route_dumaguete_siquijor,
  siquijor_dumaguete: seed_route_siquijor_dumaguete,
  surigao_maasin: seed_route_surigao_maasin,
  maasin_surigao: seed_route_maasin_surigao,
  siquijor_tagbilaran: seed_route_siquijor_tagbilaran,
  tagbilaran_siquijor: seed_route_tagbilaran_siquijor
}
