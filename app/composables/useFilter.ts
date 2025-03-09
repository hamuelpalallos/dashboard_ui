import { isSameDay, isSameHour, isSameMonth, isSameWeek, isSameYear } from 'date-fns'

interface FilterActive {
  active?: boolean
}
interface FilterRole {
  role?: UserRole
  active?: boolean
  port?: Port
}
type Direction = 'asc' | 'desc'

export function useFilter() {
  const active = <T extends FilterActive>(items?: T[]) => {
    if (!items)
      return []
    return items.filter(item => item?.active)
  }

  const admin_any = <T extends FilterRole>(items?: T[]) => {
    if (!items)
      return []
    return items.filter((item: T) => {
      return item.role === 'company-admin' || item.role === 'port-admin'
    })
  }

  const admin_company = <T extends FilterRole>(items?: T[]) => {
    if (!items)
      return []
    return items.filter((item: T) => {
      return item.role === 'company-admin' && item.active === true
    })
  }

  const admin_port = <T extends FilterRole>(items?: T[]) => {
    if (!items)
      return []
    return items.filter((item: T) => {
      return item.role === 'port-admin' && item.active === true
    })
  }

  const conductor = <T extends FilterRole>(items?: T[]) => {
    if (!items)
      return []
    return items.filter((item: T) => {
      return item.role === 'port-conductor' && item.active === true
    })
  }

  const conductors_port = <T extends FilterRole>(items?: T[], portId?: string) => {
    if (!items)
      return []
    return items.filter((item: T) => {
      return item.role === 'port-conductor' && item?.port?.id === portId
    })
  }

  const tickets_paid = (items?: Ticket[]) => {
    if (!items)
      return []
    return items.filter((item) => {
      return item.payment && (item.status === 'paid' || item.status === 'used')
      // return item.payment && item.status !== 'cancelled' && item.status !== 'refunded'
    })
  }

  const tickets_used = (items?: Ticket[]) => {
    if (!items)
      return []
    return items.filter((item) => {
      return item.payment && item.status === 'used'
    })
  }

  // get the ticket by date range
  const tickets_date_range = (items?: Ticket[], date1 = new Date(), date2 = new Date()) => {
    // get the date that is greater than the other and set it as the start date
    if (!items)
      return []
    const startDate = date1 < date2 ? date1 : date2
    const endDate = date1 > date2 ? date1 : date2

    return items.filter((item) => {
      if (!item.departure) return false
      const departure = new Date(item.departure)
      return isSameDay(departure, startDate) || isSameDay(departure, endDate) || (departure > startDate && departure < endDate)
    })
  }

  const tickets_datetime_range = (items?: Ticket[], date1 = new Date(), date2 = new Date()) => {
    // get the date that is greater than the other and set it as the start date
    if (!items)
      return []
    const startDate = date1 < date2 ? date1 : date2
    const endDate = date1 > date2 ? date1 : date2

    return items.filter((item) => {
      if (!item.departure) return false
      const departure = new Date(item.departure)
      return departure > startDate && departure < endDate
    })
  }

  const tickets_date = (items?: Ticket[], date = new Date()) => {
    if (!items)
      return []

    return items.filter((item) => {
      if (!item.departure) return false
      const departure = new Date(item.departure)
      return isSameDay(departure, date)
    })
  }

  const tickets_paid_date_range = (items?: Ticket[], date1 = new Date(), date2 = new Date()) => {
    if (!items)
      return []
    return tickets_paid(tickets_date_range(items, date1, date2))
  }

  const tickets_paid_route_date_range = (items?: Ticket[], routeId?: string, date1 = new Date(), date2 = new Date()) => {
    if (!items)
      return []
    return tickets_route(tickets_paid(tickets_date_range(items, date1, date2)), routeId)
  }

  const tickets_used_route_date_range = (items?: Ticket[], routeId?: string, date1 = new Date(), date2 = new Date()) => {
    if (!items)
      return []
    return tickets_route(tickets_used(tickets_date_range(items, date1, date2)), routeId)
  }

  // const tickets_paid_route_date_periodic = (items?: Ticket[], routeId?: string, date1 = new Date(), date2 = new Date()) => {
  //   if (!items) return []
  //   return tickets_route(tickets_paid(tickets_date_range(items, date1, date2)), routeId)
  // }
  const tickets_route = (items?: Ticket[], routeId?: string) => {
    if (!items)
      return []
    if (!routeId)
      return items
    return items.filter((item) => {
      return item.route.id === routeId
    })
  }

  const tickets_route_date = (items?: Ticket[], routeId?: string, date = new Date()) => {
    if (!items)
      return []
    return tickets_route(tickets_date(items, date), routeId)
  }

  const items_sort_field = <T>(items?: T[], key?: keyof T, direction: Direction = 'asc') => {
    if (!items)
      return []
    // sort the items by field using the key
    if (!key)
      return items
    return items.sort((a: any, b: any) => {
      if (a[key] < b[key])
        return direction === 'asc' ? -1 : 1

      if (a[key] > b[key])
        return direction === 'asc' ? 1 : -1

      return 0
    })
  }

  const tickets_hour = (items?: Ticket[], date = new Date()) => {
    if (!items)
      return []

    return items.filter((item) => {
      if (!item.departure) return false
      const departure = new Date(item.departure)
      return isSameHour(departure, date)
    })
  }

  const tickets_day = (items?: Ticket[], date = new Date()) => {
    return tickets_date(items, date)
    // if (!items)
    //   return []

    // return items.filter((item) => {
    //   const departure = new Date(item.departure)
    //   return isSameDay(departure, date)
    // })
  }

  const tickets_week = (items?: Ticket[], date = new Date()) => {
    if (!items)
      return []

    return items.filter((item) => {
      if (!item.departure) return false
      const departure = new Date(item.departure)
      return isSameWeek(departure, date)
    })
  }

  const tickets_month = (items?: Ticket[], date = new Date()) => {
    if (!items)
      return []

    return items.filter((item) => {
      if (!item.departure) return false
      const departure = new Date(item.departure)
      return isSameMonth(departure, date)
    })
  }
  const tickets_year = (items?: Ticket[], date = new Date()) => {
    if (!items)
      return []

    return items.filter((item) => {
      if (!item.departure) return false
      const departure = new Date(item.departure)
      return isSameYear(departure, date)
    })
  }

  const ids = <T extends { id: string }>(items: T[], id: string): T[] => {
    // return the object that has the id
    if (!items)
      return []
    return items.filter(item => item.id === id)
  }

  const id = <T extends { id: string }>(items: T[], id: string): T | undefined => {
    // return the object that has the id
    if (!items)
      return
    return items.find(item => item.id === id)
  }

  return {
    id,
    ids,
    tickets_hour,
    tickets_day,
    tickets_week,
    tickets_month,
    tickets_year,
    tickets_datetime_range,
    items_sort_field,
    tickets_route,
    conductors_port,
    tickets_route_date,
    tickets_used,
    tickets_paid,
    tickets_date_range,
    tickets_date,
    tickets_paid_date_range,
    tickets_paid_route_date_range,
    tickets_used_route_date_range,
    // tickets_paid_route_date_periodic,
    active,
    // admin,
    admin_any,
    admin_company,
    admin_port,
    conductor
  }
}
