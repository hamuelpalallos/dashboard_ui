// import pluralize
import pluralize from 'pluralize'

export class DurationInstance implements DurationTime {
  static readonly microsecondsPerMillisecond = 1000

  static readonly millisecondsPerSecond = 1000

  static readonly secondsPerMinute = 60

  static readonly minutesPerHour = 60

  static readonly hoursPerDay = 24

  static readonly daysPerWeek = 7

  static readonly daysPerMonth = 30

  static readonly daysPerYear = 365

  //

  static readonly microsecondsPerSecond = this.microsecondsPerMillisecond * this.millisecondsPerSecond

  static readonly microsecondsPerMinute = this.microsecondsPerSecond * this.secondsPerMinute

  static readonly microsecondsPerHour = this.microsecondsPerMinute * this.minutesPerHour

  static readonly microsecondsPerDay = this.microsecondsPerHour * this.hoursPerDay

  static readonly microsecondsPerWeek = this.microsecondsPerDay * this.daysPerWeek

  static readonly microsecondsPerMonth = this.microsecondsPerDay * this.daysPerMonth

  static readonly microsecondsPerYear = this.microsecondsPerDay * this.daysPerYear

  //

  static readonly millisecondsPerMinute = this.millisecondsPerSecond * this.secondsPerMinute

  static readonly millisecondsPerHour = this.millisecondsPerMinute * this.minutesPerHour

  static readonly millisecondsPerDay = this.millisecondsPerHour * this.hoursPerDay

  static readonly secondsPerHour = this.secondsPerMinute * this.minutesPerHour

  static readonly secondsPerDay = this.secondsPerHour * this.hoursPerDay

  static readonly minutesPerDay = this.minutesPerHour * this.hoursPerDay

  static zero = new DurationInstance({ seconds: 0 })

  duration: number

  constructor(duration: DurationTime | number) {
    if (typeof duration === 'number') {
      this.duration = duration
      return
    }
    const { days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0 } = duration
    this.duration = days * DurationInstance.microsecondsPerDay
    + hours * DurationInstance.microsecondsPerHour
    + minutes * DurationInstance.microsecondsPerMinute
    + seconds * DurationInstance.microsecondsPerSecond
    + milliseconds * DurationInstance.microsecondsPerMillisecond
    + microseconds
  }

  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
  microseconds?: number

  get inDays() {
    return Math.floor(this.duration / DurationInstance.microsecondsPerDay)
  }

  get inHours() {
    return Math.floor(this.duration / DurationInstance.microsecondsPerHour)
  }

  get inMinutes() {
    return Math.floor(this.duration / DurationInstance.microsecondsPerMinute)
  }

  get inSeconds() {
    return Math.floor(this.duration / DurationInstance.microsecondsPerSecond)
  }

  get inMilliseconds() {
    return Math.floor(this.duration / DurationInstance.microsecondsPerMillisecond)
  }

  get inMicroseconds() {
    return this.duration
  }

  toString(): string {
    let microseconds = this.inMicroseconds
    let sign = ''
    const negative = microseconds < 0

    let hours = Math.floor(this.duration / DurationInstance.microsecondsPerHour)
    microseconds %= DurationInstance.microsecondsPerHour

    if (negative) {
      hours = 0 - hours
      microseconds = 0 - microseconds
      sign = '-'
    }

    const minutes = Math.floor(microseconds / DurationInstance.microsecondsPerMinute)
    microseconds %= DurationInstance.microsecondsPerMinute

    const minutesPadding = minutes < 10 ? '0' : ''

    const seconds = Math.floor(microseconds / DurationInstance.microsecondsPerSecond)
    microseconds %= DurationInstance.microsecondsPerSecond

    const secondsPadding = seconds < 10 ? '0' : ''

    const microsecondsText = microseconds.toString().padStart(6, '0')

    return `${sign}${hours}:${minutesPadding}${minutes}:${secondsPadding}${seconds}.${microsecondsText}`
  }

  static unitToMicroseconds: { [key in DurationUnit]: number } = {
    years: DurationInstance.microsecondsPerYear,
    months: DurationInstance.microsecondsPerMonth,
    weeks: DurationInstance.microsecondsPerWeek,
    days: DurationInstance.microsecondsPerDay,
    hours: DurationInstance.microsecondsPerHour,
    minutes: DurationInstance.microsecondsPerMinute,
    seconds: DurationInstance.microsecondsPerSecond,
    milliseconds: DurationInstance.microsecondsPerMillisecond,
    microseconds: DurationInstance.microsecondsPerMillisecond
  }

  static unitSymbols: { [key in DurationUnit]: string } = {
    years: 'y',
    months: 'mo',
    weeks: 'w',
    days: 'd',
    hours: 'h',
    minutes: 'm',
    seconds: 's',
    milliseconds: 'ms',
    microseconds: 'μs'
  }

  inHumanFormat(options: DurationHumanFormatOptions = {}) {
    const { smallestUnit = 'seconds', largestUnit = 'hours', includeZeros = true, short = true } = options
    const units: DurationUnit[] = ['days', 'hours', 'minutes', 'seconds', 'milliseconds', 'microseconds']
    const start = units.indexOf(largestUnit)
    const end = units.indexOf(smallestUnit)

    let remainingMicroseconds = this.duration

    const parts = units.slice(start, end + 1).map((unit) => {
      const unitMicroseconds = DurationInstance.unitToMicroseconds[unit]
      const value = Math.floor(remainingMicroseconds / unitMicroseconds)
      remainingMicroseconds %= unitMicroseconds
      return value || includeZeros ? `${value}${short ? DurationInstance.unitSymbols[unit] : ' ' + pluralize(unit, value)}` : null
    }).filter(Boolean)

    return parts.join(' ')
  }

  toJson() {
    return { microseconds: this.duration }
  }

  static fromJson(data: DurationTime): DurationInstance {
    return new DurationInstance(data)
  }

  toSchema(): number {
    return this.duration
  }

  toFirestore(): number {
    return this.duration ?? 0
  }
}
