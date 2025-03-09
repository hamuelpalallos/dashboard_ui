import '@types/google.maps'

import type { CollectionReference, DocumentData, DocumentReference, User, Timestamp } from 'firebase/firestore'
import type { MiddlewareKey } from '#build/types/middleware'
import type { NavigationGuard } from '#vue-router'
// import {
//   // PortInstance,
//   RouteInstance,
//   RouteCargoClassInstance,
//   PassengerClassInstance,
//   CargoClassInstance,
//   CargoFootprintInstance,
//   CargoCategoryInstance,
//   DurationInstance,
//   TripInstance,
//   FeeInstance,
//   DimensionRangeInstance,
//   WeightRangeInstance,
//   // ConveyanceInstance,
//   CompanyInstance,

//   WeightRangeInstance,
//   WeightInstance,

//   AddressInstance,
//   AddressCodeInstance,

//   FeeItemInstance,
//   FeeInstance,
//   TimeScheduleInstance,

// } from '#imports'

// const foo = new PortInstance({})

// import { type CompanyInstance as CompanyInstanceType } from '~/instances/company-instance'

declare global {
  type MiddlewareType = MiddlewareKey | NavigationGuard | (MiddlewareKey | NavigationGuard)[] | undefined

  type DocRef = DocumentReference<DocumentData, DocumentData>

  type ColRef = CollectionReference<DocumentData, DocumentData>
  type Reference = DocRef | ColRef
  type DocReference = DocumentReference
  type UserImpl = User
  type FirestoreTimestamp = Timestamp

  // type PortInstance = PortInstance
  // type RouteInstance = RouteInstance
  // type RouteCargoTypeClassInstance = RouteCargoTypeClassInstance
  // // interface PortInstanceType extends PortInstance {}

  // // type ComponentRestrictions | undefined

  // type PassengerTypeClassInstance = PassengerTypeClassInstance
  // type CargoTypeClassInstance = CargoTypeClassInstance
  // type CargoTypeFootprintInstance = CargoTypeFootprintInstance
  // type CargoTypeCategoryInstance = CargoTypeCategoryInstance
  // type DurationInstance = DurationInstance

  // // type TripInstance = TripInstance
  // type TimeScheduleInstance = TimeScheduleInstance

  // type FeeInstance = FeeInstance
  // type DimensionRangeInstance = DimensionRangeInstance
  // type WeightRangeInstance = WeightRangeInstance

  // // type CompanyInstance = CompanyInstance
  // type ConveyanceInstance = ConveyanceInstance
  // // type CompanyInstance = CompanyInstanceType

  // PortInstance
  // RouteInstance
  // RouteCargoTypeClassInstance
  // PassengerTypeClassInstance
  // CargoTypeClassInstance
  // CargoTypeFootprintInstance
  // CargoTypeCategoryInstance
  // DurationInstance
  // TripInstance
  // FeeInstance
  // DimensionRangeInstance
  // WeightRangeInstance
  // ConveyanceInstance
  // CompanyInstance

  // type PortInstance = PortInstance
  //   export type RouteInstanceType = InstanceType<typeof RouteInstance>
  // export type RouteCargoTypeClassInstanceType = InstanceType<typeof RouteCargoTypeClassInstance>
  // export type PassengerInstanceType = InstanceType<typeof PassengerInstance>
  // export type PassengerTypeClassInstanceType = InstanceType<typeof PassengerTypeClassInstance>
  // export type CargoInstanceType = InstanceType<typeof CargoInstance>
  // export type CargoTypeClassInstanceType = InstanceType<typeof CargoTypeClassInstance>
  // export type CargoTypeFootprintInstanceType = InstanceType<typeof CargoTypeFootprintInstance>
  // export type CargoTypeCategoryInstanceType = InstanceType<typeof CargoTypeCategoryInstance>
  // export type DurationInstanceType = InstanceType<typeof DurationInstance>
  // export type TripInstanceType = InstanceType<typeof TripInstance>
  // export type FeeInstanceType = InstanceType<typeof FeeInstance>
  // export type DimensionRangeInstanceType = InstanceType<typeof DimensionRangeInstance>
  // export type WeightRangeInstanceType = InstanceType<typeof WeightRangeInstance>
  // export type CompanyInstanceType = InstanceType<typeof CompanyInstance>
  // export type WeightInstanceType = InstanceType<typeof WeightInstance>
  // export type AddressInstanceType = InstanceType<typeof AddressInstance>
  // export type AddressCodeInstanceType = InstanceType<typeof AddressCodeInstance>
  // export type FeeItemInstanceType = InstanceType<typeof FeeItemInstance>
  // export type TimeScheduleInstanceType = InstanceType<typeof TimeScheduleInstance>
  // export type AgeRangeInstanceType = InstanceType<typeof AgeRangeInstance>

  // const PortInstance: typeof PortInstance
  // const RouteInstance: typeof RouteInstance
  // const RouteCargoTypeClassInstance: typeof RouteCargoTypeClassInstance
  // const PassengerTypeClassInstance: typeof PassengerTypeClassInstance
  // const CargoTypeClassInstance: typeof CargoTypeClassInstance
  // const CargoTypeFootprintInstance: typeof CargoTypeFootprintInstance
  // const CargoTypeCategoryInstance: typeof CargoTypeCategoryInstance
  // const DurationInstance: typeof DurationInstance
  // const TripInstance: typeof TripInstance
  // const FeeInstance: typeof FeeInstance
  // const DimensionRangeInstance: typeof DimensionRangeInstance
  // const WeightRangeInstance: typeof WeightRangeInstance
  // const ConveyanceInstance: typeof ConveyanceInstance
  // const CompanyInstance: typeof CompanyInstance

}
