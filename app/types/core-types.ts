// export interface NumberRange {
//   min: number
//   max: number
// }

export interface DurationTime {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
  microseconds?: number
}
export type DurationUnit = keyof DurationTime

export interface DurationHumanFormatOptions {
  smallestUnit?: DurationUnit
  largestUnit?: DurationUnit
  includeZeros?: boolean
  short?: boolean
}

export type LengthUnit = typeof LENGTH_UNITS[number]

export type WeightUnit = typeof WEIGHT_UNITS[number]
export interface WeightRange extends NumberRange {
  unit: WeightUnit // 'default' is 'kg'
}
