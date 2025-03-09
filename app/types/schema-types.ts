import type { z } from 'zod'

export const {
  TripSchema,
  DimensionRangeSchema,
  CargoTypeCategorySchema,
  CargoTypeFootprintSchema,
  WeightRangeSchema,
  NoticeSchema,
  FeeSchema,
  FeeItemSchema,
  PortSchema,
  TripCancellationSchema,
  RouteSchema,
  DateSettingSchema,
  PassengerTypeClassSchema
} = useZodSchema()

export type TripSchemaType = z.infer<typeof TripSchema>

export type PortSchemaType = z.infer<typeof PortSchema>

export type FeeSchemaType = z.infer<typeof FeeSchema>

export type FeeItemSchemaType = z.infer<typeof FeeItemSchema>

export type TripCancellationSchemaType = z.infer<typeof TripCancellationSchema>

export type RouteSchemaType = z.infer<typeof RouteSchema>

export type NoticeSchemaType = z.infer<typeof NoticeSchema>

export type CargoTypeFootprintSchemaType = z.infer<typeof CargoTypeFootprintSchema>

export type CargoTypeCategorySchemaType = z.infer<typeof CargoTypeCategorySchema>

export type DimensionRangeSchemaType = z.infer<typeof DimensionRangeSchema>

export type WeightRangeSchemaType = z.infer<typeof WeightRangeSchema>

export type DateSettingSchemaType = z.infer<typeof DateSettingSchema>

export type PassengerTypeClassSchemaType = z.infer<typeof PassengerTypeClassSchema>
