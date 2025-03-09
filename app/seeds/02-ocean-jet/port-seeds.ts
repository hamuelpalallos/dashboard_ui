const createdDate = new Date(CREATED_AT_STRING)

export const seed_port_cebu: Port = {
  id: 'pr-ocj-cebu',
  name: 'Cebu',
  active: true,
  code: 'CEB',
  address: {
    modular: false,
    text: 'Cebu, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_surigao: Port = {
  id: 'pr-ocj-surigao',
  name: 'Surigao',
  active: true,
  code: 'SUR',
  address: {
    modular: false,
    text: 'Surigao, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_getafe: Port = {
  id: 'pr-ocj-getafe',
  name: 'Getafe',
  code: 'GET',
  active: true,
  address: {
    modular: false,
    text: 'Getafe, Bohol, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_maasin: Port = {
  id: 'pr-ocj-maasin',
  name: 'Maasin',
  code: 'MAA',
  active: true,
  address: {
    modular: false,
    text: 'Maasin, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_ormoc: Port = {
  id: 'pr-ocj-ormoc ',
  name: 'Ormoc ',
  code: 'ORM',
  active: true,
  address: {
    modular: false,
    text: 'Ormoc, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_palompon: Port = {
  id: 'pr-ocj-palompon ',
  name: 'Palompon ',
  code: 'PAL',
  active: true,
  address: {
    modular: false,
    text: 'Palompon, Philippines'
  },
  createdAt: createdDate
}

export const seed_port_siquijor: Port = {
  id: 'pr-ocj-siquijor ',
  name: 'Siquijor ',
  code: 'SIQ',
  active: true,
  address: {
    modular: false,
    text: 'Siquijor, Negros Oriental, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_tagbilaran: Port = {
  id: 'pr-ocj-tagbilaran',
  name: 'Tagbilaran',
  code: 'TAG',
  active: true,
  address: {
    modular: false,
    text: 'Tagbilaran, Bohol, Philippines'
  },
  createdAt: createdDate
}

export const seed_port_bacolod: Port = {
  id: 'pr-ocj-bacolod',
  name: 'Bacolod',
  code: 'BAC',
  active: true,
  address: {
    modular: false,
    text: 'Bacolod, Negros Occidental, Philippines'
  },
  createdAt: createdDate
}

export const seed_port_iloilo: Port = {
  id: 'pr-ocj-iloilo',
  name: 'Iloilo',
  code: 'ILO',
  active: true,
  address: {
    modular: false,
    text: 'Iloilo, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_batangas: Port = {
  id: 'pr-batangas',
  name: 'Batangas',
  code: 'BAT',
  active: true,
  address: {
    modular: false,
    text: 'Batangas, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_calapan: Port = {
  id: 'pr-calapan',
  name: 'Calapan',
  code: 'CAL',
  active: true,
  address: {
    modular: false,
    text: 'Calapan, Philippines'
  },
  createdAt: createdDate
}
export const seed_port_dumaguete: Port = {
  id: 'pr-dumaguete',
  name: 'Dumaguete',
  code: 'DUM',
  active: true,
  address: {
    modular: false,
    text: 'Dumaguete, Negros Oriental, Philippines'
  },
  createdAt: createdDate
}
export const all: Port[] = [
  seed_port_cebu,
  seed_port_getafe,
  seed_port_maasin,
  seed_port_ormoc,
  seed_port_palompon,
  seed_port_siquijor,
  seed_port_tagbilaran,
  seed_port_bacolod,
  seed_port_iloilo,
  seed_port_batangas,
  seed_port_calapan,
  seed_port_dumaguete,
  seed_port_surigao
]
export const ports: { [key: string]: Port } = {
  cebu: seed_port_cebu,
  getafe: seed_port_getafe,
  maasin: seed_port_maasin,
  ormoc: seed_port_ormoc,
  palompon: seed_port_palompon,
  siquijor: seed_port_siquijor,
  tagbilaran: seed_port_tagbilaran,
  bacolod: seed_port_bacolod,
  iloilo: seed_port_iloilo,
  batangas: seed_port_batangas,
  calapan: seed_port_calapan,
  dumaguete: seed_port_dumaguete,
  surigao: seed_port_surigao
}
