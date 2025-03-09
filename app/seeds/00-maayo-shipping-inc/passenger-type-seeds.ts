import { seed_active, seed_createdAt } from './index-seeds'
import { seed_nineYearsBelowClass, seed_pwdClass, seed_regularClass, seed_seniorClass, seed_studentClass, seed_twoYearsBelowClass } from './passenger-type-class-seeds'

let passengerIndex = 0
const active = seed_active
const createdAt = seed_createdAt
// const verify = true
export const seed_passengerTypes: PassengerType[] = [
  {
    id: 'pt-regular',
    name: 'Regular',
    description: 'Regular Passenger',
    index: passengerIndex++,
    // verify: false,
    // ageRange: {
    //   min: 10,
    //   max: 59,
    // },
    class: seed_regularClass,
    active,
    createdAt
  },
  {
    id: 'pt-student',
    name: 'Student',
    description: 'Student with ID',
    index: passengerIndex++,
    // verify,
    // ageRange: {
    //   min: 10,
    //   max: 59,
    // },
    class: seed_studentClass,
    active,
    createdAt
  },
  {
    id: 'pt-senior',
    name: 'Senior',
    description: 'Senior Citizen',
    index: passengerIndex++,
    // verify,
    // ageRange: {
    //   min: 60,
    //   max: 200,
    // },
    class: seed_seniorClass,
    active,
    createdAt
  },
  {
    id: 'pt-pwd',
    name: 'PWD',
    description: 'Person with Disability',
    index: passengerIndex++,
    // verify,
    // ageRange: {
    //   min: 10,
    //   max: 200,
    // },
    class: seed_pwdClass,
    active,
    createdAt
  },
  {
    id: 'pt-9-yrs-below',
    name: '9 Yrs & Below',
    description: '9 Yrs & Below',
    index: passengerIndex++,
    // verify: false,
    // ageRange: {
    //   min: 3,
    //   max: 9,
    // },
    class: seed_nineYearsBelowClass,
    active,
    createdAt
  },
  {
    id: 'pt-2-yrs-below',
    name: '2 Yrs & Below',
    description: '2 Yrs & Below',
    index: passengerIndex++,
    // verify: false,
    class: seed_twoYearsBelowClass,
    active,
    createdAt
  }
]
