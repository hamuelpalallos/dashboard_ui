// import { DATE_ATTRIBUTES } from '~/constants/default-constants'
// import { LengthInstance } from '~/instances/length-instance'

import { DATETIME_ATTRIBUTES } from '~/constants/default-constants'

export function useConstants() {
  // const format = useFormat()
  const allSex: Sex[] = [...SEXES]
  const description = useDescription()
  const { capitalize } = useFormat()

  // const allRoles: UserRole[] = ['company-admin', 'port-admin', 'port-conductor']
  const allRoles: UserRole[] = [...USER_ROLES]

  // const dateAttributes = [
  //   'createdAt',
  //   'updatedAt',
  //   'startedAt',
  //   'endedAt',
  //   'expiredAt',
  //   'issuedAt',
  //   'birthdate',
  //   // 'departure',
  //   'departure',
  //   'arrival',
  //   'departure',
  //   'returnedAt',
  //   'arrivedAt',
  //   'approvedAt',
  //   'inspectedAt',
  //   'returnedAt',
  //   // 'arrival',
  //   // 'returnDate',
  //   'cancelledAt',
  //   'paidAt',
  //   'usedAt',
  //   'deletedAt',
  //   'completedAt',
  //   'timestamp',
  //   'date',
  // ]

  const dateAttributes: DateAttribute[] = [...DATETIME_ATTRIBUTES]

  const sexOptions = allSex.map((sex) => ({
    label: capitalize(sex),
    value: sex,
  }))

  const roleOptions = allRoles.map((role) => ({
    label: useFormat().role(role),
    value: role,
  }))

  // const footprintOptions = [
  //   {
  //     label: 'Bicycle',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_BICYCLE,
  //   },
  //   {
  //     label: 'Motorcycle',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_MOTORCYCLE,
  //   },
  //   {
  //     label: 'ATV',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_ATV,
  //   },
  //   {
  //     label: 'Carrier',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_CARRIER,
  //   },
  //   {
  //     label: 'Car Small',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_CAR_SMALL,
  //   },
  //   {
  //     label: 'Car Medium',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_CAR_MEDIUM,
  //   },
  //   {
  //     label: 'Car Large',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_CAR_LARGE,
  //   },
  //   {
  //     label: 'Car XL',
  //     value: CARGO_TYPE_FOOTPRINT_SIZE_CAR_XL,
  //   },
  // ]

  const footprintOptions = CARGO_TYPE_FOOTPRINT_SIZES.map((size) => ({
    label: description.footprint_size(size),
    value: size,
  }))

  const weightUnitOptions = WEIGHT_UNITS.map((unit) => ({
    label: description.weight_unit(unit),
    value: unit,
  }))

  // exclude the 'kilometer' unit
  const lengthUnitOptions = LENGTH_UNITS.filter((unit) => unit !== 'kilometer').map((unit) => ({
    label: LengthInstance.unitNames[unit],
    value: unit,
  }))

  return {
    lengthUnitOptions,
    weightUnitOptions,
    allRoles,
    allSex,
    sexOptions,
    roleOptions,
    dateAttributes,
    footprintOptions,
  }
}
