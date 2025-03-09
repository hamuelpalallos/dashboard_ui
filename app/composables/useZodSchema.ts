import { z } from 'zod'

const MSGS = {
  'field.required': 'Required',
  'number.range': 'The minimum must be less than or equal to the maximum',
  'number.natural': 'Cannot be less than 0',
  'field.unused': 'Remove unused fields',
  'field.unique': 'Duplicate is not allowed'
}
export const useZodSchema = () => {
  const RequiredStringSchema = z.string().refine(value => value.trim().length > 0, MSGS['field.required'])
  const DatabaseRecordSchema = z.object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    index: z.number().optional(),
    description: z.string().optional(),
    active: z.boolean().default(true)
  })

  const DateRangeSchema = z.object({
    start: z.date().optional().refine(v => v, 'Required'),
    end: z.date().optional().refine(v => v, 'Required')
  })

  // const DateSettingSchemaOld = z.object({
  //   type: z.enum(DATE_SETTING_TYPES).default('range'),
  //   mode: z.enum(DATE_SETTING_MODES).default('datetime'),
  //   range: DateRangeSchema.optional(),
  //   single: z.date().optional(),
  //   multiple: z.array(z.date()).optional(),
  //   multipleRange: z.array(DateRangeSchema).optional()
  // }).refine((data: any) => {
  //   switch (data.type) {
  //     case 'range':
  //       return data.range !== undefined
  //     case 'single':
  //       return data.single !== undefined
  //     case 'multiple':
  //       return data.multiple !== undefined
  //     case 'multiple-range':
  //       return data.multipleRange !== undefined
  //     default:
  //       return false
  //   }
  // }, {
  //   message: 'The correct date field must be provided based on the type field',
  //   path: ['type']
  // })

  const DateSettingSchema = z.object({
    type: z.enum(DATE_SETTING_TYPES).default('range'),
    mode: z.enum(DATE_SETTING_MODES).default('datetime'),
    range: DateRangeSchema.optional(),
    single: z.date().optional(),
    multiple: z.array(z.date()).optional(),
    multipleRange: z.array(DateRangeSchema).optional()
  }).refine((data: any) => {
    switch (data.type) {
      case 'range':
        return data.range !== undefined
      case 'single':
        return data.single !== undefined
      case 'multiple':
        return data.multiple !== undefined
      case 'multiple-range':
        return data.multipleRange !== undefined
      default:
        return false
    }
  }, {
    message: 'The correct date field must be provided based on the type field',
    path: ['type']
  })

  const FeeSchema = z.object({
    type: z.enum(FEE_TYPES),
    percent: z.number().min(0).default(0),
    min: z.number().min(0).default(0),
    max: z.number().min(0).default(0),
    fixed: z.number().min(0).default(0)
  }).refine((data) => {
    if (data.type.includes('min-max')) {
      return data.min <= data.max
    }
    return true
  }, MSGS['number.range'])

  const FeeItemSchema = z.object({
    name: RequiredStringSchema,
    description: z.string(),
    fee: FeeSchema
  })

  const AgeRangeSchema = z.object({
    type: z.enum(OPTIONAL_RANGE_TYPES),
    min: z.number().min(0).default(0),
    max: z.number().min(0).default(0)
  }).refine((data) => {
    if (data.type === 'min-max') {
      return data.min <= data.max
    }
    return true
  }, MSGS['number.range'])

  const UserNameSchema = z.object({
    first: z.string(),
    last: z.string(),
    middle: z.string().optional(),
    display: z.string().optional()
  })

  const DayOfWeekSchema = z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
    z.literal(7)
  ])

  const TimeScheduleSchema = z.object({
    time: z.string().refine(value => /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(value), 'Invalid time format, expected HH:mm'),
    excludedDays: z.array(DayOfWeekSchema).default([]).refine(array => array.length === new Set(array).size, 'Duplicated value is not allowed'),
    active: z.boolean().default(true)
  })
  const PortSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3),
    description: z.string().optional(),
    active: z.boolean().default(true),
    address: z.object({
      modular: z.boolean().default(false),
      text: z.string().min(1, MSGS['field.required'])
    }),
    fees: z.array(FeeItemSchema).default([])
  })

  const PassengerTypeSchema = DatabaseRecordSchema.extend({
    name: z.string(),
    description: z.string().optional(),
    ageRange: AgeRangeSchema,
    fee: FeeSchema,
    rate: z.number(),
    index: z.number(),
    active: z.boolean(),
    isFree: z.boolean().optional(),
    requiredId: z.boolean().optional()
  })

  const PassengerTypeClassSchema = DatabaseRecordSchema.extend({
    name: RequiredStringSchema,
    rate: z.number().min(0),
    ageRange: AgeRangeSchema,
    verify: z.boolean().default(false),
    fee: FeeSchema
  })
  // const PassengerTypeClassSchema = DatabaseRecordSchema.extend({
  //   name: z.string(),
  //   ageRange: AgeRangeSchema,
  //   fee: FeeSchema,
  //   rate: z.number()
  // })
  // const RoutePassengerTypeClassSchema = z.object({
  //   id: z.string().min(1, MSGS['field.unused']),
  //   rate: z.number().min(0),
  //   class: z.instanceof(PassengerTypeClassInstance).optional()
  // })
  // const RouteCargoTypeClassSchema = z.object({
  //   id: z.string().min(1, MSGS['field.unused']),
  //   rate: z.number().min(0),
  //   class: z.instanceof(CargoTypeClassInstance).optional()
  // })
  const ReferenceFieldSchema = z.object({
    id: z.string().refine(value => value.trim().length > 0, MSGS['field.required'])

  })

  const TripCancellationSchema = z.object({
    id: z.string().optional(),
    title: z.string().refine(value => value.trim().length > 0, MSGS['field.required']),
    description: z.string().refine(value => value.trim().length > 0, MSGS['field.required']),
    // routeIds: z.array(z.string()).nonempty().optional(),
    routes: z.array(z.instanceof(RouteInstance)).default([]).refine(v => v?.length, MSGS['field.required']),
    // routes: z.array(z.instanceof(RouteInstance)).default([]),
    dateSetting: DateSettingSchema,
    active: z.boolean().default(true),
    type: z.enum(TRIP_CANCELLATION_TYPES).default('default'),
    withNotice: z.boolean().default(true)

  })

  // const RouteCargoTypeFootprintSchema = z.object({
  //   id: z.string(),
  //   allocation: z.number().min(0),
  //   footprint: z.instanceof(CargoTypeFootprintInstance, { message: MSGS['field.unused'] })
  // })

  // const RouteCapacityFormSchema = z.object({
  //   cargo: z.number().min(0).default(0),
  //   passenger: z.number().min(0).default(0),
  //   cargoTypeFootprints: z.array(RouteCargoTypeFootprintSchema).default([])
  // })

  const RouteCapacitySchema = z.instanceof(RouteCapacityInstance)
    .refine(v => v.cargo >= 0, ({ path: ['cargo'], message: MSGS['number.natural'] }))
    .refine(v => v.passenger >= 0, ({ path: ['passenger'], message: MSGS['number.natural'] }))
    .refine(v => v.cargoTypeFootprints.findIndex(c => !c.id) === -1, (v) => {
      const index = v.cargoTypeFootprints.findIndex(c => !c.id)
      return {
        message: MSGS['field.unused'],
        path: ['cargoTypeFootprints', `${index}`, 'footprint']
      }
    })
    .refine(v => v.cargoTypeFootprints.findIndex(c => c.allocation <= 0) === -1, (v) => {
      const errorIndex = v.cargoTypeFootprints.findIndex(c => c.allocation < 0)
      return {
        message: MSGS['number.natural'],
        path: ['cargoTypeFootprints', `${errorIndex}`, 'allocation']
      }
    })
    .refine((v) => {
      const times = v.cargoTypeFootprints.map(i => i.id).filter(i => i)
      return times.length === new Set(times).size
    }, (v) => {
      const index = v.cargoTypeFootprints.findIndex((f, i, arr) => arr.findIndex(f2 => f2.id === f.id) !== i)
      return {
        message: MSGS['field.unique'],
        path: ['cargoTypeFootprints', index, 'footprint']
      }
    })

  const RoutePassengerClasses = z.array(z.instanceof(RoutePassengerTypeClassInstance)).default([])
    .refine(v => v.findIndex(c => !c.id) === -1, (v) => {
      const index = v.findIndex(c => !c.id)
      return {
        message: MSGS['field.unused'],
        path: [index, 'class']
      }
    })
    .refine((v) => {
      const times = v.map(i => i.id).filter(i => i)
      return times.length === new Set(times).size
    }, (v) => {
      const index = v.findIndex((f, i, arr) => arr.findIndex(f2 => f2.id === f.id) !== i)
      return {
        message: MSGS['field.unique'],
        path: [index, 'class']
      }
    })
    .refine(v => v.findIndex(c => c.rate < 0) === -1, (v) => {
      const index = v.findIndex(c => c.rate < 0)
      return {
        message: MSGS['number.natural'],
        path: [index, 'rate']
      }
    })

  const RouteCargoTypeClasses = z.array(z.instanceof(RouteCargoTypeClassInstance)).default([])
    .refine(v => v.findIndex(c => !c.id) === -1, (v) => {
      const index = v.findIndex(c => !c.id)
      return {
        message: MSGS['field.unused'],
        path: [index, 'class']
      }
    })
    .refine((v) => {
      const times = v.map(i => i.id).filter(i => i)
      return times.length === new Set(times).size
    }, (v) => {
      const index = v.findIndex((f, i, arr) => arr.findIndex(f2 => f2.id === f.id) !== i)
      return {
        message: MSGS['field.unique'],
        path: [index, 'class']
      }
    })
    .refine(v => v.findIndex(c => c.rate < 0) === -1, (v) => {
      const index = v.findIndex(c => c.rate < 0)
      return {
        message: MSGS['number.natural'],
        path: [index, 'rate']
      }
    })

  const RouteSchema = z.object({
    id: z.string().optional(),
    active: z.boolean().default(true),

    origin: z.instanceof(PortInstance).optional().refine(v => v, MSGS['field.required']),
    destination: z.instanceof(PortInstance).optional().refine(v => v, MSGS['field.required']),

    // capacity: z.instanceof(RouteCapacityInstance).optional().refine(v => v, VALIDATE_MSG['field.required']),
    capacity: RouteCapacitySchema,
    passengerTypeClasses: RoutePassengerClasses,
    cargoTypeClasses: RouteCargoTypeClasses,

    schedules: z.array(z.instanceof(TimeScheduleInstance)).default([]).refine((data) => {
      const times = data.map(t => t.time.toString())
      return times.length === new Set(times).size
    }, (data) => {
      const errorIndex = data.findIndex((f, i, arr) => arr.findIndex(f2 => f2.time.toString() === f.time.toString()) !== i)
      return {
        message: MSGS['field.unique'],
        path: [errorIndex, 'time']
      }
    }),
    // schedules: z.array(TimeScheduleSchema).default([]),
    description: z.string().optional(),
    duration: z.instanceof(DurationInstance).default(DurationInstance.zero).optional(),
    index: z.number().default(0)
  }).refine((data) => {
    return data?.origin?.id !== data?.destination?.id
  }, {
    message: 'The destination must be different',
    path: ['destination']
  }).refine((data) => {
    const ids = data.cargoTypeClasses.map(t => t.id)
    return ids.length === new Set(ids).size
  }, (data) => {
    const errorIndex = data.cargoTypeClasses.findIndex((f, i, arr) => arr.findIndex(f2 => f2.id === f.id) !== i)
    return {
      message: `Duplicate vehicle type is not allowed.`,
      path: ['cargoTypes', errorIndex, 'id']
    }
  }).refine((data) => {
    const ids = data.passengerTypeClasses.map(t => t.id)
    return ids.length === new Set(ids).size
  }, (data) => {
    const errorIndex = data.passengerTypeClasses.findIndex((f, i, arr) => arr.findIndex(f2 => f2.id === f.id) !== i)
    return {
      message: `Duplicate passenger type is not allowed.`,
      path: ['passengerTypes', errorIndex, 'id']
    }
  })

  const NoticeSchema = z.object({
    id: z.string().optional(),
    title: z.string().refine(value => value.trim().length > 0, 'Required'),
    description: z.string().refine(value => value.trim().length > 0, 'Required'),
    type: z.enum(NOTICE_TYPES).default('default'),
    dateSetting: DateSettingSchema,
    derived: z.object({
      id: z.string().optional(),
      type: z.enum(DERIVED_REFERENCE_TYPES).optional()
    }).optional().refine((data) => {
      return !(data?.type && !data?.id)
    }, {
      message: 'Required',
      path: ['type']
    }),
    active: z.boolean().default(true)
  })

  const NumberRangeSchema = z.object({
    min: z.number().min(0),
    max: z.number().min(0)
  })

  const NumberRangeRefinedSchema = NumberRangeSchema.refine(data => data.min <= data.max, MSGS['number.range'])

  const WeightRangeSchema = NumberRangeSchema.extend({
    unit: z.enum(WEIGHT_UNITS)
  }).refine(data => data.min <= data.max, { message: MSGS['number.range'], path: ['min'] })

  const DimensionRangeSchema = z.object({
    unit: z.enum(LENGTH_UNITS),
    length: NumberRangeSchema,
    width: NumberRangeSchema,
    height: NumberRangeSchema
  })

  const CargoTypeFootprintSchema = DatabaseRecordSchema.extend({
    name: z.string(),
    size: z.number(),
    dimensionRange: DimensionRangeSchema.optional(),
    weightRange: WeightRangeSchema.optional()
  })

  const CargoTypeCategorySchema = DatabaseRecordSchema.extend({
    name: z.string()
  })

  // const TripCapacitySchema = z.object({
  //   cargo: z.number().min(0).default(0),
  //   passenger: z.number().min(0).default(0),
  //   cargoTypeFootprints: z.array(RouteCargoTypeFootprintSchema).default([]),
  // })

  const TripSchema = DatabaseRecordSchema.extend({
    number: RequiredStringSchema,
    company: z.instanceof(CompanyInstance).optional(),
    schedule: z.instanceof(TimeScheduleInstance).optional(),
    conveyance: z.instanceof(ConveyanceInstance).optional(),
    route: z.instanceof(RouteInstance).optional(),
    type: z.enum(TRIP_TYPES).optional(),
    departure: z.date().optional(),
    duration: z.instanceof(DurationInstance).optional(),
    // passengers: z.array(z.instanceof(PassengerInstance)).default([]),
    // cargos: z.array(z.instanceof(CargoInstance)).default([]),
    tickets: z.array(z.instanceof(TicketInstance)).optional().default([]),
    arrival: z.date().optional(),
    status: z.enum(TRIP_STATUSES).optional()
  }).refine((data) => {
    return !!data.conveyance
  }, {
    message: 'Required',
    path: ['conveyance']
  }).refine((data) => {
    return !!data.departure
  }, {
    message: 'Required',
    path: ['departure']
  }).refine((data) => {
    return !!data.route
  }, {
    message: 'Required',
    path: ['route']
  })

  return {
    UserNameSchema,
    PassengerTypeSchema,
    PassengerTypeClassSchema,
    ReferenceFieldSchema,
    NumberRangeRefinedSchema,
    TimeScheduleSchema,
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
    DateSettingSchema
  }
}
