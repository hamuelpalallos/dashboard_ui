export interface Passenger extends DatabaseRecord {
  name: UserName
  age: number
  sex: Sex
  birthdate?: DateTime
  nationality?: string
  address: Address
  ticket: PassengerTicket
  type: PassengerType

  status: PassengerStatus

  phone?: Phone

  companySnapshot?: PassengerCompanySnapshot
  ticketSnapshot?: PassengerTicketSnapshot
  cargoSnapshot?: PassengerCargoSnapshot
}

export type TicketSubStatus = typeof PASSENGER_STATUS[number]
export type PassengerStatus = TicketSubStatus
export type CargoStatus = TicketSubStatus
export type PassengerCompanySnapshot = Company
export type PassengerCargoSnapshot = Omit<Cargo, 'passengers'>
export type PassengerTicketSnapshot = Omit<Ticket, 'passengers' | 'company' | 'cargos'>

export interface PassengerType extends DatabaseRecord {
  name: string
  class?: PassengerTypeClass
  free?: boolean

  // newly added by @hamuelpalallos
  classSnapshot?: PassengerTypeClass
}

export interface PassengerTypeFirestore extends Omit<PassengerType, 'class'> {
  classReference?: DocRef
  classSnapshot?: PassengerTypeClass
}

export interface PassengerTypeClass extends DatabaseRecord {
  name?: string
  verify?: boolean
  ageRange?: NumberRange
  rate?: number
  fee?: Fee
}

export interface PassengerTicket extends DatabaseRecord {
  number: number
  isFree: boolean
  isUser?: boolean
  type?: string
  class?: string
  rate?: number
  fee?: number
  subtotal?: number
  total?: number
  onCargo?: boolean
}
