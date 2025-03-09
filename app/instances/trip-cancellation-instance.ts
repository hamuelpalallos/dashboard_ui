export const TRIP_CANCELLATION_ROUTE_EXCLUDED_FIELDS = [
  'index',
  'capacity',
  'passengerTypes',
  'cargoTypes',
  'trips',
  'duration',
  'description'

]

export class TripCancellationInstance implements TripCancellation {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  // deleted?: DeletedDataInstance
  title?: string
  description?: string

  routes?: RouteInstanceType[]
  dateSetting?: DateSetting
  active?: boolean
  type?: TripCancellationType
  withNotice?: boolean // default: true --only on create
  notice?: Notice
  // status?: TripCancellationStatus
  index?: number

  constructor(data: TripCancellation) {
    // Object.assign(this, data)
    this.id = data.id ?? ''
    this.createdAt = data.createdAt ?? new Date()
    this.updatedAt = data.updatedAt ?? new Date()
    this.title = data.title ?? ''
    this.description = data.description ?? ''
    this.routes = data.routes?.map(route => new RouteInstance(route)) ?? []
    this.dateSetting = data.dateSetting
    this.active = data.active ?? true
    this.type = data.type ?? 'default'
    this.withNotice = data.withNotice ?? true
    this.notice = data.notice ?? {}
    // this.status = data.status ?? ''
    this.index = data.index ?? 0
  }

  get routeIds(): string[] {
    return this.routes?.map(route => route.id!) ?? []
  }

  // get routeReferenceIds(): ReferenceId[] {
  //   return this.routes?.map((route) => ({ id: route.id! })) ?? []
  // }

  toTableRow = (): TableRow<TripCancellation> => {
    const format = useFormat()

    return {
      id: format.str_empty(this.id),
      title: format.str_empty(this.title),
      routes: format.count(this.routes),
      dateSetting: format.date_setting(this.dateSetting),
      description: format.str_empty(this.description),
      createdAt: format.datetime(this.createdAt),
      updatedAt: format.datetime(this.updatedAt),
      active: format.str_bool(this.active),
      index: format.index(this.index),
      type: format.capital_case(this.type),
      withNotice: format.str_bool(this.withNotice),
      notice: format.str_bool(!!this.notice)
      // status: format.capital_case(this.status)
    }
  }

  toSchema = (): TripCancellationSchemaType => {
    return {
      id: this.id,
      dateSetting: this.dateSetting ?? {
        type: 'range',
        mode: 'datetime',
        range: {
          start: new Date(),
          end: new Date()
        }
      } as DateSetting,
      type: this.type ?? 'default',
      routes: this.routes ?? [], // Add '?? []' to handle 'undefined' case
      active: this.active ?? false,
      withNotice: this.withNotice ?? false,
      description: this.description ?? '',
      title: this.title ?? ''
    }
  }

  static initialValue = (): TripCancellationSchemaType => {
    return {
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
  }

  static mapToTableRow(data: TripCancellation, format = useFormat()): TableRowTripCancellation {
    return {
      id: format.str_empty(data.id),
      title: format.str_empty(data.title),
      routes: format.count(data.routes),
      dateSetting: format.date_setting(data.dateSetting),
      description: format.str_empty(data.description),
      createdAt: format.datetime(data.createdAt),
      updatedAt: format.datetime(data.updatedAt),
      active: format.str_bool(data.active),
      index: format.index(data.index),
      type: format.capital_case(data.type),
      withNotice: format.str_bool(data.withNotice),
      notice: format.str_bool(!!data.notice)
      // status: format.capital_case(i.status)
    }
  }

  static toTableRows = (items: TripCancellation[]): TableRowTripCancellation[] => {
    const format = useFormat()
    return items.map(i => TripCancellationInstance.mapToTableRow(i, format))
  }

  copyWith(o: Partial<TripCancellation>): TripCancellationInstance {
    return new TripCancellationInstance({ ...this.toJson(), ...o })
  }

  static fromJson = (v: TripCancellation): TripCancellationInstance => {
    return new TripCancellationInstance(v)
  }

  static schemaToJson = (schema: TripCancellationSchemaType): TripCancellation => {
    return schema as TripCancellation
  }

  toJson(): TripCancellation {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore = (): TripCancellationFirestore => {
    // const reference = useCompanyReference(companyId)
    const reference = useUserStore().companyReference
    if (!reference) throw new Error('No company reference')
    return {
      title: this.title,
      description: this.description,
      dateSetting: this.dateSetting,
      active: this.active,
      type: this.type,
      withNotice: this.withNotice,
      routeReferences: this.id && this.routes ? this.routes?.map(route => reference.route(route.id!)) : [],
      // routeSnapshots: this.routes?.map(i => i.toFirestore()) ?? [],
      noticeReference: this.withNotice && this.id ? reference.notice(this.id!) : undefined
      // status: this.status
    }
  }

  // static toFormList = (items: TripCancellation[]): TripCancellationForm[] => {
  //   return items.map(item => new TripCancellationInstance(item).toForm())
  // }

  generateNotice = (newId?: string): Notice => {
    return {
      title: this.title,
      description: this.description,
      type: 'default',
      dateSetting: this.dateSetting,
      active: this.active,
      derived: {
        id: newId ?? this.id!,
        type: 'trip-cancellation'
      }
    }
  }

  // generateNoticeFirestore = (): NoticeFirestore => {
  //   return {
  //     deleted: undefined,
  //     title: this.title,
  //     description: this.description,
  //     type: 'default',
  //     dateSetting: this.dateSetting,
  //     active: this.active,
  //     derived: {
  //       id: this.id!,
  //       type: 'trip-cancellation',
  //       dataReference: undefined,
  //     },
  //   }
  // }

  static fromFirestore = (data: TripCancellation): TripCancellationInstance => {
    return new TripCancellationInstance(data)
  }

  static fromFirestoreList = (data: TripCancellation[]): TripCancellationInstance[] => {
    return data.map(item => new TripCancellationInstance(item))
  }

  // FORM

  // toForm = (): TripCancellationForm => {
  //   return {
  //     id: this.id,
  //     title: this.title,
  //     description: this.description,
  //     dateSetting: this.dateSetting,
  //     active: this.active,
  //     type: this.type,
  //     withNotice: this.withNotice,
  //     routeIds: this.routeIds
  //   }
  // }

  // static formToFirestore = (form: TripCancellationForm, companyId: string): TripCancellationFirestore => {
  //   const reference = useCompanyReference(companyId)
  //   return {
  //     id: form.id,
  //     title: form.title,
  //     description: form.description,
  //     dateSetting: form.dateSetting,
  //     active: form.active,
  //     type: form.type,
  //     withNotice: form.withNotice,
  //     routeReferences: form.routeIds?.map(id => reference.route(id)) ?? [],
  //     noticeReference: form.withNotice && form.id ? reference.notice(form.id!) : undefined,
  //     // status: form.status
  //   }
  // }

  // static generateNoticeFromForm = (form: TripCancellationForm, companyId: string): Notice => {
  //   return {
  //     // id: form.id,
  //     title: form.title,
  //     description: form.description,
  //     type: 'default',
  //     dateSetting: form.dateSetting,
  //     active: form.active,
  //     derived: form.id
  //       ? {
  //           id: form.id,
  //           type: 'trip-cancellation'
  //         }
  //       : undefined
  //   }
  // }
}
