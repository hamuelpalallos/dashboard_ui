import { Timestamp } from 'firebase/firestore'
import pluralize from 'pluralize'
import { formatDistance, subMinutes } from 'date-fns'

const empty_default = '_ _'
export const useFormat = () => {
  const nxt = useNuxtApp()
  const utils = useUtils()
  const intl = nxt.vueApp.config.globalProperties.$intl

  // const utils = useUtils()

  // console.log('FROM INTL: ', $intl)
  // const intl = nxt.vueApp.config.globalProperties.$intl
  // const test = () => {
  //   console.log('FROM INTL NUXT: ', nxt)
  //   console.log('FROM INTL: ', intl.formatNumber(1000000))
  //   console.log('FROM INTL COMP: ', intl)
  // }

  const text = (text?: string, placeholder = empty_default): string => {
    if (!text)
      return placeholder
    return text
  }

  const truncate = (text?: string, length = 32, placeholder = empty_default) => {
    if (!text) return placeholder
    if (text.length <= length)
      return text
    return text.substring(0, length - 3) + '...'
  }

  const date = (date?: Date, placeholder = empty_default): any => {
    if (!date) {
      return placeholder
    }
    return intl.formatDate(date ?? new Date(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const date_relative = (date?: Date, placeholder = empty_default): string => {
    if (!date)
      return placeholder
    return formatDistance(subMinutes(new Date(), 5), date)
  }

  const time = (date?: Date, placeholder = ''): any => {
    // if (!date) return undefined
    if (!date)
      return placeholder
    return intl.formatTime(date, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  const date_short = (date?: Date, nullable = false, placeholder = empty_default) => {
    if (!date && nullable)
      return undefined
    if (!date && placeholder)
      return placeholder
    return intl.formatDate(date ?? new Date(), {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const datetime_short = (date?: Date, placeholder = '') => {
    if (!date)
      return placeholder
    return intl.formatDate(date, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  const types = (types?: string[]) => {
    if (!types)
      return undefined
    return types.join(', ')
  }

  const formatDate = (date: Date | undefined) => {
    return intl.formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateTime = (date?: Date) => {
    if (!date)
      return ''
    return intl.formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  const formatDateObject = (dateObject: any) => {
    return formatDate(utils.objectToDate(dateObject))
  }
  const formatDateTimeObject = (dateObject: any) => {
    return formatDateTime(utils.objectToDate(dateObject))
  }

  const capitalize = (text?: string, placeholder = empty_default): any => {
    if (!text || text === '')
      return placeholder
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  // const name = (nm?: UserName, nullable = false, placeholder?: string): any => {
  //   if (!nm && nullable)
  //     return undefined
  //   if (!nm && placeholder)
  //     return placeholder ?? empty_default
  //   let nme = `${nm?.first ?? ''} ${nm?.last ?? ''}`
  //   if (!nm?.first || !nm?.last)
  //     nme = nm?.display ?? placeholder ?? empty_default
  //   return nme
  // }

  const name = (nm?: UserName, placeholder = 'User'): any => {
    if (!nm)
      return placeholder ?? empty_default
    let nme = `${nm?.first ?? ''} ${nm?.last ?? ''}`
    if (!nm?.first || !nm?.last)
      nme = nm?.display ?? placeholder ?? empty_default
    return nme
  }

  const user = (user?: User, placeholder = empty_default): string => {
    if (!user)
      return placeholder
    return name(user.name)
  }

  const email = (
    email?: string,
    nullable = false,
    placeholder?: string
  ): any => {
    if (!email && nullable)
      return undefined
    if (!email && placeholder)
      return placeholder
    return email
  }

  const str_empty = (str?: string, placeholder = empty_default) => {
    return str ?? placeholder
  }

  const currency = (value?: number) => {
    return intl.formatNumber(value ?? 0, {
      style: 'currency',
      currency: 'PHP'
    })
  }

  const currency_text = (value?: number, placeholder = empty_default) => {
    // return intl.formatNumber(value ?? 0, {
    //   style: 'currency',
    //   currency: 'PHP',
    // }) // this return $1,000.00

    // format the number to currency not symbol just PHP 1,000.00
    if (!value) return placeholder
    return intl.formatNumber(value ?? 0, {
      style: 'currency',
      currency: 'PHP',
      currencyDisplay: 'code'
    })
    // return intl.formatNumber(value ?? 0, {
    //   style: 'decimal',
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // })
  }

  const payment = (payment?: Payment, placeholder = 'unpaid'): string => {
    if (!payment) {
      return placeholder
    }
    return `${currency(payment.amount)} - ${payment.method ?? ''}`
  }

  const phone = (phone?: Phone, nullable = false, placeholder?: string): any => {
    if (!phone && nullable)
      return undefined
    if (!phone && placeholder)
      return placeholder
    if (phone?.modular)
      return `${phone?.countryCode ?? ''}${phone?.number ?? ''}`
    return phone?.text ?? empty_default
  }

  const port = (port?: Port, placeholder = empty_default): string => {
    if (!port)
      return placeholder
    return port?.name ?? empty_default
  }

  // since default word is reserved what should be the name of this function?
  const datetime = (date?: Date, placeholder = empty_default): any => {
    if (!date) {
      return placeholder
    }
    return intl.formatDate(date ?? placeholder, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  const departure = datetime
  const departure_return = (date?: Date, placeholder = 'N/A') => datetime(date, placeholder)
  // const ticket_departure = (ticket?: Ticket, placeholder = empty_default) => {
  //   if (!ticket) return placeholder
  //   return datetime(ticket.departure)
  // }

  const route = (route?: Route, placeholder = empty_default): any => {
    if (!route) return placeholder
    return `${route?.origin?.name ?? 'Port'} - ${route?.destination?.name ?? 'Port'}`
    // return `${route?.origin?.name ?? 'Port'} - ${route?.destination?.name ?? 'Port'}`
  }

  const ticket_route = (ticket?: Ticket, placeholder = empty_default) => {
    if (!ticket) return placeholder
    return `${route(ticket.route)} (${ticket.roundTrip ? 'Round Trip' : 'One Way'})`
  }

  const route_snapshot = (
    route?: RouteSnapshot,
    placeholder = empty_default
  ): any => {
    if (!route) return placeholder
    return `${route?.originSnapshot?.name ?? 'Port'} - ${route?.destinationSnapshot?.name ?? 'Port'}`
  }

  const routes = (routes?: Route[], placeholder = empty_default): string => {
    if (!routes)
      return placeholder
    return routes.map(r => route(r)).join(', ')
  }

  const integer = (value?: number) => {
    return intl.formatNumber(value ?? 0, {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const conductor_status = (status?: CompanyAuthority) => {
    if (!status)
      return 'inactive'
    if (status.expiredAt && status.expiredAt < new Date())
      return 'expired'
    if (status.code)
      return 'active'
    return 'inactive'
  }

  // const age = (birthdate?: Date | string) => {
  //   if (!birthdate)
  //     return ''
  //   if (birthdate instanceof Timestamp) {
  //     birthdate = birthdate.toDate()
  //   }
  //   const today = new Date()
  //   const birthDate = new Date(birthdate)
  //   let age = today.getFullYear() - birthDate.getFullYear()
  //   const m = today.getMonth() - birthDate.getMonth()
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--
  //   }
  //   return age.toString()
  // }

  const age = (birthdate?: Date, placeholder = empty_default) => {
    if (!birthdate)
      return placeholder
    if (birthdate instanceof Timestamp) {
      birthdate = birthdate.toDate()
    }
    const { calculateAge } = useUtils()
    const age = calculateAge(birthdate)
    return age.toString()
  }

  const initials = (name?: UserName, placeholder = 'US'): any => {
    if (!name || (!name.first && !name.last))
      return placeholder?.toUpperCase() ?? ''
    return `${name.first?.charAt(0)?.toUpperCase() ?? ''}${name.last?.charAt(0) ?? ''}`?.toUpperCase()
  }

  const link = (link?: string, nullable = false, placeholder?: string): any => {
    if (!link && nullable)
      return undefined
    if (!link && placeholder)
      return placeholder
    return link
  }

  // const fee = (type?: { rate: number, fee: Fee, isFree?: boolean }) => {
  //   return type?.isFree ? currency(0) : currency(utils.calculateFee(type))
  // }

  const fee = <T extends FeeCalculable>(calculable?: T) => {
    return !calculable || calculable?.free ? currency(0) : currency(utils.calculateFee(calculable))
  }

  const fee_total = (type?: { rate: number, fee: Fee, isFree?: boolean }) => {
    return type?.isFree
      ? currency(0)
      : currency(utils.calculateFee(type) + (type?.rate ?? 0))
  }

  interface RateClassType {
    class?: PassengerTypeClass | CargoTypeClass
    classSnapshot?: PassengerTypeClass | CargoTypeClass
    free?: boolean
  }
  const rate = (type?: RateClassType) => {
    // return type?.free ? 'Free' : currency(type?.rate ?? 0)
    return type?.free ? 'Free' : currency(type?.class?.rate)
  }

  const rate_snapshot = (type?: RateClassType) => {
    // return type?.free ? 'Free' : currency(type?.rate ?? 0)
    return type?.free ? 'Free' : currency(type?.classSnapshot?.rate)
  }

  const ticket_rate = (ticket?: PassengerTicket) => {
    return ticket?.isFree ? 'Free' : currency(ticket?.rate ?? 0)
  }

  const ticket_type = (type?: string, placeholder = empty_default) => {
    if (!ticket)
      return placeholder
    return type ?? placeholder
  }
  const ticket_contact = (contact?: TicketContact, placeholder = empty_default): string => {
    if (!contact) return placeholder
    return `${contact.name ?? empty_default} - ${phone(contact.phone)} - ${contact.email}`
  }

  const address = (address?: Address, maxLength = 32, placeholder = empty_default): string => {
    if (!address) return placeholder
    let addressString = ''
    if (utils.isNotEmpty(address?.text))
      addressString = address!.text!
    else if (!address.modular) {
      addressString = address?.text ?? placeholder
    } else {
      addressString = `${address?.street ?? ''}, ${address?.barangay?.name ?? ''}, ${address?.city?.name ?? ''
      }, ${address?.province?.name ?? ''}, ${address?.region?.name ?? ''}, ${address?.country ?? ''
      }`
    }
    return truncate(addressString, maxLength)
  }

  const address_short = (address?: string, placeholder = empty_default, maxLength = 32): any => {
    if (!address) return placeholder
    // Remove the first text before the comma
    const addressParts = address.split(',')
    addressParts.shift()
    let shortenedAddress = addressParts.join(',')

    shortenedAddress = truncate(shortenedAddress, maxLength, placeholder)
    return shortenedAddress
  }

  const str_bool = (value?: boolean, t = 'Yes', f = 'No') => {
    return value ? t : f
  }

  const str_fee_items = (fees?: FeeItem[]) => {
    if (!fees || fees.length < 1)
      return empty_default
    // show only the first item name of the fee and the fee string, and others are just "+2" or "+3" depending on the length of the array excluding the first item
    const first = fees[0]
    const rest = fees.slice(1)
    const rest_count = rest.length
    const rest_str = rest_count > 0 ? `+${rest_count}` : empty_default
    return `${first?.name} - ${str_fee(first?.fee)} ${rest_str}`
  }

  const str_fee = (fee?: Fee) => {
    if (!fee)
      return empty_default

    const { type, percent, min, max, fixed } = fee

    switch (type) {
      case 'percent':
        return `${percent}%`
      case 'fixed':
        return currency(fixed)
      case 'percent-min':
        return `${percent}% > ${currency(min)}`
      case 'percent-max':
        return `${percent}% < ${currency(max)}`
      case 'percent-min-max':
        return `${percent}% > ${currency(min)} < ${currency(max)}`
      default:
        return empty_default
    }
  }

  // format the RouteCapacity object to a string
  const route_capacity = (capacity?: RouteCapacity, placeholder = empty_default) => {
    if (!capacity)
      return placeholder
    return `${capacity.passenger} / ${capacity.cargo}`
  }

  // format any array and return the length
  const count = (array?: any[], placeholder = '0'): string => {
    if (!array) {
      return placeholder
    }
    return array?.length?.toString() ?? placeholder
  }

  const active = (active?: boolean, t = 'Active', f = 'Inactive') => {
    return active ? t : f
  }

  const count_active = (array?: any[], placeholder = '0/0') => {
    if (!array) {
      return placeholder
    }
    const activeCount = array.filter(item => item.active).length
    return `${activeCount} / ${array.length}`
  }

  const age_range = (age?: NumberRange) => {
    if (!age)
      return empty_default
    switch (age.type) {
      case 'any':
        return 'Any'
      case 'min-max':
        return `${age.min} - ${age.max}`
      case 'min':
        return `${age.min} +`
      case 'max':
        return `${age.max} & below`
      default:
        return `${age.min} - ${age.max}`
    }
  }

  const index = (index?: number, placeholder = '0') => {
    if (!index) {
      return placeholder
    }
    return index.toString()
  }

  const description = (description?: string) => {
    if (!description)
      return empty_default
    return description
  }

  const role = (role?: UserRole) => {
    switch (role) {
      case 'super-admin':
        return 'Tripket PH Administrator'
      case 'company-admin':
        return 'Company Administrator'
      case 'port-admin':
        return 'Port Administrator'
      case 'port-conductor':
        return 'Port Conductor'
      default:
        return empty_default
    }
  }

  const role_description = (role?: UserRole) => {
    const desc = useDescription()
    return desc.role(role)
  }

  const date_setting = (setting?: DateSetting, placeholder = empty_default): any => {
    if (!setting) return placeholder

    switch (setting?.type) {
      case 'single':
        if (setting.mode === 'time') return time(setting.single, placeholder)
        if (setting.mode === 'date') return date(setting.single, placeholder)
        return datetime(setting.single, placeholder)
      case 'range':
        if (setting.mode === 'date') {
          return `${date_short(setting.range?.start)} until ${date_short(setting.range?.end)}`
        }
        return `${datetime(setting.range?.start)} until ${datetime(setting.range?.end)}`
      case 'multiple':
        if (setting.multiple) {
          const dates = setting.multiple.map(d => date(d))
          const uniqueMonths = [...new Set(dates.map(d => d.getMonth()))]
          if (uniqueMonths.length === 1) {
            // If all dates are in the same month, format as 'January 3, 2, 4, and 5'
            const dayAndMonth = dates.map(d => `${d.getDate()}`)
            const lastDay = dayAndMonth.pop()
            return `${dates[0].toLocaleString('default', { month: 'long' })} ${dayAndMonth.join(', ')}, and ${lastDay}`
          } else {
            // If dates are in different months, format each date individually
            return dates.join(', ')
          }
        }
        break
      case 'multiple-range':
        if (setting.multipleRange) {
          const firstRange = setting.multipleRange[0]
          const otherRangesCount = setting.multipleRange.length - 1
          if (setting.mode === 'date') {
            return `${date_short(firstRange?.start)} until ${date_short(firstRange?.end)} and ${otherRangesCount} others`
          }
          return `${datetime_short(firstRange?.start)} until ${datetime_short(firstRange?.end)} and ${otherRangesCount} others`
        }
        break
      default: return placeholder
    }
  }

  const date_month = (date?: Date, nullable = false, placeholder?: Date): any => {
    if (!date && nullable)
      return undefined
    if (!date && !placeholder)
      return ''
    return intl.formatDate(date ?? placeholder, {
      month: 'long'
    })
  }

  const sex = (sex?: Sex, nullable = false, placeholder?: string): any => {
    if (!sex && nullable)
      return undefined
    if (!sex && placeholder)
      return placeholder
    return capitalize(sex)
  }

  const nationality = (nationality?: string, nullable = false, placeholder?: string): any => {
    if (!nationality && nullable)
      return undefined
    if (!nationality && placeholder)
      return placeholder
    return capitalize(nationality)
  }

  const image = (image?: string, placeholder = usePlaceholder().image): any => {
    if (!image)
      return undefined
    if (!image && placeholder)
      return placeholder
    return image
  }
  // const image_company = (src?: string) => {
  //   return image(src, 'https://firebasestorage.googleapis.com/v0/b/tripket-ph-97775.appspot.com/o/companies%2Flogos%2Ftripket_ph.png?alt=media&token=bcba7228-f670-42b6-ab95-7a51e011e44c')
  // }

  const avatar = (src?: string, placeholder = '/png/logo.png') => {
    if (!src || src === '')
      return placeholder
    return src
    // if (!user || user)
    //   return undefined
    // if (!user && placeholder)
    //   return placeholder
    // if (!user)
    //   return usePlaceholder().avatar()
    // return user?.image ?? usePlaceholder().avatar(user?.sex)
  }

  const hour = (date?: Date, nullable = false, placeholder = ''): any => {
    if (!date && nullable)
      return undefined
    if (!date && placeholder)
      return placeholder
    return intl.formatDate(date, {
      hour: 'numeric'
    })
  }

  const day = (date?: Date, nullable = false, placeholder = ''): any => {
    if (!date && nullable)
      return undefined
    if (!date && placeholder)
      return placeholder
    return intl.formatDate(date, {
      day: 'numeric'
    })
  }

  const week = (date?: Date, nullable = false, placeholder = ''): any => {
    if (!date && nullable)
      return undefined
    if (!date && placeholder)
      return placeholder
    return intl.formatDate(date, {
      weekday: 'short'
    })
  }

  const month = (date?: Date, nullable = false, placeholder = ''): any => {
    if (!date && nullable)
      return undefined
    if (!date && placeholder)
      return placeholder
    return intl.formatDate(date, {
      month: 'short'
    })
  }

  const year = (date?: Date, nullable = false, placeholder = ''): any => {
    if (!date && nullable)
      return undefined
    if (!date && placeholder)
      return placeholder
    return intl.formatDate(date, {
      year: 'numeric'
    })
  }

  const shorten = (text: string, length = 32) => {
    if (text.length <= length)
      return text
    return text.substring(0, length - 3) + '...'
  }

  const cargo_included = (included?: CargoIncluded) => {
    if (!included)
      return empty_default
    return `${included.passenger} ${pluralize('passenger', included.passenger)}`
  }

  const dimension = (dimension?: Dimension, placeholder = empty_default) => {
    if (!dimension) {
      return placeholder
    }
    return `${dimension.length}${dimension.unit} x ${dimension.width}${dimension.unit} x ${dimension.height}${dimension.unit}`
  }
  const dimension_range = (dimension?: DimensionRange, placeholder = empty_default) => {
    if (!dimension) {
      return placeholder
    }
    const minLength = LengthInstance.convertFromMillimeters(dimension.length.min, dimension.unit)
    const maxLength = LengthInstance.convertFromMillimeters(dimension.length.max, dimension.unit)
    const lenRange = minLength === maxLength ? minLength : `${minLength} - ${maxLength}`

    const minWidth = LengthInstance.convertFromMillimeters(dimension.width.min, dimension.unit)
    const maxWidth = LengthInstance.convertFromMillimeters(dimension.width.max, dimension.unit)
    const widthRange = minWidth === maxWidth ? minWidth : `${minWidth} - ${maxWidth}`

    const minHeight = LengthInstance.convertFromMillimeters(dimension.height.min, dimension.unit)
    const maxHeight = LengthInstance.convertFromMillimeters(dimension.height.max, dimension.unit)

    const unitSymbol = LengthInstance.unitSymbols[dimension.unit]
    const heightRange = minHeight === maxHeight ? minHeight : `${minHeight} - ${maxHeight}`
    return `${lenRange}${unitSymbol} x ${widthRange}${unitSymbol} x ${heightRange}${unitSymbol}`
  }

  const weight = (weight?: Weight, placeholder = empty_default): string => {
    if (!weight) {
      return placeholder
    }
    return `${weight.value}${weight.unit}`
  }

  const weight_range = (weight?: WeightRange, placeholder = empty_default): string => {
    if (!weight) {
      return placeholder
    }
    return `${WeightInstance.convertFromGrams(weight.min, weight.unit)} - ${WeightInstance.convertFromGrams(weight.max, weight.unit)}${WeightInstance.unitSymbols[weight.unit]}`
  }

  const size = (size?: number, placeholder = empty_default): string => {
    if (!size) {
      return placeholder
    }
    return size.toString()
  }

  const derived_reference = (reference?: DerivedReference, placeholder = empty_default) => {
    if (!reference?.type) {
      return placeholder
    }
    return reference.type.charAt(0).toUpperCase() + reference.type.slice(1)
  }

  const capital_case = (text?: string, placeholder = empty_default) => {
    if (!text)
      return placeholder
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const duration = (duration?: number | Duration | DurationInstanceType, placeholder = empty_default) => {
    if (!duration)
      return placeholder
    const durationInstance = duration instanceof DurationInstance ? duration : new DurationInstance(duration)
    return durationInstance.inHumanFormat({ includeZeros: false, short: false })
  }

  const passenger_type_class = (clss?: PassengerTypeClass, placeholder = empty_default) => {
    if (!clss)
      return placeholder
    return `${clss.name} - ${currency(clss.rate)}`
  }

  const cargo_type = (type?: CargoType, placeholder = empty_default) => {
    if (!type)
      return placeholder
    return `${type.name}`
  }

  const cargo_type_class = (type?: CargoTypeClass, placeholder = empty_default) => {
    if (!type)
      return placeholder
    return `${type.name} - ${currency(type.rate)}`
  }

  const cargo_type_category = (category?: CargoTypeCategory, placeholder = empty_default) => {
    if (!category)
      return placeholder
    return `${category.name}`
  }
  const cargo_type_footprint = (footprint?: CargoTypeFootprint, placeholder = empty_default) => {
    if (!footprint)
      return placeholder
    if (!footprint.dimensionRange)
      return `${footprint.name} - ${footprint.size}`
    else
      return `${footprint.name} - ${dimension_range(footprint?.dimensionRange)}`
  }

  const schedules = (schedules?: TimeSchedule[], placeholder = '0 / 0') => {
    return count_active(schedules, placeholder)
  }

  // const date_id = (date: Date) => {
  //   return date.getTime().toString()
  // }

  const schedule = (schedule?: TimeSchedule, placeholder = empty_default) => {
    return schedule ? `${schedule.time}` : placeholder
  }

  const uppercase = (text?: string, placeholder = empty_default) => {
    if (!text)
      return placeholder
    return text.toUpperCase()
  }
  const lowercase = (text?: string, placeholder = empty_default): string => {
    if (!text)
      return placeholder
    return text.toLowerCase()
  }

  const company = (company?: Company, placeholder = empty_default): any => {
    if (!company && placeholder)
      return placeholder
    return company?.name ?? ''
  }

  const passenger_description = (passenger?: Passenger, placeholder = empty_default) => {
    if (!passenger) return placeholder
    return useDescription().passenger(passenger)
  }

  const ticket = (ticket?: Ticket | PassengerTicketSnapshot, placeholder = empty_default) => {
    if (!ticket?.id) return placeholder
    return ticket.id
  }

  const cargo = (cargo?: Cargo | PassengerCargoSnapshot, placeholder = empty_default) => {
    if (!cargo) return placeholder
    // return cargo?.type?.name ?? cargo?.type?.category?.name ?? cargo?.plate
    return `${cargo?.type?.name ?? cargo?.type?.category?.name}`
  }

  const cargo_plate = (cargo?: Cargo | PassengerCargoSnapshot, placeholder = empty_default) => {
    if (!cargo) return placeholder
    // return cargo?.type?.name ?? cargo?.type?.category?.name ?? cargo?.plate
    return `${cargo?.type?.name ?? cargo?.type?.category?.name} - [ ${cargo.plate} ]`
  }

  const passenger_type = (type?: PassengerType, placeholder = empty_default) => {
    if (!type) return placeholder
    return type.name
  }

  const passenger_status = (status?: PassengerStatus, placeholder = empty_default) => {
    if (!status) return placeholder
    return status
  }

  // const passenger_total = (passenger?: Passenger, placeholder = empty_default) => {
  //   if(!passenger) return placeholder
  //   return passenger?.type.free ? 'Free' :
  // }
  const number = (value?: number, placeholder = empty_default) => {
    if (!value) return placeholder
    return value.toString()
  }

  const datetime_range = (range?: DateRange, placeholder = empty_default) => {
    if (!range) return placeholder
    return `${datetime(range.start)} - ${datetime(range.end)}`
  }

  return {
    date_relative,
    ticket_contact,
    departure_return,
    ticket_route,
    ticket_type,
    cargo_plate,
    route_snapshot,
    text,
    departure,
    datetime_range,
    currency_text,
    number,
    routes,
    cargo_type,
    passenger_type,
    passenger_status,
    cargo,
    ticket,
    passenger_description,
    uppercase,
    lowercase,
    // date_id,
    rate_snapshot,
    ticket_rate,
    schedule,
    schedules,
    active,
    count_active,
    user,
    cargo_type_category,
    cargo_type_footprint,
    cargo_type_class,
    passenger_type_class,
    payment,
    duration,
    dimension_range,
    weight_range,
    derived_reference,
    capital_case,
    truncate,
    weight,
    dimension,
    size,
    cargo_included,
    avatar,
    image,
    nationality,
    date_month,
    role_description,
    sex,
    description,
    index,
    str_fee,
    age_range,
    count,
    route_capacity,
    // Date and time formatting
    datetime_short,
    rate,
    formatDate,
    formatDateTime,
    formatDateObject,
    formatDateTimeObject,

    // Formatting and validation utilities
    capitalize,
    address,
    address_short,
    name,
    str_empty,
    email,
    currency,
    phone,
    port,
    route,
    integer,
    conductor_status,
    age,

    // Company and role information
    company,
    types,
    role,

    // Miscellaneous utilities
    initials,
    link,
    str_bool,
    str_fee_items,
    // Fee information
    fee_total,
    fee,

    // Date information
    datetime,
    date,
    time,

    hour,
    day,
    week,
    month,
    year,
    shorten,
    date_setting
  }
}

export type UseFormat = ReturnType<typeof useFormat>
