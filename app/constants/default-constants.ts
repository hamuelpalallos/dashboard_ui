export const SEXES = ['male', 'female'] as const

export const USER_ROLES = ['super-admin', 'admin', 'company-admin', 'port-admin', 'port-conductor', 'port-inspector', 'guest'] as const

export const TRIP_CANCELLATION_STATUS = ['ongoing', 'expired', 'paused'] as const

export const TRIP_CANCELLATION_TYPES = ['default', 'reschedule', 'delayed', 'suspended'] as const

export const NOTICE_TYPES = ['default', 'info', 'warning', 'error', 'important'] as const

export const FEE_TYPES = ['fixed', 'percent', 'percent-min', 'percent-max', 'percent-min-max'] as const

export const DATE_SETTING_TYPES = ['range', 'single', 'multiple', 'multiple-range'] as const
export const DATE_SETTING_MODES = ['date', 'datetime', 'time'] as const
export const COLLECTION_NAMES = ['routes', 'ports', 'users', 'passenger-types', 'cargo-types', 'conveyances'] as const

export const WEIGHT_UNITS = ['gram', 'kilogram', 'tonne'] as const
export const LENGTH_UNITS = ['millimeter', 'centimeter', 'meter', 'kilometer'] as const

export const DAYS_OF_WEEK = [1, 2, 3, 4, 5, 6, 7] as const
// export const DAYS_OF_WEEK_NAMES = {
//   1: 'Sunday',
//   2: 'Monday',
//   3: 'Tuesday',
//   4: 'Wednesday',
//   5: 'Thursday',
//   6: 'Friday',
//   7: 'Saturday'
// } as const
export const DAYS_OF_WEEK_VALUES = [
  { value: 1, lbl: 'Mon', label: 'Monday' },
  { value: 2, lbl: 'Tue', label: 'Tuesday' },
  { value: 3, lbl: 'Wed', label: 'Wednesday' },
  { value: 4, lbl: 'Thu', label: 'Thursday' },
  { value: 5, lbl: 'Fri', label: 'Friday' },
  { value: 6, lbl: 'Sat', label: 'Saturday' },
  { value: 7, lbl: 'Sun', label: 'Sunday' }
] as const

export const DATETIME_ATTRIBUTES = ['birthdate', 'departure', 'arrival', 'timestamp', 'date', 'start', 'end', 'at'] as const

export const DERIVED_REFERENCE_TYPES = ['trip-cancellation'] as const

export const OPTIONAL_RANGE_TYPES = ['any', 'min-max', 'min', 'max'] as const
export const ZOD_CONFIG_TYPES = [
  'port',
  'fee',
  'fee-item',
  'route',
  'notice',
  'user',
  'passenger-type',
  'passenger-type-class',
  'cargo-type',
  'cargo-type-class',
  'cargo-type-footprint',
  'cargo-type-category',
  'conveyance',
  'trip',
  ...DERIVED_REFERENCE_TYPES
] as const

export const CONVEYANCE_TYPES = [
  'ship',
  'plane',
  'bus'
] as const

export const TRIP_TYPES = [
  'sea',
  'land',
  'air'
] as const

export const TRIP_STATUSES = [
  'scheduled',
  'in-progress',
  'completed',
  'cancelled',
  'delayed',
  'on-hold',
  'pending',
  'archived'
] as const

export const PASSENGER_STATUS = [
  'planned', // unpaid
  'booked', // paid
  'boarding', // inspected
  'boarded', // used
  'refunded', // refunded
  'cancelled', // cancelled
  'pending' // pending
] as const

// 'paid' | 'unpaid' | 'active' | 'cancelled' | 'used' | 'inspected' | 'approved'
export const TICKET_STATUS = [
  'unpaid',
  'paid',
  'inspected',
  'used',
  'refunded',
  'cancelled',
  'booked', // good as paid when departure has passed, good as used // this is for type 'external'
  'pending'
] as const

export const TICKET_TYPES = [
  'internal',
  'automated',
  'external'
] as const

export const EMPTY_STRING_DEFAULT = '__ __' as const
