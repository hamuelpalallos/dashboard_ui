export type PartialCargo = Partial<Cargo>
export type PartialPassenger = Partial<Passenger>

export interface Ticket extends DatabaseRecord {
  id: string
  type?: string
  company: Company
  route: Route
  passengers: Passenger[]
  cargos: Cargo[]
  user: User
  conductor?: User
  inspector?: User

  // viseVersa?: boolean

  withCargo: boolean
  status: TicketStatus
  subtotal: number
  total: number
  payment?: Payment

  departure: DateTime
  return?: DateTime
  roundTrip?: boolean
  arrival?: DateTime
  cancelledAt?: DateTime
  paidAt?: DateTime
  usedAt?: DateTime
  inspectedAt?: DateTime
  approvedAt?: DateTime
  contact?: TicketContact
}
export interface TicketContact {
  name?: UserName
  phone?: Phone
  email: string
}

export interface TicketSnapshot extends Ticket {
  companySnapshot: Company
  routeSnapshot: Route
  userSnapshot: User
  conductorSnapshot?: User
  inspectorSnapshot?: User
}

export interface Payment extends DatabaseRecord {
  // TODO: add payment details
  id: string
  amount: number
  currency: string
  date: DateTime
  description: string
  method?: string
}

export type TicketStatus = typeof TICKET_STATUS[number]

export interface TicketSummary {
  summary: string
  startDate?: DateTime
  endDate?: DateTime
  data: TicketData[]
}

export interface TicketData {
  label?: string
  startDate: DateTime
  endDate: DateTime
  ticketCount: number
  passengerCount: number
  cargoCount: number
  subtotal: number
  total: number
}
