// import { toTypedSchema } from '@vee-validate/zod'
// import { useForm } from 'vee-validate'
import type { z } from 'zod'

export const useZodForm = (type?: ZodConfigType) => {
  const configType = type
  const sch = useZodSchema()
  type CargoTypeFootprintSchemaType = z.infer<typeof sch.CargoTypeFootprintSchema>
  const schema = computed(() => {
    switch (configType) {
      case 'trip':
        return sch.TripSchema
      case 'port':
        return sch.PortSchema
      case 'fee':
        return sch.FeeSchema
      case 'fee-item':
        return sch.FeeItemSchema
      case 'trip-cancellation':
        return sch.TripCancellationSchema
      case 'route':
        return sch.RouteSchema
      case 'notice':
        return sch.NoticeSchema
      case 'cargo-type-footprint':
        return sch.CargoTypeFootprintSchema
      case 'cargo-type-category':
        return sch.CargoTypeCategorySchema
    }
  })

  const initialTrip: TripSchemaType = {
    id: '',
    number: '',
    description: '',
    active: true,
    type: 'sea',
    tickets: []
  }

  const initialPort: PortSchemaType = {
    id: '',
    name: '',
    description: '',
    active: true,
    address: {
      modular: false,
      text: ''
    },
    fees: []
  }

  const initialRoute: RouteSchemaType = {
    id: '',
    origin: undefined,
    destination: undefined,
    index: 0,
    active: true,
    passengerTypeClasses: [],
    cargoTypeClasses: [],
    schedules: [],
    duration: undefined,
    description: undefined,
    capacity: new RouteCapacityInstance({
      cargo: 10,
      passenger: 20,
      cargoTypeFootprints: []
    })
  }
  const initialNotice: Partial<NoticeSchemaType> = {
    id: '',
    title: '',
    dateSetting: {
      type: 'range',
      mode: 'datetime',
      range: {
        start: undefined,
        end: undefined
      }
    },
    description: '',
    type: 'default',
    active: true,
    derived: undefined
  }
  const initialFee: FeeSchemaType = {
    type: 'percent',
    percent: 0,
    fixed: 0,
    min: 0,
    max: 0
  }
  const initialFeeItem: FeeItemSchemaType = {
    name: '',
    description: '',
    fee: initialFee
  }
  // types
  // 'port',
  // 'fee',
  // 'fee-item',
  // 'route',
  // 'notice',
  // 'user',
  // 'passenger-type',
  // 'passenger-type-class',
  // 'cargo-type',
  // 'cargo-type-class',
  // 'cargo-type-footprint',
  // 'cargo-type-category',
  // 'conveyance',
  // 'trip',
  // type CustomZodConfigType = Omit<ZodConfigType, 'notice' | 'user' | 'passenger-type' | 'passenger-type-class' | 'cargo-type' | 'cargo-type-class' | 'cargo-type-category' | 'cargo-type-footprint' | 'conveyance'>
  // type XX = { [key: CustomZodConfigType]: any }
  // const initial: XX = {
  //   route: initialRoute,
  //   trip: initialTrip,
  //   port: initialPort,
  //   fee: initialFee,
  //   feeItem: initialFeeItem
  // }
  const initialTripCancellation: TripCancellationSchemaType = {
    id: '',
    dateSetting: {
      type: 'range',
      mode: 'datetime',
      range: {
        start: new Date(),
        end: new Date()
      }
    } as DateSetting,
    type: 'default',
    routes: [],
    active: true,
    withNotice: true,
    description: '',
    title: ''
  }

  const initialCargoTypeFootprint: CargoTypeFootprintSchemaType = {
    id: '',
    name: '',
    size: 0,
    dimensionRange: {
      unit: 'meter',
      width: { min: 0, max: 0 },
      height: { min: 0, max: 0 },
      length: { min: 0, max: 0 }
    },
    weightRange: {
      unit: 'kilogram',
      min: 0,
      max: 0
    },
    active: true
  }
  const initialValues = computed(() => {
    switch (configType) {
      case 'fee': return initialFee
      case 'port':return initialPort
      case 'trip': return initialTrip
      case 'route': return initialRoute
      case 'notice' : return initialNotice
      case 'fee-item': return initialFeeItem
      case 'trip-cancellation': return initialTripCancellation
      case 'cargo-type-footprint': return initialCargoTypeFootprint
    }
  })

  // const validationSchema = computed(() => {
  //   return toTypedSchema(schema.value as any)
  // })

  // const form = () => {
  //   return useForm<T>({
  //     validationSchema,
  //     initialValues: (initialValues.value as any)
  //   })
  // }

  return {
    // validationSchema,
    // Field,
    // form,
    schema,
    initialValues,
    initialRoute,
    initialTripCancellation
    // ...form()
  }
}
