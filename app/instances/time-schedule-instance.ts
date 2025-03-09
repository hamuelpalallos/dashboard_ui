import { v4 as uuidv4 } from 'uuid'
import { TimeOfDayInstance } from './custom-instance'

export class TimeScheduleInstance implements TimeSchedule {
  constructor(data: TimeSchedule) {
    this._key = uuidv4()
    if (typeof data.time === 'string') {
      this.time = TimeOfDayInstance.fromString(data.time)
    } else {
      this.time = data?.time ? new TimeOfDayInstance(data.time) : TimeOfDayInstance.start()
    }
    this.excludedDays = data.excludedDays
    this.active = data.active ?? false // default to false
  }

  private readonly _key: string
  active: boolean
  time: TimeOfDayInstance
  excludedDays: DayOfWeek[]

  get key() {
    return this._key
  }

  // fromString(str: TimeString) {
  //   const timeOfDay = TimeOfDayInstance.fromString(str)
  //   return new TimeScheduleInstance({ time: timeOfDay, excludedDays: [], active: true })
  // }

  copyWith(ts?: Partial<TimeSchedule>) {
    return new TimeScheduleInstance({ ...this.toJson(), ...ts })
  }

  isSameTime(other: TimeSchedule): boolean {
    return this.time.toString() === other.time.toString()
  }

  toJson(): TimeSchedule {
    return JSON.parse(JSON.stringify(this))
  }

  toSchema() {
    return this.toJson()
  }

  static none = new TimeScheduleInstance({
    time: TimeOfDayInstance.start(),
    excludedDays: [],
    active: false
  })

  static start = () => new TimeScheduleInstance({
    time: TimeOfDayInstance.start(),
    excludedDays: [],
    active: true
  })

  // addTime(duration: Pick<DurationTime, 'hours' | 'minutes'>) {
  //   const time = this.time.split(':')
  //   const stringPadded = (n: number) => {
  //     return n < 10 ? `0${n}` : `${n}`
  //   }
  //   if (time.length > 1) {
  //     const hour = parseInt(time[0]!, 10)
  //     const minute = parseInt(time[1]!, 10)
  //     const newMinute = duration.minutes ? (minute + duration.minutes) % 60 : minute
  //     const newHour = duration.hours ? (hour + Math.floor(minute / 60) + duration.hours) % 24 : hour
  //     this.time = `${stringPadded(newHour)}:0${stringPadded(newMinute)}` as TimeString
  //   }
  // }

  addHour = () => this.time.addDuration({ hours: 1 })

  getDate = (date?: Date): Date => this.getDate(date)

  available(date = new Date()): boolean {
    if (!this.active) return false
    return !this.excludedDays?.includes(useDate().day_of_week(date))
  }

  static toInstances(data: TimeSchedule[]): TimeScheduleInstance[] {
    return data.map(item => new TimeScheduleInstance(item))
  }

  // create a function that will return only the active schedules
  static activeSchedules(data: TimeSchedule[], date: Date): TimeSchedule[] {
    return this.toInstances(data).filter((item) => {
      return item.active && item.available(date)
    }).map((item) => {
      return item.toJson()
    }) ?? []
  }

  inHumanFormat() {
    return this.time.to12HourString()
  }

  toFirestore(): TimeSchedule {
    return {
      time: this.time.toString(),
      // timeOfDay: this.time.toJson(),
      excludedDays: this.excludedDays?.sort((a, b) => a - b),
      active: this.active
    }
  }
}
