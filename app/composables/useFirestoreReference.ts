import { collection, doc, or, and, orderBy, query, where, getFirestore } from 'firebase/firestore'

export const useFirestoreReference = (dev = false) => {
  const defaultDb = useFirestore()
  const devDb = getFirestore(defaultDb.app, 'development')

  const db = dev ? devDb : defaultDb

  const converter = useFirestoreConverter()
  const companies = collection(db, 'companies').withConverter(converter.defaultConverter)
  const users = collection(db, 'users').withConverter(converter.user)
  const tickets = collection(db, 'tickets').withConverter(converter.ticket)

  const ticket = (ticketId: string) => doc(db, 'tickets', ticketId).withConverter(converter.ticket)

  const tickets_query = (range: DateRange) => {
    return query(
      tickets,
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

  const user_raw = (id: string) => doc(db, 'users', id)
  const user = (id: string) => doc(db, 'users', id).withConverter(converter.user)

  const company = (companyId: string) => doc(db, 'companies', companyId).withConverter(converter.defaultConverter)

  const company_ports = (companyId: string) => collection(db, 'companies', companyId, 'ports').withConverter(converter.defaultConverter)
  const company_port = (companyId: string, portId: string) => doc(db, 'companies', companyId, 'ports', portId).withConverter(converter.defaultConverter)

  const company_trip_cancellations = (companyId: string) => collection(db, 'companies', companyId, 'trip-cancellations').withConverter(converter.defaultConverter)
  const trip_cancellation = (companyId: string, tripCancellationId: string) => doc(db, 'companies', companyId, 'trip-cancellation', tripCancellationId).withConverter(converter.defaultConverter)

  const company_routes = (companyId: string) => collection(db, 'companies', companyId, 'routes').withConverter(converter.defaultConverter)
  const company_route = (companyId: string, routeId: string) => doc(db, 'companies', companyId, 'routes', routeId).withConverter(converter.defaultConverter)

  const company_trips = (companyId: string) => collection(db, 'companies', companyId, 'trips').withConverter(converter.defaultConverter)
  const company_trip = (companyId: string, tripId: string) => doc(db, 'companies', companyId, 'trips', tripId).withConverter(converter.defaultConverter)

  const company_voyages = (companyId: string) => collection(db, 'companies', companyId, 'voyages').withConverter(converter.defaultConverter)
  const company_voyage = (companyId: string, voyageId: string) => doc(db, 'companies', companyId, 'voyages', voyageId).withConverter(converter.defaultConverter)

  const port_routes = (companyId: string, portId: string) => {
    const portRef = company_port(companyId, portId)

    return query(company_routes(companyId), or(where('originReference', '==', portRef), where('origin.id', '==', portId))).withConverter(converter.defaultConverter)
  }

  const company_users = (companyId: string) => query(collection(db, 'companies', companyId, 'users'), where('type', '!=', 'dev')).withConverter(converter.company_user)
  const company_user = (companyId: string, userId: string) => doc(db, 'companies', companyId, 'users', userId).withConverter(converter.company_user)
  const port_users = (companyId: string, portId: string) => {
    const portRef = company_port(companyId, portId)
    return query(company_users(companyId), where('portReference', '==', portRef)).withConverter(converter.company_user)
  }

  const company_cargo_types = (companyId: string) => collection(db, 'companies', companyId, 'cargo-types').withConverter(converter.defaultConverter)
  const company_cargo_type = (companyId: string, typeId: string) => doc(db, 'companies', companyId, 'cargo-types', typeId).withConverter(converter.defaultConverter)

  const company_passenger_types = (companyId: string) => collection(db, 'companies', companyId, 'passenger-types').withConverter(converter.defaultConverter)
  const company_passenger_type = (companyId: string, typeId: string) => doc(db, 'companies', companyId, 'passenger-types', typeId).withConverter(converter.defaultConverter)

  const company_conveyances = (companyId: string) => collection(db, 'companies', companyId, 'conveyances').withConverter(converter.defaultConverter)
  const company_conveyance = (companyId: string, conveyanceId: string) => doc(db, 'companies', companyId, 'conveyances', conveyanceId).withConverter(converter.defaultConverter)

  const company_cargo_type_footprints = (companyId: string) => collection(db, 'companies', companyId, 'cargo-type-footprints').withConverter(converter.defaultConverter)
  const company_cargo_type_footprint = (companyId: string, footprintId: string) => doc(db, 'companies', companyId, 'cargo-type-footprints', footprintId).withConverter(converter.defaultConverter)

  const company_cargo_type_classes = (companyId: string) => collection(db, 'companies', companyId, 'cargo-type-classes').withConverter(converter.defaultConverter)
  const company_cargo_type_class = (companyId: string, classId: string) => doc(db, 'companies', companyId, 'cargo-type-classes', classId).withConverter(converter.defaultConverter)

  const company_cargo_type_categories = (companyId: string) => collection(db, 'companies', companyId, 'cargo-type-categories').withConverter(converter.defaultConverter)
  const company_cargo_type_category = (companyId: string, categoryId: string) => doc(db, 'companies', companyId, 'cargo-type-categories', categoryId).withConverter(converter.defaultConverter)

  const company_trip_cancellation = (companyId: string, tripCancellationId: string) => doc(db, 'companies', companyId, 'trip-cancellations', tripCancellationId).withConverter(converter.defaultConverter)

  const company_tickets = (companyId: string, startDate?: Date) => {
    const companyRef = company(companyId)
    const fromDate = startDate ?? new Date(2024, 7, 19)
    return query(tickets, where('companyReference', '==', companyRef), where('environment', '==', 'production'), where('departure', '>=', fromDate), orderBy('departure', 'desc')).withConverter(converter.ticket)
  }

  const company_port_tickets = (companyId: string, portId: string) => query(tickets, where('company.id', '==', companyId), where('route.origin.id', '==', portId), where('payment', '!=', null)).withConverter(converter.ticket)

  const company_notices = (companyId: string) => collection(db, 'companies', companyId, 'notices').withConverter(converter.defaultConverter)
  const company_notice = (companyId: string, noticeId: string) => doc(db, 'companies', companyId, 'notices', noticeId).withConverter(converter.defaultConverter)

  const document_collection = (docRef: DocRef, collection: string, docId: string) => {
    return doc(docRef, collection, docId).withConverter(converter.defaultConverter)
  }

  const company_passenger_type_classes = (companyId: string) => collection(db, 'companies', companyId, 'passenger-type-classes').withConverter(converter.defaultConverter)
  const company_passenger_type_class = (companyId: string, classId: string) => doc(db, 'companies', companyId, 'passenger-type-classes', classId).withConverter(converter.defaultConverter)

  return {
    db,
    tickets_query,

    company_voyages,
    company_voyage,

    company_trips,
    company_trip,

    company_passenger_type_classes,
    company_passenger_type_class,
    company_notices,
    company_notice,
    collection,
    company_ports,
    company_cargo_type,
    company_passenger_type,

    document_collection,

    users,
    user,
    user_raw,
    companies,
    tickets,
    ticket,
    company,
    company_trip_cancellation,
    company_routes,
    company_route,
    port_routes,

    company_users,
    company_user,
    port_users,

    company_cargo_types,

    company_passenger_types,
    company_conveyances,
    company_tickets,
    port_tickets: company_port_tickets,
    company_trip_cancellations,
    trip_cancellation,
    company_port,
    company_conveyance,

    company_cargo_type_categories,
    company_cargo_type_category,

    company_cargo_type_footprints,
    company_cargo_type_footprint,

    company_cargo_type_classes,
    company_cargo_type_class

  }
}
