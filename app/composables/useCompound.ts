import { add, isPast, isSameDay } from 'date-fns'

export function useCompound() {
  const format = useFormat()
  const icon = useIcon()
  const filter = useFilter()
  const utils = useUtils()
  const date_utils = useDate()
  const sales = useSales()

  const routes = (routes?: Route[], companyUsers?: UserCompanyData[]) => {
    // assuming that the routes are already unique
    const routeCompounds: RouteCompound[] = []
    if (routes && companyUsers) {
      routes.forEach((route) => {
        // in one route there can be multiple conductors
        const conductors = companyUsers?.filter(companyUser => companyUser?.port?.id === route?.origin?.id)
        // get the portAdmin
        const portAdmin = companyUsers?.find(companyUser => companyUser?.role === 'port-admin' && companyUser?.port?.id === route?.origin?.id)
        const conductorAvatars: Avatar[] = []
        conductors.forEach((conductor) => {
          conductorAvatars.push({
            'data-nui-tooltip': format.name(conductor?.user?.name),
            'src': conductor?.user?.image,
            'text': format.initials(conductor?.user?.name),
            'icon': icon.conductor
          })
        })
        routeCompounds.push({
          portAdmin,
          route,
          conductors,
          conductorAvatars
        })
      })
    }
    return routeCompounds
  }

  const users = (users?: UserCompanyData[], tickets?: Ticket[]) => {
    const userCompounds: CompanyUserCompound[] = []
    const ticketsUsed = filter.tickets_used(tickets)

    if (users) {
      users.forEach((companyUser) => {
        if (companyUser?.role === 'port-conductor') {
          userCompounds.push({
            user: companyUser,
            scannedTickets: ticketsUsed.filter(ticket => ticket?.company?.id === companyUser?.user?.company?.id).length
          })
        }
      })
    }

    // fix?
    return userCompounds
  }

  const trips_route = (tickets: Ticket[], routes: Route[], route?: Route, date = new Date()): TripCompound[] => {
    if (!tickets || !routes || !route) {
      return []
    }

    const selectedDate = new Date(date)

    const routeTickets: Ticket[] = tickets.filter((item: Ticket) => {
      return (
        (item.route.id === route.id) && isSameDay(selectedDate, item.departure as Date)
      )
    })

    const selectedRoute: Route | undefined = routes?.find(
      (item: Route) => item.id === route.id
    )

    if (!selectedRoute) return []

    // filter the route data
    const filteredTrips: TripCompound[] = []

    // return selectedRoute.trips.map((item: any) => )
    for (let i = 0; i < selectedRoute.schedules.length; i++) {
      const scheduleItem = selectedRoute.schedules[i]!
      // get the number of passengers for the time of the day from the tickets for the route
      const formattedTime = utils.stringToTime(scheduleItem.time)

      // ? FILTER TICKETS BY TIME
      const routeTicketsByTime = routeTickets.filter((ticket: Ticket) => {
        const ticketTime = format.time(ticket.departure)

        return ticketTime === formattedTime
        // return ticketTime === formattedTime
      })

      let passCount = 0
      let cargoCount = 0
      // const listOfPassengers: any[] = []
      // const listOfCargos: any[] = []
      routeTicketsByTime.forEach((ticket: Ticket) => {
        ticket.passengers.map(
          (passenger: any, index: number) => {
            return {
              ...passenger,
              ticketId: `${ticket.id}-${index + 1}`
            }
          }
        )
        if (ticket.cargos) {
          // listOfCargos.push(...ticket.cargos)
        }
        // console.log('FROM PASSENGER: ', passengers)
        // listOfPassengers.push(...passengers)
        passCount += ticket?.passengers.length ?? 0
        cargoCount += ticket?.cargos.length ?? 0
      })

      // TODO: check the default value of the in the future
      const passMax = selectedRoute.capacity?.passenger ?? 1
      const cargoMax = selectedRoute.capacity?.cargo ?? 1
      // const passPercent = (passCount / passMax * 100).toFixed(2);
      // const cargoPercent = (cargoCount / cargoMax * 100).toFixed(2);
      const passPercent = Math.round((passCount / passMax) * 10000) / 100
      const cargoPercent = Math.round((cargoCount / cargoMax) * 10000) / 100

      // round up the carPercent value to .00 decimal places

      // let percentRoundUp = Math.round(cargoPercent * 100) / 100

      // const tripStatus
      //   = passPercent < 100 || cargoPercent < 100 ? 'scheduled' : 'completed'

      const dayOfWeek = utils.getDayOfWeek(selectedDate)
      const isNotAvailable = scheduleItem.excludedDays.includes(dayOfWeek)

      const tripAvailable
        = (passPercent < 100 || cargoPercent < 100) && !isNotAvailable

      // add data to the filteredTrips
      // ! ADDED DEFAULT DURATION AND ARRIVAL (2 HOURS)
      // const tripDeparture: Date = routeTicketsByTime[0]?.departure
      // const tripDeparture: Date = selectedDate

      const tripDeparture: Date = useDate().setTimeInDate(
        selectedDate,
        scheduleItem.time
      )

      const tripDuration: Duration = { hours: 1, minutes: 30 }
      const tripArrival: Date = add(tripDeparture, tripDuration)

      // console.log('TRIP DEPARTURE: ', tripDeparture)

      if (tripAvailable) {
        filteredTrips.push({
          available: tripAvailable,
          // company: routeTickets[0]?.company,
          company: routeTicketsByTime[0]?.company,
          // time: formattedTime,
          route: selectedRoute,
          departure: tripDeparture,
          // exception: scheduleItem.excludedDays,
          duration: tripDuration,
          arrival: tripArrival,
          // passengers: listOfPassengers,
          // cargos: listOfCargos,
          tickets: routeTicketsByTime,
          schedule: scheduleItem,
          capacity: {
            cargo: {
              percent: cargoPercent,
              max: cargoMax,
              current: cargoCount
            },
            passenger: {
              percent: passPercent,
              max: passMax,
              current: passCount
            }
          }
        })
      }
    }

    // ADD TRIPS STATUS
    // const tripStatuses: TripStatus[] = ['scheduled', 'completed']
    const tripDates: Date[] = filteredTrips.map(
      (trip: TripCompound) => trip.departure
    )
    const currentDateFromTrips = useDate().closestFutureDate(tripDates)

    filteredTrips.forEach((trip: TripCompound) => {
      if (trip.status)
        return
      if (currentDateFromTrips === trip.departure)
        trip.status = 'in-progress'
      else if (isPast(trip.departure))
        trip.status = 'completed'
      else
        trip.status = 'scheduled'
    })
    return filteredTrips
  }

  const sale_statistics = (tickets: Ticket[], selectedRoutes?: Route[], date1 = new Date(), date2 = new Date()): SalesStatistic[] => {
    if (!tickets) return []

    // const selectedDate = new Date(date)

    let validTickets: Ticket[] = filter.tickets_used(tickets)
    if (selectedRoutes) {
      validTickets = validTickets.filter((item) => {
        return selectedRoutes.some(r => r.id === item.route.id)
      })
    }

    const dates = date_utils.between_dates(date1, date2)
    const stats: SalesStatistic[] = []

    dates.forEach((date) => {
      const dateTickets = filter.tickets_date(validTickets, date)
      const total = sales.tickets(dateTickets)
      const passenger = sales.passenger(dateTickets)
      const cargo = sales.cargo(dateTickets)
      stats.push({ date, total, passenger, cargo, tickets: dateTickets })
    })

    return stats
  }
  const passenger_types = (tickets?: Ticket[], types?: PassengerType[]): PassengerTypeCompound[] => {
    if (!tickets || !types)
      return []

    const passengerTypeStats: { [key: string]: number } = {}

    tickets.forEach((ticket) => {
      ticket?.passengers?.forEach((passenger) => {
        const typeName = passenger?.type?.name
        if (typeName)
          passengerTypeStats[typeName] = (passengerTypeStats[typeName] || 0) + 1
      })
    })

    return types.map(type => ({
      type,
      count: passengerTypeStats[type.name ?? ''] || 0
    }))
  }

  const trips_date_range = (tickets: Ticket[], routes: Route[], route: Route, date1: Date, date2: Date): TripCompound[] => {
    const { startDate, endDate } = date_utils.dates_start_end(date1, date2)
    const dates = date_utils.between_dates(startDate, endDate)
    const trip_items: TripCompound[] = []
    dates.forEach((date) => {
      routes?.forEach((_) => {
        // const routeID = route.id || i.id!
        trip_items.push(...trips_route(tickets, routes, route, date))
      })
    })
    return trip_items
  }

  return {
    sale_statistics,
    trips_date_range,
    passenger_types,
    trips_route,
    users,
    routes
  }
}
