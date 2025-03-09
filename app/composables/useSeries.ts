import { subDays } from 'date-fns'

export function useSeries() {
  const filter = useFilter()
  const date_utils = useDate()
  const map = useMap()

  const passengers_cargos_date_range = (tickets?: Ticket[], startDate: Date = subDays(new Date(), 7), endDate: Date = new Date()): { passengers: number[], vehicles: number[] } => {
    const dates = useDate().getDatesBetween(startDate, endDate)
    const passengers: number[] = []
    const vehicles: number[] = []

    dates.forEach((date) => {
      // const tickets = getTicketsByDate(date)
      const ticketsDate = filter.tickets_date(tickets, date)
      let passengerCount = 0
      let vehicleCount = 0
      ticketsDate.forEach((ticket: Ticket) => {
        passengerCount += ticket.passengers.length
        vehicleCount += ticket.cargos.length
      })

      passengers.push(passengerCount)
      vehicles.push(vehicleCount)
    })

    return {
      passengers,
      vehicles,
    }
  }

  const sales_date_range = (tickets?: Ticket[], date = subDays(new Date(), 7), date2 = new Date()) => {
    if (!tickets)
      return []

    const startDate = date < date2 ? date : date2
    const endDate = date > date2 ? date : date2

    const dates = useDate().getDatesBetween(startDate, endDate)
    const salesSeries: number[] = []

    dates.forEach((date) => {
      const ticketsDate = filter.tickets_date(tickets, date)
      let sales = 0
      ticketsDate.forEach((ticket: Ticket) => {
        sales += ticket.subtotal
      })

      salesSeries.push(sales)
    })
    return salesSeries
  }

  const sales_hourly = (tickets: Ticket[], date1: Date, date2: Date) => {
    const { startDate, endDate } = date_utils.dates_start_end(date1, date2)
    const sales: number[] = []
    const dates = date_utils.between_hours(startDate, endDate)

    dates.forEach((date) => {
      const tickets_hour = filter.tickets_hour(tickets, date)
      let sum = 0
      tickets_hour.forEach((ticket: Ticket) => {
        sum += ticket.subtotal
      })
      sales.push(sum)
    })

    return {
      series: sales,
      categories: map.dates(dates),
    }
  }

  const sales_daily = (tickets: Ticket[], date1: Date, date2: Date) => {
    const { startDate, endDate } = date_utils.dates_start_end(date1, date2)
    const sales: number[] = []
    const dates = date_utils.between_days(startDate, endDate)

    let sales_passenger_regular = 0
    let sales_passenger_other = 0
    let sales_cargo = 0
    let sales_total = 0
    let number_passengers = 0
    let number_vehicles = 0
    dates.forEach((date) => {
      const tickets_date = filter.tickets_date(tickets, date)
      let sum = 0

      tickets_date.forEach((ticket: Ticket) => {
        sum += ticket.subtotal
        sales_total += ticket.subtotal

        number_passengers += ticket.passengers.length ?? 0
        number_vehicles += ticket.cargos.length ?? 0

        ticket.passengers.forEach((passenger) => {
          // check for paid and not free passengers
          if (!passenger?.type?.free && !passenger?.ticket?.isFree) {
            if (passenger.type?.name?.toLowerCase() === 'regular') {
              sales_passenger_regular += passenger?.type?.classSnapshot?.rate ?? 0
            }
            else {
              sales_passenger_other += passenger?.type?.classSnapshot?.rate ?? 0
            }
          }
        })

        if (ticket.cargos) {
          ticket.cargos.forEach((cargo) => {
            // console.log('CARGO: ', cargo)
            sales_cargo += cargo.type.classSnapshot?.rate ?? 0
          })
        }
      })
      sales.push(sum)
    })
    return {
      // tickets: tickets_date,
      sales,
      sales_total,
      sales_passenger_regular,
      sales_passenger_other,
      sales_cargo,
      number_passengers,
      number_vehicles,
      categories: map.dates(dates),
    }
  }

  const sales_weekly = (tickets: Ticket[], date1: Date, date2: Date) => {
    const { startDate, endDate } = date_utils.dates_start_end(date1, date2)
    const sales: number[] = []
    const dates = date_utils.between_weeks(startDate, endDate)

    dates.forEach((date) => {
      const tickets_week = filter.tickets_week(tickets, date)
      let sum = 0
      tickets_week.forEach((ticket: Ticket) => {
        sum += ticket.subtotal
      })
      sales.push(sum)
    })
    return {
      series: sales,
      categories: map.dates(dates),
    }
  }

  const sales_monthly = (tickets: Ticket[], date1: Date, date2: Date) => {
    const { startDate, endDate } = date_utils.dates_start_end(date1, date2)
    const sales: number[] = []
    const dates = date_utils.between_months(startDate, endDate)

    dates.forEach((date) => {
      const tickets_month = filter.tickets_month(tickets, date)
      let sum = 0
      tickets_month.forEach((ticket: Ticket) => {
        sum += ticket.subtotal
      })
      sales.push(sum)
    })
    return {
      series: sales,
      categories: map.dates(dates),
    }
  }

  const sales_yearly = (tickets: Ticket[], date1: Date, date2: Date) => {
    const { startDate, endDate } = date_utils.dates_start_end(date1, date2)
    const sales: number[] = []
    const dates = date_utils.between_years(startDate, endDate)

    dates.forEach((date) => {
      const tickets_year = filter.tickets_year(tickets, date)
      let sum = 0
      tickets_year.forEach((ticket: Ticket) => {
        sum += ticket.subtotal
      })
      sales.push(sum)
    })
    return {
      series: sales,
      categories: map.dates(dates),
    }
  }

  const sales_dynamic = (tickets: Ticket[], date1: Date, date2: Date) => {
    switch (date_utils.date_span(date1, date2)) {
      case 'hourly': return sales_hourly(tickets, date1, date2)
      case 'daily': return sales_daily(tickets, date1, date2)
      case 'weekly': return sales_weekly(tickets, date1, date2)
      case 'monthly': return sales_monthly(tickets, date1, date2)
      default: return sales_yearly(tickets, date1, date2) // 'yearly':
    }
  }

  // const capacity_date_range = (tickets: Ticket[], routes: Route[], route: Route, date1: Date, date2: Date) => {
  //   const trips = useCompound().trips_date_range(tickets, routes, route, date1, date2)
  //   const totalTripCapacity: TripCapacity = {
  //     cargo: {
  //       percent: 0,
  //       max: 0,
  //       current: 0,
  //     },
  //     passenger: {
  //       percent: 0,
  //       max: 0,
  //       current: 0,
  //     },
  //   }
  //   trips.forEach((trip) => {
  //     totalTripCapacity.cargo.percent += trip.capacity.cargo.percent
  //     totalTripCapacity.cargo.max += trip.capacity.cargo.max
  //     totalTripCapacity.cargo.current += trip.capacity.cargo.current
  //     totalTripCapacity.passenger.percent += trip.capacity.passenger.percent
  //     totalTripCapacity.passenger.max += trip.capacity.passenger.max
  //     totalTripCapacity.passenger.current += trip.capacity.passenger.current
  //   })
  //   return totalTripCapacity
  // }

  return {
    // capacity_date_range,

    sales_yearly,
    sales_monthly,
    sales_weekly,
    sales_daily,
    sales_hourly,

    sales_dynamic,

    sales_date_range,
    passengers_cargos_date_range,
  }
}
