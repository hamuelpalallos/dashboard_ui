export class ImperialUnit {
  duration: DurationInstanceType
  weight: WeightInstanceType
  constructor(duration: Duration, weight: WeightOptionOptions) {
    this.weight = new WeightInstance(weight)
    this.duration = new DurationInstance(duration)
  }

  get inDays() {
    return this.duration.inDays
  }
}

export class FeeInstance implements Fee {
  fixed: number
  type: FeeType
  percent: number
  min: number
  max: number
  constructor(data: Fee) {
    this.fixed = data.fixed
    this.type = data.type
    this.percent = data.percent
    this.min = data.min
    this.max = data.max
  }

  toJson(): Fee {
    return {
      fixed: this.fixed,
      type: this.type,
      percent: this.percent,
      min: this.min,
      max: this.max
    }
  }
}

export class FeeItemInstance implements FeeItem {
  name?: string
  description?: string
  fee: Fee
  constructor(data: FeeItem) {
    this.name = data.name
    this.description = data.description
    this.fee = new FeeInstance(data.fee)
  }

  static fromJson(data: FeeItem): FeeItemInstance {
    return new FeeItemInstance(data)
  }

  static fromJsonArray(data?: FeeItem[]): FeeItemInstance[] {
    return data?.map(FeeItemInstance.fromJson) ?? []
  }

  toJson(): FeeItem {
    return JSON.parse(JSON.stringify(this))
  }
}

// export class AgeRangeInstance implements NumberRange {
//   min: number
//   max: number
//   type: NumberRangeType
//   constructor(data: NumberRange) {
//     // Object.assign(this, data)
//     this.type = data.type
//     this.min = data.min
//     this.max = data.max
//   }
// }

export class DimensionRangeInstance implements DimensionRange {
  constructor(data: DimensionRange) {
    // Object.assign(this, data)
    this.unit = data.unit
    this.height = new NumberRangeInstance(data.height)
    this.width = new NumberRangeInstance(data.width)
    this['length'] = new NumberRangeInstance(data['length'])
  }

  unit: LengthUnit
  width: NumberRangeInstance
  height: NumberRangeInstance
  length: NumberRangeInstance

  toJson(): DimensionRange {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore(): DimensionRange {
    return this.toJson()
  }
}

export class NumberRangeInstance implements NumberRange {
  constructor(data: NumberRange) {
    // Object.assign(this, data)
    this.type = data.type
    this.min = data.min
    this.max = data.max
  }

  min: number
  max: number
  type: NumberRangeType

  toJson(): NumberRange {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore(): NumberRange {
    return this.toJson()
  }
}

export class AddressInstance implements Address {
  country?: string
  region?: AddressCodeInstance
  province?: AddressCodeInstance
  city?: AddressCodeInstance
  barangay?: AddressCodeInstance
  street?: string
  zip?: string
  text?: string
  modular?: boolean

  constructor(data: Address) {
    Object.assign(this, data)
    this.modular = data.text && !data.modular ? false : true
    this.region = data.region ? new AddressCodeInstance(data.region) : undefined
    this.province = data.province ? new AddressCodeInstance(data.province) : undefined
    this.city = data.city ? new AddressCodeInstance(data.city) : undefined
    this.barangay = data.barangay ? new AddressCodeInstance(data.barangay) : undefined
  }

  toJson(): Address {
    return JSON.parse(JSON.stringify(this))
  }
}

export class AddressCodeInstance implements AddressCode {
  constructor(data: AddressCode) {
    this.name = data.name
    this.code = data.code
  }

  name: string
  code?: string

  get nameCode() {
    return `${this.name} (${this.code})`
  }

  toJson(): AddressCode {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore(): AddressCode {
    return this.toJson()
  }
}

export class WeightRangeInstance implements WeightRange {
  constructor(data: WeightRange) {
    // Object.assign(this, data)
    this.type = data.type
    this.unit = data.unit
    this.min = data.min
    this.max = data.max
    this.unit = data.unit
    this.min = data.min
    this.max = data.max
  }

  type: NumberRangeType

  unit: WeightUnit
  min: number
  max: number

  toJson(): WeightRange {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore(): WeightRange {
    return this.toJson()
  }
}

export class TimeOfDayInstance implements TimeOfDay {
  constructor(tod: Partial<TimeOfDay> = {}, private options: TimeOfDayOptions = { accuracy: 'minute' }) {
    const { hours = 0, minutes = 0, seconds = 0, milliseconds = 0, accuracy = 'minute' } = tod

    if (hours < 0 || hours > 23) {
      throw new Error('Hour must be between 0 and 23')
    }
    if (minutes < 0 || minutes > 59) {
      throw new Error('Minute must be between 0 and 59')
    }
    if (seconds < 0 || seconds > 59) {
      throw new Error('Second must be between 0 and 59')
    }
    if (milliseconds < 0 || milliseconds > 999) {
      throw new Error('Millisecond must be between 0 and 999')
    }

    // this.tod = { hours, minutes, seconds, milliseconds, accuracy }
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
    this.milliseconds = milliseconds
    this.accuracy = accuracy
  }

  // tod: TimeOfDay
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  accuracy: TimeOfDayAccuracy

  static fromDate(date: Date) {
    return new TimeOfDayInstance({
      hours: date.getHours() as TimeOfDayHour,
      minutes: date.getMinutes() as TimeOfDayMinute,
      seconds: date.getSeconds() as TimeOfDaySecond,
      milliseconds: date.getMilliseconds() as TimeOfDayMillisecond
    })
  }

  static start = () => new TimeOfDayInstance({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })

  static fromString(timeString: string) {
    const parts = timeString.trim().split(/\s+/)
    if (parts.length > 2) {
      throw new Error('Invalid time format')
    }

    const timePart = parts[0]!
    const periodPart = parts[1]?.toLowerCase()

    const timeComponents = timePart.split(':')
    if (timeComponents.length !== 2) {
      throw new Error('Invalid time format')
    }

    let hours = Number(timeComponents[0])
    const minutes = Number(timeComponents[1])

    if (isNaN(hours) || isNaN(minutes) || minutes < 0 || minutes >= 60 || hours < 0 || hours > 23) {
      throw new Error('Invalid time format')
    }

    if (periodPart) {
      const isPM = periodPart === 'pm'
      if (isPM && hours < 12) {
        hours += 12
      } else if (!isPM && hours === 12) {
        hours = 0
      }
    }

    return new TimeOfDayInstance({
      hours: hours as TimeOfDayHour,
      minutes: minutes as TimeOfDayMinute
    })
  }
  // static fromString(timeString: string) {
  //   const parts = timeString.trim().split(/\s+/)
  //   if (parts.length > 2) {
  //     throw new Error('Invalid time format')
  //   }

  //   const timePart = parts[0]
  //   const periodPart = parts[1]?.toLowerCase()

  //   const timeComponents = timePart.split(':')
  //   if (timeComponents.length !== 2) {
  //     throw new Error('Invalid time format')
  //   }

  //   let hours = Number(timeComponents[0])
  //   const minutes = Number(timeComponents[1])

  //   if (isNaN(hours) || isNaN(minutes) || minutes < 0 || minutes >= 60 || hours < 0 || hours > 23) {
  //     throw new Error('Invalid time format')
  //   }

  //   if (periodPart) {
  //     const isPM = periodPart === 'pm'
  //     if (isPM && hours < 12) {
  //       hours += 12
  //     }
  //     else if (!isPM && hours === 12) {
  //       hours = 0
  //     }
  //   }
  //   else if (hours === 12) {
  //     hours = 0
  //   }

  //   return new TimeOfDayInstance({
  //     hours: hours as TimeOfDayHour,
  //     minutes: minutes as TimeOfDayMinute,
  //   })
  // }
  // static fromString(timeString: string) {
  //   const TIME_FORMAT = /^(\d{1,2}):(\d{2})(?:\s?(am|pm))?$/i

  //   const match = timeString.match(TIME_FORMAT)
  //   if (!match) {
  //     throw new Error('Invalid time format')
  //   }

  //   let hours = Number(match[1])
  //   const minutes = Number(match[2])
  //   const period = match[3]?.toLowerCase()

  //   if (period) {
  //     const isPM = period === 'pm'
  //     if (isPM && hours < 12) {
  //       hours += 12
  //     }
  //     else if (!isPM && hours === 12) {
  //       hours = 0
  //     }
  //   }

  //   return new TimeOfDayInstance({
  //     hours: hours as TimeOfDayHour,
  //     minutes: minutes as TimeOfDayMinute,
  //   })
  // }

  toString() {
    let result = `${this.hours.toString().padStart(2, '0')}:${this.options.accuracy === 'hour' ? '00' : this.minutes.toString().padStart(2, '0')}`
    if (this.options.accuracy === 'second' || this.options.accuracy === 'millisecond') {
      result += `:${this.seconds.toString().padStart(2, '0')}`
    }
    if (this.options.accuracy === 'millisecond') {
      result += `.${this.milliseconds.toString().padStart(3, '0')}`
    }
    return result
  }

  to12HourString() {
    let hours = this.hours > 12 ? this.hours - 12 : this.hours
    hours = this.hours === 0 ? 12 : hours
    hours = this.hours === 12 ? 12 : hours
    let result = `${hours.toString().padStart(2, '0')}:${this.options.accuracy === 'hour' ? '00' : this.minutes.toString().padStart(2, '0')}`
    if (this.options.accuracy === 'second' || this.options.accuracy === 'millisecond') {
      result += `:${this.seconds.toString().padStart(2, '0')}`
    }
    if (this.options.accuracy === 'millisecond') {
      result += `.${this.milliseconds.toString().padStart(3, '0')}`
    }
    result += ` ${this.hours >= 12 ? 'PM' : 'AM'}`
    return result
  }

  toDate() {
    const date = new Date()
    date.setHours(this.hours)
    date.setMinutes(this.minutes)
    date.setSeconds(this.seconds)
    date.setMilliseconds(this.milliseconds)
    return date
  }

  toJson(): TimeOfDay {
    return JSON.parse(JSON.stringify(this))
  }

  getDate(date = new Date()) {
    date.setHours(this.hours)
    date.setMinutes(this.minutes)
    date.setSeconds(this.seconds)
    date.setMilliseconds(this.milliseconds)
    return date
  }

  toObject = () => {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds

    }
  }

  addDuration(duration: DurationTime) {
    let milliseconds = this.milliseconds + (duration.milliseconds || 0)
    let seconds = this.seconds + (duration.seconds || 0)
    let minutes = this.minutes + (duration.minutes || 0)
    let hours = this.hours + (duration.hours || 0)

    seconds += Math.floor(milliseconds / 1000)
    milliseconds %= 1000

    minutes += Math.floor(seconds / 60)
    seconds %= 60

    hours += Math.floor(minutes / 60)
    minutes %= 60

    hours %= 24

    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
    this.milliseconds = seconds

    // return new TimeOfDayInstance({
    //   hours: hours as TimeOfDayHour,
    //   minutes: minutes as TimeOfDayMinute,
    //   seconds: seconds as TimeOfDaySecond,
    //   milliseconds: milliseconds as TimeOfDayMillisecond
    // })
  }

  isAfter(t: TimeOfDayInstance) {
    const thisTime = this.toDate()
    const otherTime = t.toDate()
    return thisTime > otherTime
  }

  isBefore(t: TimeOfDayInstance) {
    const thisTime = this.toDate()
    const otherTime = t.toDate()
    return thisTime < otherTime
  }
  // addDuration(duration: DurationTime) {
  //   let milliseconds = this.milliseconds + (duration.milliseconds || 0)
  //   let seconds = this.seconds + (duration.seconds || 0) + Math.floor(milliseconds / 1000)
  //   milliseconds %= 1000

  //   let minutes = this.minutes + (duration.minutes || 0) + Math.floor(seconds / 60)
  //   seconds %= 60

  //   let hours = this.hours + (duration.hours || 0) + Math.floor(minutes / 60)
  //   minutes %= 60

  //   hours %= 24

  //   return new TimeOfDayInstance({
  //     hours: hours,
  //     minutes: minutes,
  //     seconds: seconds,
  //     milliseconds: milliseconds
  //   })
  // }
}
