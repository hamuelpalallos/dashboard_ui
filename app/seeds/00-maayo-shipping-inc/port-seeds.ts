const createdDate = new Date(CREATED_AT_STRING)

export const seed_portBato: Port = {
  id: 'pr-bato',
  name: 'Bato',
  active: true,
  address: {
    modular: false,
    text: 'F852+GHP, Maayo Wharf, Santander, Cebu, Philippines'
  },
  createdAt: createdDate
}
export const seed_portTampi: Port = {
  id: 'pr-tampi',
  name: 'Tampi',
  active: true,
  address: {
    modular: false,
    text: 'C6RP+G8P, San Jose, Negros Oriental, Philippines'
  },
  createdAt: createdDate
}
export const seed_portLarena: Port = {
  id: 'pr-larena',
  name: 'Larena',
  active: true,
  address: {
    modular: false,
    text: '7H2R+5MQ, Larena, Siquijor, Philippines'
  },
  createdAt: createdDate
}
export const seed_portLiloan: Port = {
  id: 'pr-liloan',
  name: 'Liloan',
  active: true,
  address: {
    modular: false,
    text: 'C883+Q4P, Santander, 6026 Cebu, Philippines'
  },
  createdAt: createdDate
}
export const seed_portSibulan: Port = {
  id: 'pr-sibulan',
  name: 'Sibulan',
  active: true,
  address: {
    modular: false,
    text: 'Sibulan, 6201 Negros Oriental, Philippines'
  },
  createdAt: createdDate
}
export const seed_ports: Port[] = [
  seed_portBato,
  seed_portTampi,
  seed_portLarena,
  seed_portLiloan,
  seed_portSibulan
]
