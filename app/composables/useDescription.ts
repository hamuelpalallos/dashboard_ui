import pluralize from 'pluralize'

const empty_default = '_ _'

export function useDescription() {
  const route = (route: Route): string => {
    let desc = route.description
    if (!desc) {
      const origin = route.origin?.name ?? 'Origin'
      const destination = route.destination?.name ?? 'Destination'
      const passenger = route.capacity?.passenger ?? 0
      const cargo = route.capacity?.cargo ?? 0
      const passengerTypeClasses = route.passengerTypeClasses?.map(type => type.name).join(', ')
      const cargoTypeClasses = route.cargoTypeClasses?.map(type => type.name).join(', ')

      desc = `Route from ${origin} to ${destination} with ${passenger} passenger and ${cargo} cargo capacity.`
      if (passengerTypeClasses) desc += ` Passenger class: ${passengerTypeClasses}.`
      if (cargoTypeClasses) desc += ` Cargo class: ${cargoTypeClasses}.`
    }
    return desc
  }

  const role = (role?: UserRole, placeholder = empty_default) => {
    switch (role) {
      case 'super-admin':
        return 'Manages the whole system'
      case 'company-admin':
        return 'Manages the company'
      case 'port-admin':
        return 'Manages the port & port conductors & inspectors'
      case 'port-conductor':
        return 'Verifies the tickets, passengers & cargos'
      case 'port-inspector':
        return 'Inspects the tickets, passengers & cargos'
      default:
        return placeholder
    }
  }

  const trip_cancellation = (tripCancellation: TripCancellation): string => {
    const format = useFormat()
    let desc = tripCancellation.description
    if (!desc) {
      const title = tripCancellation.title ?? 'Some reason'
      const dateSetting = format.date_setting(tripCancellation.dateSetting)
      const routeNames = tripCancellation.routes?.map((r, idx) => `\n\t${idx + 1}. ${new RouteInstance(r).name}`).join('')

      desc = `Cancelled Trips\nDue to: ${title}\nOn the following ${pluralize('route', tripCancellation?.routes?.length)}: ${routeNames}`
      if (dateSetting) desc += `\nStarting: ${dateSetting}.`
      desc += `\nWe appreciate your understanding and patience. Thank you for your kind consideration.`
    }
    return desc
  }

  const weight_unit = (unit: WeightUnit, placeholder = 'Default'): string => {
    switch (unit) {
      case 'gram':
        return 'Grams'
      case 'kilogram':
        return 'Kilograms'
      case 'tonne':
        return 'Tonnes'
      default:
        return placeholder
    }
  }
  const length_unit = (unit: LengthUnit, placeholder = 'Default'): string => {
    switch (unit) {
      case 'millimeter':
        return 'Millimeters'
      case 'centimeter':
        return 'Centimeters'
      case 'meter':
        return 'Meters'
      case 'kilometer':
        return 'Kilometers'
      default:
        return placeholder
    }
  }

  const footprint_size = (size?: number, placeholder = 'Generic'): string => {
    switch (size) {
      case CARGO_TYPE_FOOTPRINT_SIZE_BICYCLE:
        return 'Bicycle'
      case CARGO_TYPE_FOOTPRINT_SIZE_MOTORCYCLE:
        return 'Motorcycle'
      case CARGO_TYPE_FOOTPRINT_SIZE_ATV:
        return 'ATV'
      case CARGO_TYPE_FOOTPRINT_SIZE_CARRIER:
        return 'Carrier'
      case CARGO_TYPE_FOOTPRINT_SIZE_CAR_SMALL:
        return 'Car Small'
      case CARGO_TYPE_FOOTPRINT_SIZE_CAR_MEDIUM:
        return 'Car Medium'
      case CARGO_TYPE_FOOTPRINT_SIZE_CAR_LARGE:
        return 'Car Large'
      case CARGO_TYPE_FOOTPRINT_SIZE_TRUCK:
        return 'Truck'
      default:
        return placeholder
    }
  }

  const passenger = (p?: Passenger, placeholder = 'Passenger'): string => {
    if (!p) return placeholder
    let desc = p?.type?.free ? 'Free passenger' : 'Paid passenger'
    desc = `${desc} from Ticket: ${p.ticketSnapshot?.id}`
    desc = !p.cargoSnapshot ? '.' : `${desc}, included in Vehicle (${p.cargoSnapshot?.type?.name}) with plate no.: [${p.cargoSnapshot.plate}].`
    return desc
  }

  return {
    passenger,
    length_unit,
    footprint_size,
    weight_unit,
    trip_cancellation,
    route,
    role
  }
}
