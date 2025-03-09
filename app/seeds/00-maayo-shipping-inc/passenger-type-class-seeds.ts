import { seed_active, seed_createdAt } from './index-seeds'

const createdAt = seed_createdAt
const active = seed_active
const verify = true

const fee: Fee = {
  type: 'percent-min',
  fixed: 0,
  min: 15,
  max: 0,
  percent: 6,
  createdAt
}
const freeFee: Fee = {
  type: 'fixed',
  fixed: 0,
  min: 0,
  max: 0,
  percent: 0
}
// interface PassengerTypeClass {
//   id: string
//   name: string
//   description: string
//   rate: number
//   active: boolean
//   fee: Fee
//   createdAt: Date
// }

export const seed_regularClass: PassengerTypeClass = {
  id: 'pt-cl-regular',
  name: 'Regular',
  ageRange: {
    type: 'min',
    min: 10,
    max: 0
  },
  description: 'Regular',
  rate: 130,
  verify: false,
  fee,
  active,
  createdAt
}

export const seed_studentClass: PassengerTypeClass = {
  id: 'pt-cl-student',
  name: 'Student',
  description: 'Student',
  ageRange: {
    type: 'min-max',
    min: 10,
    max: 59
  },
  rate: 110,
  fee,
  verify,
  active,
  createdAt
}

export const seed_seniorClass: PassengerTypeClass = {
  id: 'pt-cl-senior',
  name: 'Senior',
  description: 'Senior Citizen',
  ageRange: {
    type: 'min',
    min: 60,
    max: 0
  },
  rate: 90,
  fee,
  verify,
  active,
  createdAt
}

export const seed_pwdClass: PassengerTypeClass = {
  id: 'pt-cl-pwd',
  name: 'PWD',
  description: 'Person with Disability',
  rate: 90,
  ageRange: {
    type: 'min',
    min: 10,
    max: 0
  },
  verify,
  fee,
  active,
  createdAt
}

export const seed_nineYearsBelowClass: PassengerTypeClass = {
  id: 'pt-cl-9-yrs-below',
  name: '9 Yrs & Below',
  description: '9 Yrs & Below',
  ageRange: {
    type: 'min-max',
    min: 3,
    max: 9
  },
  rate: 65,
  verify,
  fee,
  active,
  createdAt
}

export const seed_twoYearsBelowClass: PassengerTypeClass = {
  id: 'pt-cl-2-yrs-below',
  rate: 0,
  name: '2 Yrs & Below',
  description: '2 Yrs & Below',
  ageRange: {
    type: 'max',
    min: 0,
    max: 2
  },
  fee: freeFee,
  verify,
  active,
  createdAt
}

export const seed_passengerTypeClasses: PassengerTypeClass[] = [
  seed_regularClass,
  seed_studentClass,
  seed_seniorClass,
  seed_pwdClass,
  seed_nineYearsBelowClass,
  seed_twoYearsBelowClass
]
