import type { DATETIME_ATTRIBUTES } from '~/constants/default-constants'

export interface Phone {
  countryCode?: string // "+63"
  countryISOCode?: string // "PH"
  number?: string // "9123456789"
  text?: string // "+639123456789"
  modular?: boolean
}

export interface Address {
  country?: string

  region?: AddressCode
  province?: AddressCode
  city?: AddressCode
  barangay?: AddressCode

  street?: string
  zip?: string
  text?: string
  modular?: boolean
}

export interface AddressCode {
  name: string
  code?: string
}
export type NumberRangeType = typeof OPTIONAL_RANGE_TYPES[number] | 'any'
// export type AgeRangeType = NumberRangeType

// export interface AgeRange {
//   type: AgeRangeType // 'default' is 'min-max'
//   min: number
//   max: number
// }

export interface NumberRange {
  type: NumberRangeType // 'default' is 'min-max'
  min: number
  max: number
}

export interface DateRange {
  start: Date
  end: Date
}

export type DateSettingType = typeof DATE_SETTING_TYPES[number]
export type DateSettingMode = typeof DATE_SETTING_MODES[number]

export interface DateSetting {
  type: DateSettingType
  mode: DateSettingMode
  range?: DateRange
  single?: Date
  multiple?: Date[]
  multipleRange?: DateRange[]
}

export type DateSettingRequired = Required<DateSetting>

export interface DeletedData {
  at: Date
  by: User
}

export interface DeletedDataFirestore {
  at: FirestoreTimestamp
  byReference: DocRef
}

export type DateAttribute = typeof DATETIME_ATTRIBUTES[number]

export type ZodConfigType = typeof ZOD_CONFIG_TYPES[number]
export type CollectionName = typeof COLLECTION_NAMES[number]
