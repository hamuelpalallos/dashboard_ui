import type { TicketSubStatus } from '~/types/models/passenger-types'
import type {BadgeProps} from '#ui/types'
export class TicketInstance implements Ticket {
  constructor(data: Ticket) {
    this.id = data.id
    this.company = data.company
    this.route = data.route
    this.passengers = data.passengers?.map(p => new PassengerInstance(p)) || []
    this.cargos = data.cargos?.map(c => new CargoInstance(c)) || []
    this.user = data.user
    this.conductor = data.conductor
    this.inspector = data.inspector
    this.withCargo = data.withCargo
    this.status = data.status
    this.subtotal = data.subtotal
    this.total = data.total
    this.payment = data.payment
    this.departure = data.departure
    this.arrival = data.arrival
    this.cancelledAt = data.cancelledAt
    this.paidAt = data.paidAt
    this.usedAt = data.usedAt
    this.inspectedAt = data.inspectedAt
    this.approvedAt = data.approvedAt
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.active = data.active
    this.index = data.index
    this.description = data.description
  }

  id: string
  company: Company
  route: Route
  passengers: PassengerInstanceType[]
  cargos: CargoInstanceType[]
  user: User
  conductor?: User
  inspector?: User
  withCargo: boolean
  status: TicketStatus
  subtotal: number
  total: number
  payment?: Payment
  departure: Date
  arrival?: Date
  cancelledAt?: Date
  paidAt?: Date
  usedAt?: Date
  inspectedAt?: Date
  approvedAt?: Date
  createdAt?: Date
  updatedAt?: Date
  active?: boolean
  index?: number
  description?: string

  toTableRow = (): TableRowTicket => {
    return TicketInstance.mapToTableRow(this as any)
  }

  static mapToTableRow = (ticket: Ticket, format: UseFormat = useFormat()): TableRowTicket => {
    return {
      id: format.str_empty(ticket.id),
      user: format.user(ticket.user),
      passengers: format.count(ticket.passengers),
      cargos: format.count(ticket.cargos),
      cargo: format.cargo_plate(ticket.cargos?.[0]),
      conductor: format.user(ticket.conductor),
      inspector: format.user(ticket.inspector),
      roundTrip: format.str_bool(ticket.roundTrip),
      withCargo: format.str_bool(ticket.withCargo),
      status: format.str_empty(ticket.status),
      subtotal: format.currency(ticket.subtotal),
      total: format.currency(ticket.total),
      payment: format.payment(ticket.payment),
      departure: format.datetime(ticket.departure),
      return: format.datetime(ticket.return),
      arrival: format.datetime(ticket.arrival),
      cancelledAt: format.datetime(ticket.cancelledAt),
      paidAt: format.datetime(ticket.paidAt),
      usedAt: format.datetime(ticket.usedAt),
      inspectedAt: format.datetime(ticket.inspectedAt),
      approvedAt: format.datetime(ticket.approvedAt),
      createdAt: format.datetime(ticket.createdAt),
      updatedAt: format.datetime(ticket.updatedAt),
      active: format.str_bool(ticket.active),
      index: format.index(ticket.index),
      description: format.description(ticket.description),

      type: format.ticket_type(ticket.type),
      // snapshots

      company: format.company(ticket.company),
      route: format.route(ticket.route),
      // for search purposes

      user_name: format.name(ticket.user?.name),
      user_email: format.email(ticket.user?.email),
      user_image: format.link(ticket.user?.image),
      user_initials: format.initials(ticket.user?.name, ticket?.user?.email?.charAt(0)),
      contact: format.ticket_contact(ticket.contact)
    }
  }

  static toTableRows = (tickets: Ticket[]): TableRowTicket[] => {
    const format = useFormat()

    return tickets?.map(ticket => TicketInstance.mapToTableRow(ticket, format)) ?? []
  }

  static toPrimitiveTableRows = (tickets: Ticket[]): any[] => {
    const format = useFormat()
    return tickets.map((ticket) => {
      return {
        company: format.company(ticket.company),
        id: format.str_empty(ticket.id),
        route: format.route(ticket.route),
        passengers: format.count(ticket.passengers),
        cargos: format.count(ticket.cargos),
        cargo: format.cargo(ticket.cargos?.[0]),
        user: format.user(ticket.user),
        conductor: format.user(ticket.conductor),
        inspector: format.user(ticket.inspector),
        withCargo: format.str_bool(ticket.withCargo),
        status: format.uppercase(ticket.status),
        subtotal: ticket.subtotal,
        total: ticket.total,
        payment: format.payment(ticket.payment),
        departure: format.datetime(ticket.departure),
        arrival: format.datetime(ticket.arrival),
        cancelledAt: format.datetime(ticket.cancelledAt),
        paidAt: format.datetime(ticket.paidAt),
        usedAt: format.datetime(ticket.usedAt),
        inspectedAt: format.datetime(ticket.inspectedAt),
        approvedAt: format.datetime(ticket.approvedAt),
        createdAt: format.datetime(ticket.createdAt),
        updatedAt: format.datetime(ticket.updatedAt),
        active: format.str_bool(ticket.active),
        index: format.index(ticket.index),
        description: format.description(ticket.description),

        // for search purposes
        user_name: format.name(ticket.user?.name),
        user_email: format.email(ticket.user?.email),
        user_image: format.link(ticket.user?.image),
        user_initials: format.initials(ticket.user?.name, ticket?.user?.email?.charAt(0))
      }
    })
  }

  static toInstances = (tickets: Ticket[]): TicketInstance[] => {
    return tickets.map(ticket => new TicketInstance(ticket))
  }

  static statusValue = (status: TicketStatus | TicketSubStatus): number => {
    // for sorting
    switch (status.toLowerCase()) {
      case 'planned':
      case 'unpaid':
        return 0
      case 'cancelled':
        return 1
      case 'refunded':
        return 2
      case 'boarded':
      case 'used':
        return 3
      case 'boarding':
      case 'inspected':
        return 4
      case 'booked':
      case 'paid':
        return 5
      default:
        return 0
    }
  }

  static statusColor = (status?: TicketStatus | TicketSubStatus):BadgeProps['color'] => {
    switch (status?.toLowerCase()) {
      case 'paid' :
      case 'booked' :
        return 'success'
      case 'inspected':
      case 'boarding':
        return 'info'
      case 'used':
      case 'boarded':
        return 'success'
      case 'cancelled':
        return 'error'
      case 'pending':
        return 'warning'
      case 'refunded':
        return 'warning'
      case 'unpaid':
      case 'planned':
        return 'neutral'
      default:
        return 'neutral'
    }
  }

  static getSales = (tickets: Ticket[], key: 'subtotal' | 'total' = 'subtotal'): number => {
    return tickets.reduce((acc, ticket) => acc + ticket?.[key], 0)
  }

  toJson(): Ticket {
    return JSON.parse(JSON.stringify(this))
  }

  toFirestore() {
    return this.toJson()
  }

  toSnapshot() {
    return this.toJson()
  }

  toPassengers(): Passenger[] {
    return TicketInstance.mapToPassenger(this)
  }

  static getSubStatus(status?: TicketStatus): TicketSubStatus {
    switch (status) {
      case 'unpaid': return 'planned'
      case 'paid': return 'booked'
      case 'inspected': return 'boarding'
      case 'used': return 'boarded'
      case 'cancelled': return 'cancelled'
      case 'refunded': return 'refunded'
      case 'pending': return 'pending'
      default: return status ?? 'planned'
    }
  }

  static mapToPassenger = (data: Ticket): Passenger[] => {
    const { cargos, company, passengers, ...restTicket } = data
    let cargoPassengers: Passenger[] = []
    let passengerCount: number = 1
    if (data.withCargo && cargos) {
      cargoPassengers = cargos.flatMap((c) => {
        const { passengers: cPassenger, ...restCargo } = c
        return (cPassenger?.map((cp) => {
          const pType = { ...cp.type }
          pType.free = true
          return {
            ...cp,
            type: pType,
            status: TicketInstance.getSubStatus(restTicket.status),
            cargoSnapshot: restCargo,
            createdAt: restTicket.createdAt,
            updatedAt: restTicket.updatedAt,
            index: passengerCount,
            ticketSnapshot: restTicket,
            id: `${restTicket.id}-P${passengerCount++}`
          }
        }) ?? []) || []
      })
    }

    let paidPassengers = passengers.filter(pp => !pp.ticket?.isFree)

    paidPassengers = paidPassengers.map((pp) => {
      return {
        ...pp,
        status: PassengerInstance.getStatus(restTicket.status),
        createdAt: restTicket.createdAt,
        updatedAt: restTicket.updatedAt,
        index: passengerCount,
        ticketSnapshot: restTicket,
        id: `${restTicket.id}-P${passengerCount++}`
      }
    }) || []
    return [...cargoPassengers, ...paidPassengers]
  }

  toCargos(): Cargo[] {
    return TicketInstance.getCargos(this)
  }

  static getCargos(data: Ticket | Ticket[]): Cargo[] {
    const array = Array.isArray(data) ? data : [data]
    return array.flatMap((i) => {
      return i.cargos?.map((c, idx) => {
        return {
          ...c,
          // remove passengers from ticket
          status: TicketInstance.getSubStatus(i.status),
          ticketSnapshot: { ...i, passengers: [] },
          id: `${i.id}-C${idx + 1}`
        }
      })
    }) || []
  }

  passengerCount(): number {
    return this.passengers.length
  }

  cargoCount(): number {
    return this.cargos.length
  }

  static passengerCount(tickets: Ticket[]): number {
    return tickets.reduce((acc, ticket) => acc + ticket.passengers.length, 0)
  }

  static cargoCount(tickets: Ticket[]): number {
    return tickets.reduce((acc, ticket) => acc + ticket.cargos.length, 0)
  }

  static toCargos(tickets: Ticket[]): Cargo[] {
    return TicketInstance.getCargos(tickets)
  }

  static toPassengers(tickets: Ticket[]): Passenger[] {
    return tickets.flatMap(ticket => TicketInstance.mapToPassenger(ticket)) || []
  }

  // convert ticket ticket to its passengers as a ticket
  static convert(ticket: Ticket): Ticket {
    return {
      ...ticket,
      passengers: TicketInstance.mapToPassenger(ticket),
      cargos: new TicketInstance(ticket).toCargos()
    }
  }

  toPassengerPDFRows(): string[][] {
    const passengers = this.toPassengers()
    return PassengerInstance.toPDFRows(passengers)
  }

  toCargoPDFRows(): string[][] {
    const cargos = this.toCargos()
    return CargoInstance.toPDFRows(cargos)
  }

  static toPDFRows(tickets: Ticket[]): string[][] {
    // const rows = tickets.map((ticket) => new TicketInstance(ticket).toTableRow())
    const format = useFormat()
    return tickets.map((row) => {
      return [
        format.route(row.route),
        format.datetime_short(row.departure),
        format.count(row.passengers),
        format.cargo(row.cargos?.[0]),
        format.number(row.subtotal),
        row.id
      ]
    })
  }

  static toPDFFeeRows(tickets: Ticket[]): string[][] {
    // const rows = tickets.map((ticket) => new TicketInstance(ticket).toTableRow())
    const format = useFormat()
    return tickets.map((row) => {
      return [
        format.route(row.route),
        format.datetime_short(row.departure),
        format.count(row.passengers),
        format.cargo(row.cargos?.[0]),
        format.number(row.subtotal),
        format.number(row.total - row.subtotal),
        row.id
      ]
    })
  }

  static PDFHeaders = [
    'Route',
    'Departure',
    'Passengers',
    'Cargo',
    'Subtotal',
    'Ticket ID'
  ] as const

  static PDFFeeHeaders = [
    'Route',
    'Departure',
    'No.Psngr.',
    'Cargo',
    'Subtotal',
    'Fee',
    'Ticket ID'
  ] as const

  static convertAll(tickets: Ticket[]): Ticket[] {
    return tickets.map(ticket => TicketInstance.convert(ticket))
  }

  toReference(): DocReference | undefined {
    return this.id ? useFirestoreReference().ticket(this.id) : undefined
  }

  stripUpdatedAt() {
    const { updatedAt, ...rest } = this
    return new TicketInstance(rest)
  }
}
