import { query, where, orderBy, or, and } from 'firebase/firestore'

export const useCompanyReference = (id: string, dev = false) => {
  const companyId = ref(id)

  const reference = useFirestoreReference(dev)

  const company = () => {
    return reference.company(companyId.value)
  }
  const ports_query = () => {
    return query(
      reference.company_ports(companyId.value),
      where('deleted', '==', null),
      orderBy('createdAt', 'desc')
    )
  }
  const ports = () => {
    return reference.company_ports(companyId.value)
  }
  const port = (portId: string) => {
    return reference.company_port(companyId.value, portId)
  }

  const route = (routeId: string) => {
    return reference.company_route(companyId.value, routeId)
  }

  const routes = () => {
    return reference.company_routes(companyId.value)
  }
  const routes_query = () => {
    return query(
      reference.company_routes(companyId.value),
      where('deleted', '==', null),
      orderBy('createdAt', 'desc')
    )
  }
  const tickets = () => {
    return reference.company_tickets(companyId.value)
  }
  const tickets_query = (range: DateRange) => {
    return query(
      reference.company_tickets(companyId.value),
      or(
        and(
          where('departure', '>=', range.start),
          where('departure', '<=', range.end)
        ),
        and(
          where('createdAt', '>=', range.start),
          where('createdAt', '<=', range.end)
        )
      )
    )
  }

  const users = () => {
    return reference.company_users(companyId.value)
  }

  const user = (userId: string) => {
    return reference.company_user(companyId.value, userId)
  }

  const passenger_types = () => {
    return reference.company_passenger_types(companyId.value)
  }
  const passenger_type = (typeId: string) => {
    return reference.company_passenger_type(companyId.value, typeId)
  }

  const conveyances = () => {
    return reference.company_conveyances(companyId.value)
  }
  const conveyance = (conveyanceId: string) => {
    return reference.company_conveyance(companyId.value, conveyanceId)
  }

  const trip_cancellations = () => {
    return reference.company_trip_cancellations(companyId.value)
  }
  const trip_cancellation = (tripCancellationId: string) => {
    return reference.company_trip_cancellation(companyId.value, tripCancellationId)
  }
  const trip_cancellations_query = () => {
    return query(
      reference.company_trip_cancellations(companyId.value),
      where('deleted', '==', null),
      orderBy('createdAt', 'desc')
    )
  }

  const notice = (noticeId: string) => {
    return reference.company_notice(companyId.value, noticeId)
  }

  const notices = () => {
    return reference.company_notices(companyId.value)
  }

  const notices_query = () => {
    return query(
      reference.company_notices(companyId.value),
      where('deleted', '==', null),
      orderBy('createdAt', 'desc')
    )
  }

  const cargo_type = (typeId: string) => {
    return reference.company_cargo_type(companyId.value, typeId)
  }

  const cargo_types = () => {
    return reference.company_cargo_types(companyId.value)
  }

  const cargo_type_categories = () => {
    return reference.company_cargo_type_categories(companyId.value)
  }
  const cargo_type_category = (categoryId: string) => {
    return reference.company_cargo_type_category(companyId.value, categoryId)
  }

  // cargo type footprints and class
  const cargo_type_footprints = () => {
    return reference.company_cargo_type_footprints(companyId.value)
  }
  const cargo_type_footprint = (footprintId: string) => {
    return reference.company_cargo_type_footprint(companyId.value, footprintId)
  }

  const cargo_type_classes = () => {
    return reference.company_cargo_type_classes(companyId.value)
  }
  const cargo_type_class = (classId: string) => {
    return reference.company_cargo_type_class(companyId.value, classId)
  }

  const passenger_type_classes = () => {
    return reference.company_passenger_type_classes(companyId.value)
  }
  const passenger_type_class = (classId: string) => {
    return reference.company_passenger_type_class(companyId.value, classId)
  }

  const trips = () => {
    return reference.company_trips(companyId.value)
  }

  const trip = (tripId: string) => {
    return reference.company_trip(companyId.value, tripId)
  }

  const trips_query = () => {
    return query(
      trips(),
      where('deleted', '==', null),
      orderBy('createdAt', 'desc')
    )
  }

  return {
    tickets_query,
    trips,
    trip,
    trips_query,
    passenger_type_classes,
    passenger_type_class,
    trip_cancellations_query,
    notice,
    notices,
    notices_query,
    ports_query,
    users,
    user,
    ports,
    port,

    cargo_type,
    cargo_types,
    cargo_type_category,
    cargo_type_categories,
    cargo_type_footprints,
    cargo_type_footprint,
    cargo_type_classes,
    cargo_type_class,

    passenger_types,
    passenger_type,
    conveyances,
    conveyance,
    trip_cancellations,
    trip_cancellation,

    tickets,

    company,
    routes,
    route,
    routes_query
  }
}
