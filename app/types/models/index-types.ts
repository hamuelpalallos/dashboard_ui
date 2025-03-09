export interface DatabaseRecord {
  // readonly create?: boolean
  id?: string
  // deletedAt?: DateTime
  createdAt?: Date
  updatedAt?: Date

  // custom default fields
  deleted?: DeletedData
  active?: boolean
  index?: number
  // custom optional fields
  description?: string
}

export interface WithId {
  id: string
}

// create a type that have a function called toTableRow()
// this function will return a TableRowProps
// export interface InstanceConvertibleTable<T> {
//   toTableRow(): T
// }
export interface InstanceConvertibleTable {
  toTableRow(): any
}

export type ArrayFields<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : never;
}[keyof T]

// type NestedArrayFields<T> = {
//   [K in keyof T]: T[K] extends Array<any> ? K :
//     T[K] extends object ? NestedArrayFields<T[K]> : never;
// }[keyof T]

export type Concat<K extends string, P extends string> =
  `${K & string}.${P & string}`

export type NestedArrayFields<T, P extends string = ''> = {
  [K in keyof T]: T[K] extends Array<any> ? (P extends '' ? K : Concat<P, K & string>) :
    T[K] extends object ? NestedArrayFields<T[K], K & string> : never;
}[keyof T]

export interface ReferenceId {
  id: string
}

// stringify object fields
export type Stringify<T> = {
  [K in keyof T]: string
}

// TOD -- Time of Day

export type TwentyFour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
export type Sixty = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59
export type TimeOfDayHour = TwentyFour

export type TimeOfDayMinute = Sixty
export type TimeOfDaySecond = Sixty

export type TimeOfDayMillisecond = number

export type TimeOfDayString = `${TimeOfDayHour}:${TimeOfDayMinute}`
export type TimeOfDay12HourString = `${TimeOfDayHour}:${TimeOfDayMinute} ${'AM' | 'PM'}`
export type TimeOfDayAccuracy = 'hour' | 'minute' | 'second' | 'millisecond'

export type TimeOfDayOptions = {
  accuracy: TimeOfDayAccuracy
}

export interface TimeOfDay {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  accuracy: TimeOfDayAccuracy
}

// TIME FORMAT FOR RECORD KEEPING

export type TimeHourFirstDigit = 0 | 1 | 2
export type TimeHourSecondDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type TimeHourExceed = `${TimeHourFirstDigit}${TimeHourSecondDigit}`
export type TimeHour = Exclude<TimeHourExceed, '24' | '25' | '26' | '27' | '28' | '29'>

export type TimeMinuteFirstDigit = 0 | 1 | 2 | 3 | 4 | 5
export type TimeMinuteSecondDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type TimeMinuteExceed = `${TimeMinuteFirstDigit}${TimeMinuteSecondDigit}`
export type TimeMinute = Exclude<TimeMinuteExceed, '60'>

export type Time24SHourString = `${TimeHour}:${TimeMinute}`
export type TimeString = Time24SHourString // format export type is 24hour

// TYPE HELPERS
export type IsSame<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false

// This will be 'true' if RouteForm and RouteFormSchemaType are the same, 'false' otherwise
