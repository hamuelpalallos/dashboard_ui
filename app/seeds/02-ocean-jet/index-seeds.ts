export const seed_createdAt: Date = new Date(CREATED_AT_STRING)
export const seed_active = false

export const seed_fee: Fee = {
  type: 'percent-min',
  fixed: 0,
  min: 15,
  max: 0,
  percent: 6
}

export const seed_company_ocean_jet: Company = {
  id: '02-ocean-jet',
  name: 'Ocean Jet',
  active: true,
  type: 'sea',
  website: 'www.oceanjet.net',
  config: {
    type: 'external',
    withCargo: false
  },
  createdAt: seed_createdAt
}
