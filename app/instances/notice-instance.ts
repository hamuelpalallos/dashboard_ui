// import { useChangeCase } from '@vueuse/integrations/useChangeCase.mjs'

export class NoticeInstance {
  data: Notice
  constructor(data: Notice) {
    this.data = data
  }

  table_row = (): TableRowNotice => {
    const format = useFormat()

    return {
      id: format.str_empty(this.data.id),
      title: format.str_empty(this.data.title),
      dateSetting: format.date_setting(this.data.dateSetting),
      description: format.description(this.data.description),
      createdAt: format.datetime(this.data.createdAt),
      updatedAt: format.datetime(this.data.updatedAt),
      active: format.str_bool(this.data.active),
      index: format.index(this.data.index),
      type: format.capital_case(this.data.type),
      derived: format.derived_reference(this.data.derived)
    }
  }

  static toTableRows = (items: Notice[]): TableRowNotice[] => {
    const format = useFormat()
    return items.map((i) => {
      return {
        id: format.str_empty(i.id),
        title: format.str_empty(i.title),
        dateSetting: format.date_setting(i.dateSetting),
        description: format.description(i.description),
        createdAt: format.datetime(i.createdAt),
        updatedAt: format.datetime(i.updatedAt),
        active: format.str_bool(i.active),
        index: format.index(i.index),
        type: format.capital_case(i.type),
        derived: format.derived_reference(i.derived)
      }
    })
  }

  toFirestore(companyId: string) {
    const format = useFormat()
    const company_reference = useCompanyReference(companyId) as any
    const formattedDerived = this.data?.derived?.type ? format.capitalize(this.data?.derived?.type) as string : undefined
    return {
      ...this.data,
      derived: this.data.derived && formattedDerived
        ? {
            ...this.data.derived,
            dataReference: company_reference?.[`${formattedDerived}`]?.(this.data.derived.id)
          }
        : undefined,
      id: this.data?.id ?? this.data?.derived?.id
    }
  }

  static rawsToRows = (notices: Notice[]): TableRowNotice[] => {
    return notices.map(notice => new NoticeInstance(notice).table_row()) ?? []
  }
}
