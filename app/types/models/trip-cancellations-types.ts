// export const TRIP_CANCELLATION_TYPES = ['ongoing', 'expired', 'future'] as const

// export const NOTICE_TYPES = ['info', 'warning', 'error', 'default', 'important'] as const

export type TripCancellationType = typeof TRIP_CANCELLATION_TYPES[number]
export type TripCancellationStatus = typeof TRIP_CANCELLATION_STATUS[number]

export interface TripCancellation extends DatabaseRecord {
  title?: string
  routes?: Route[]
  dateSetting?: DateSetting
  type?: TripCancellationType
  withNotice?: boolean
  notice?: Notice
  // derived
  // status?: TripCancellationStatus
}

export interface TripCancellationFirestore extends Omit<TripCancellation, 'routes' | 'notice' > {
  routeReferences: DocRef[]
  noticeReference?: DocRef
}

export interface TripCancellationRoute extends Omit<Route, keyof Route> {
  id: string
  origin: Port
  destination: Port
}
// export interface TripCancellationForm extends Omit<TripCancellation, 'routes' | 'notice' > {
//   routeIds: string[]
// routes: ReferenceId[]
// }

export type NoticeType = typeof NOTICE_TYPES[number]

export type DerivedType = typeof DERIVED_REFERENCE_TYPES[number]

export interface Notice extends DatabaseRecord {
  title?: string
  type?: NoticeType
  dateSetting?: DateSetting
  derived?: DerivedReference// create other possible derived references
}

export interface NoticeFirestore extends Omit<Notice, 'derived'> {
  derived?: DerivedReferenceFirestore
}

export interface DerivedReference {
  id: string
  type: DerivedType
  data?: TripCancellation // or other database record
  // tripCancellation: TripCancellation // or other database record
  // add more later (if needed)

}
export interface DerivedReferenceFirestore extends Omit<DerivedReference, 'data'> {
  dataReference: DocRef
  // tripCancellationReference: DocRef
  // add more later (if needed)
}
