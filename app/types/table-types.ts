export type TableRow<T> = Omit<Required<Stringify<T>>, 'deleted'>

export type TableRowPassengerTypeClass = TableRow<PassengerTypeClass>

export type TableRowCargoTypeClass = TableRow<CargoTypeClass>

export type TableRowCargoTypeFootprint = TableRow<CargoTypeFootprint>

export type TableRowUserCompanyData = TableRow<UserCompanyData>

export type TableRowPort = TableRow<Port>

export type TableRowNotice = TableRow<Notice>

export type TableRowRoute = TableRow<Route>

// export type TableRowPassengerType = Omit<TableRow<PassengerType>, 'free'>
export type TableRowPassengerType = TableRow<PassengerType>

export interface TableRowCargo extends Omit<TableRow<Cargo>, 'ticketSnapshot'> {
  ticket: string
  departure: string
  route: string
  category: string
  // status: string
  rate: string
}
export type TableRowCargoType = TableRow<CargoType>

export type TableRowConveyance = TableRow<Conveyance>

export type TableRowTripCancellation = TableRow<TripCancellation>

export interface TableRowUser extends Omit<TableRow<User>, 'companyData' | 'companyDataReference' | 'companyReference' | 'issuedByReference' | 'admin'> {
  initials: string
}

export interface TableRowTicket extends TableRow<Ticket> {
  cargo: string
  user_name: string
  user_email: string
  user_initials: string
  user_image: string
}

export interface TableRowPassenger extends Omit<TableRow<Passenger>, 'active' | 'index' | 'cargoSnapshot' | 'companySnapshot' | 'ticketSnapshot'> {
  ticket: string
  route: string
  company: string
  cargo: string
  departure: string
  rate: string
}
