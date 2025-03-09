export function useMap() {
  const format = useFormat()
  // TODO: update the pre-defined values

  const passengersToTableRows = (
    passengers: Passenger[]
  ): PassengerManifest[] => {
    const temp: PassengerManifest[] = passengers?.map(
      (passenger: any): PassengerManifest => {
        return {
          // fullName: `${passenger?.name?.first} ${passenger?.name?.last}`,
          fullName: format.name(passenger?.name),
          age: `${passenger?.age ?? 'N/A'}`,
          sex: passenger?.sex ?? 'Male',
          nationality: passenger?.nationality ?? 'Philippines',
          address: passenger?.address?.text ?? 'N/A',
          ticketNo: passenger?.id ?? 'N/A'
        }
      }
    ) ?? []
    return temp
  }

  const cargosToTableRows = (
    cargos: Cargo[]
  ): CargoManifest[] => {
    const temp: CargoManifest[] = cargos.map(
      (cargo: any): CargoManifest => {
        return {
          plate: cargo?.plate ?? '',
          type: cargo?.type?.name ?? '',
          category: cargo?.type?.category?.name ?? '',
          description: cargo?.type?.description ?? '',
          id: cargo?.id ?? 'N/A'
        }
      }
    )
    return temp
  }

  const passengersToPDFRows = (
    passengers: PassengerManifest[]
  ): string[][] => {
    return passengers?.map((item: PassengerManifest, index: number) => {
      return [
        `${index + 1}`,
        // `${item?.fullName ?? 'N/A'}`,
        format.str_empty(item?.fullName),
        item?.age ?? `${Math.floor(Math.random() * (80 - 9 + 1) + 9)}`,
        item?.sex ?? 'Not specified',
        useUtils().removeEmojis(item?.nationality ?? 'Philippines'),
        item?.address ?? 'N/A',
        item?.ticketNo ?? 'N/A'
      ]
    })
  }
  const cargosToPDFRows = (
    cargos: CargoManifest[]
  ): string[][] => {
    return cargos.map((item: CargoManifest, index: number) => {
      return [
        `${index + 1}`,
        item?.plate ?? '',
        item?.type ?? '',
        item?.category ?? '',
        item?.description ?? ''
      ]
    })
  }

  const passengerListToPDFRows = (passengers: Passenger[]): string[][] => {
    const temp = passengersToTableRows(passengers)
    return passengersToPDFRows(temp)
  }
  const cargoListToPDFRows = (cargos: Cargo[]): string[][] => {
    const temp = cargosToTableRows(cargos)
    return cargosToPDFRows(temp)
  }

  const tableRowsFromTickets = (tickets: Ticket[]): TableRowTicket[] => {
    const temp: TableRowTicket[] = tickets.map(
      (ticket: Ticket): TableRowTicket => {
        return {
          id: ticket.id,
          company: format.company(ticket?.company),
          route: format.route(ticket?.route),
          passengers: format.integer(ticket.passengers.length),
          cargos: format.integer(ticket.cargos.length),
          // user: ticket.user,
          departure: format.datetime(ticket.departure as Date),
          arrival: format.datetime(ticket.arrival as Date),
          status: ticket.status,
          total: format.currency(ticket.total),
          subtotal: format.currency(ticket.subtotal),
          // dates
          cancelledAt: format.datetime(ticket.cancelledAt as Date),
          paidAt: format.datetime(ticket.paidAt as Date),
          inspectedAt: format.datetime(ticket.inspectedAt as Date),
          approvedAt: format.datetime(ticket.approvedAt as Date),
          usedAt: format.datetime(ticket.usedAt as Date),
          // database fields
          index: format.index(ticket.index),
          active: format.str_bool(ticket.active),
          description: format.description(ticket.description),
          updatedAt: format.datetime(ticket.updatedAt as Date),
          createdAt: format.datetime(ticket.createdAt as Date),
          // extras
          conductor: format.name(ticket?.conductor?.name),
          inspector: format.name(ticket?.conductor?.name),
          withCargo: format.str_bool(ticket.withCargo),
          payment: format.payment(ticket.payment),
          user: format.name(ticket?.user?.name),
          // for search purposes
          user_name: format.name(ticket?.user?.name),
          user_email: format.email(ticket?.user?.email),
          user_image: format.link(ticket?.user?.image),
          user_initials: format.initials(ticket?.user?.name, false, ticket?.user?.email?.charAt(0))
        }
      }
    )
    return temp
  }

  const usersToTableRows = (companyUsers: UserCompanyData[]): TableRowUser[] => {
    const rows: TableRowUser[] = companyUsers.map(
      (companyUser: UserCompanyData): TableRowUser => {
        return {
          id: format.str_empty(companyUser?.user?.id),
          name: format.name(companyUser?.user?.name),
          email: format.str_empty(companyUser?.user?.email),
          phone: format.phone(companyUser?.user?.phone),
          image: format.link(companyUser?.user?.image),
          age: format.age(companyUser?.user?.birthdate as Date),
          sex: format.capitalize(companyUser?.user?.sex),
          nationality: format.capitalize(companyUser?.user?.nationality),
          address: format.address(companyUser?.user?.address),
          birthdate: format.date(companyUser?.user?.birthdate as Date),
          company: format.company(companyUser?.user?.company),
          // types: format.types(companyUser?.user?.types),
          description: format.description(companyUser?.user?.bio),
          bio: format.description(companyUser?.user?.bio),
          issuedBy: format.name(companyUser?.authority?.issuedBy?.name),
          index: format.index(companyUser.index),
          active: format.str_bool(companyUser.active),
          updatedAt: format.datetime(companyUser.updatedAt as Date),
          createdAt: format.datetime(companyUser.createdAt as Date),
          initials: format.initials(companyUser?.user?.name)
        }
      }
    )
    return rows
  }

  // const conductorUsersToTableRows = (
  //   users: UserCompanyPortConductor[],
  // ): TableRowCompanyPortConductor[] => {
  //   const rows: TableRowCompanyPortConductor[] = users.map(
  //     (user: UserCompanyPortConductor): TableRowCompanyPortConductor => {
  //       return {
  //         id: format.str_empty(user?.id),
  //         name: format.name(user?.name),
  //         email: format.email(user?.email),
  //         phone: format.phone(user?.phone),
  //         image: format.link(user?.image, true),
  //         age: format.integer(user?.age),
  //         sex: format.capitalize(user?.sex),
  //         nationality: format.capitalize(user?.nationality),
  //         address: format.address(user?.address),
  //         birthdate: format.date(user?.birthdate),
  //         company: format.company(user?.company),
  //         types: format.types(user?.types),
  //         port: format.port(user?.port),
  //         status: format.conductor_status(user?.auth),
  //         startedAt: format.datetime(user?.startedAt),
  //         initials: format.initials(user?.name),
  //       }
  //     },
  //   )
  //   return rows
  // }

  const userFormToCompanyUser = (user: any): UserCompanyData => {
    // TODO: fix this converter (does not work properly)
    return {
      id: user?.id ?? '',
      user: {
        id: user?.id ?? '',
        name: {
          first: user?.name?.first ?? '',
          last: user?.name?.last ?? '',
          middle: user?.name?.middle ?? ''
        },
        email: user?.email ?? '',
        phone: {
          countryCode: '+63',
          countryISOCode: 'PH',
          number: user.phone?.number ?? ''
        },
        address: {
          text: user?.address?.text ?? ''
        },

        birthdate: user?.birthdate ?? undefined,
        sex: user.sex ?? undefined,
        nationality: user.nationality ?? 'Philippines'
      },
      active: user?.companyData?.active ?? false,
      startedAt: user?.companyData?.startedAt ?? new Date(),
      authority: {
        issuedByReference: user?.companyData?.authority?.issuedByReference ?? undefined,
        issuedAt: user?.companyData?.authority?.issuedAt ?? undefined,
        code: user?.companyData?.authority?.code ?? undefined,
        expiredAt: user?.companyData?.authority?.expiredAt ?? undefined,
        active: user?.companyData?.authority?.active ?? false
      },
      portReference: user?.companyData?.portReference ?? undefined,
      role: user?.companyData?.role ?? undefined
    }
  }

  const userDataFromFirestore = (
    userDoc: any
  ): UserCompanyData => {
    const userId = userDoc.id

    const data = userDoc.data()
    const user: any = {
      ...data,
      id: userId
    }
    return user
  }

  const tableRowsFromPorts = (ports?: Port[]): TableRow<Port>[] => {
    if (!ports)
      return []
    const temp: TableRow<Port>[] = ports.map(
      (port: Port): TableRow<Port> => {
        return {
          id: format.str_empty(port.id),
          name: format.str_empty(port.name),
          address: format.address(port.address),
          description: format.description(port.description),
          createdAt: format.datetime(port.createdAt),
          updatedAt: format.datetime(port.updatedAt),
          active: format.str_bool(port.active),
          fees: format.str_fee_items(port.fees),
          index: format.index(port.index)
        }
      }
    )
    return temp
  }

  // const tableRowsFromRoutes = (routes?: Route[]): TableRowRoute[] => {
  //   if (!routes)
  //     return []
  //   const temp: TableRowRoute[] = routes.map(
  //     (route: Route): TableRowRoute => {
  //       return {
  //         id: format.str_empty(route.id),
  //         origin: format.port(route.origin),
  //         destination: format.port(route.destination),
  //         active: format.str_bool(route.active),
  //         capacity: format.route_capacity(route.capacity),
  //         passengerTypes: format.count(route.passengerTypes),
  //         cargoTypes: format.count(route.cargoTypes),
  //         trips: format.count(route.trips),
  //       }
  //     },
  //   )
  //   return temp
  // }

  const optionsFromRoutes = (routes?: Route[]): OptionItem[] => {
    if (!routes)
      return []
    const temp = useFilter().active(routes)
    return temp.map((item: any) => {
      return {
        label: `${item.origin?.name} - ${item.destination?.name}`,
        value: item.id
      }
    })
  }

  const optionsFromPorts = (ports?: Port[]): OptionItem[] => {
    if (!ports)
      return []
    const temp = useFilter().active(ports)
    return temp.map((item: any) => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }

  // const tableRowsFromPassengerTypes = (passengerTypes?: PassengerType[]): TableRowPassengerType[] => {
  //   if (!passengerTypes)
  //     return []
  //   const temp: TableRowPassengerType[] = passengerTypes?.map(
  //     (type: PassengerType): TableRowPassengerType => {
  //       return {
  //         id: format.str_empty(type.id),
  //         name: format.str_empty(type.name),
  //         // ageRange: format.age_range(type.class?.ageRange),
  //         // fee: format.str_fee(type.fee),
  //         // fee: format.fee(type?.class),
  //         // rate: format.currency(type.class?.rate),
  //         class: format.passenger_type_class(type.class),
  //         active: format.str_bool(type.active),
  //         description: format.description(type.description),
  //         createdAt: format.datetime(type.createdAt),
  //         updatedAt: format.datetime(type.updatedAt),
  //         index: format.index(type.index),
  //       }
  //     },
  //   )
  //   return temp
  // }

  // const tableRowsFromCargoTypes = (cargoTypes?: CargoType[]): TableRow<CargoType>[] => {
  //   if (!cargoTypes)
  //     return []
  //   const temp: TableRow<CargoType>[] = cargoTypes?.map(
  //     (type: CargoType): TableRow<CargoType> => {
  //       return {
  //         id: format.str_empty(type.id),
  //         name: format.str_empty(type.name),
  //         class: format.cargo_type_class(type.class),
  //         category: format.cargo_type_category(type.category),
  //         footprint: format.cargo_type_footprint(type.footprint),

  //         active: format.str_bool(type.active),
  //         description: format.description(type.description),
  //         index: format.index(type.index),
  //         createdAt: format.datetime(type.createdAt),
  //         updatedAt: format.datetime(type.updatedAt),
  //       }
  //     },
  //   )

  //   return temp
  // }

  const tableRowsFromConveyances = (conveyances?: Conveyance[]): TableRow<Conveyance>[] => {
    if (!conveyances)
      return []
    const temp: TableRow<Conveyance>[] = conveyances?.map(
      (conveyance: Conveyance): TableRow<Conveyance> => {
        return {
          id: format.str_empty(conveyance.id),
          name: format.str_empty(conveyance.name),
          description: format.description(conveyance.description),
          type: format.capitalize(conveyance.type),
          active: format.str_bool(conveyance.active),
          index: format.index(conveyance.index),
          createdAt: format.datetime(conveyance.createdAt),
          updatedAt: format.datetime(conveyance.updatedAt)
        }
      }
    )
    return temp
  }

  const tableRowsFromTripCancellations = (cancellations?: TripCancellation[]): TableRow<TripCancellation>[] => {
    if (!cancellations)
      return []
    const temp: TableRow<TripCancellation>[] = cancellations?.map(
      (cancellation: TripCancellation): TableRow<TripCancellation> => {
        return {
          id: format.str_empty(cancellation.id),
          title: format.str_empty(cancellation.title),
          routes: format.count(cancellation.routes),
          dateSetting: format.date_setting(cancellation.dateSetting),
          description: format.str_empty(cancellation.description),
          withNotice: format.str_bool(cancellation.withNotice),
          status: format.capitalize(cancellation.status),
          type: format.capitalize(cancellation.type),
          index: format.index(cancellation.index),
          notice: format.str_bool(!!cancellation.notice),
          createdAt: format.datetime(cancellation.createdAt),
          updatedAt: format.datetime(cancellation.updatedAt),
          active: format.str_bool(cancellation.active)
        }
      }
    )
    return temp
  }

  const dates = (dates: Date[]): string[] => {
    return dates.map((date: Date) => {
      return format.date(date)
    })
  }

  const hours = (dates: Date[]): string[] => {
    return dates.map((date: Date) => {
      return format.time(date)
    })
  }

  const weeks = (dates: Date[]): string[] => {
    return dates.map((date: Date) => {
      return format.week(date)
    })
  }

  // const days = (dates: Date[]): string[] => {
  //   return dates.map((date: Date) => {
  //     return format.date(date)
  //   })
  // }

  const months = (dates: Date[]): string[] => {
    return dates.map((date: Date) => {
      return format.month(date)
    })
  }

  const years = (dates: Date[]): string[] => {
    return dates.map((date: Date) => {
      return format.year(date)
    })
  }

  const userImplToUserObject = (userImpl?: UserImpl): UserOrNull => {
    if (!userImpl)
      return
    const user: User = {
      id: userImpl.uid,
      name: {
        display: userImpl.displayName ?? undefined
      },
      // types: [],
      email: userImpl.email ?? undefined,
      phone: !userImpl.phoneNumber
        ? undefined
        : {
            text: userImpl.phoneNumber
          },
      image: userImpl.photoURL ?? undefined
    }
    return user
  }

  // const companyUsersToFirestore = (companyUser: UserCompanyData, companyId?: string) => {
  //   const reference = useReference()
  //   const utils = useUtils()
  //   const userId = companyUser.id

  //   // const x = Timestamp.now()

  //   let user = utils.removeObjectEmptyFields({

  //     name: companyUser.name,
  //     email: companyUser.email,
  //     image: companyUser.image,
  //     phone: companyUser.phone,
  //     bio: companyUser.bio,
  //     address: companyUser.address,
  //   })
  //   if (companyId) {
  //     user = utils.removeObjectEmptyFields({
  //       ...user,
  //       company: reference.company(companyId),
  //     })
  //   }

  //   let data: UserCompanyData = utils.removeObjectEmptyFields({
  //     role: companyUser.role,
  //     port: companyUser.port,
  //     authority: companyUser.authority,
  //     active: companyUser.active,
  //     startedAt: companyUser.startedAt,
  //     // endedAt: new Date(),
  //     // updatedAt: new Date(),
  //   })

  //   if (userId) {
  //     data['user'] = reference.user(userId)
  //   }

  //   return {
  //     id: userId,
  //     user,
  //     data,
  //   }
  // }

  // const userFromSnapshot = (snapshot: any): User[] => {
  //   if (!snapshot) return []
  //   const users: User[] = snapshot.docs.map((doc: any) => {
  //     const data = doc.data()
  //     const user: User = {
  //       id: doc.id,
  //       name: data?.name,
  //       email: data?.email,
  //       image: data?.image,
  //       phone: data?.phone,
  //       bio: data?.bio,
  //       address: data?.address,
  //       createdAt: data?.createdAt?.toDate(),
  //       updatedAt: data?.updatedAt?.toDate(),
  //     }
  //     return user
  //   })
  //   return users
  // }
  const userFormAuthorityToCompanyAuthority = (userFormAuthority?: CompanyAuthority) => {
    if (!userFormAuthority)
      return undefined
    const companyAuthority: CompanyAuthority = {
      issuedByReference: userFormAuthority?.issuedByReference ?? undefined,
      issuedAt: userFormAuthority?.issuedAt ?? undefined,
      code: userFormAuthority?.code ?? undefined,
      expiredAt: userFormAuthority?.expiredAt ?? undefined,
      active: userFormAuthority?.active ?? false
    }
    return companyAuthority
  }
  const userFormCompanyToCompanyData = (userFormCompany?: UserCompanyData) => {
    if (!userFormCompany)
      return undefined
    const companyData: UserCompanyData = {
      id: '', // TODO: add id or remove id
      role: userFormCompany?.role ?? undefined,
      portReference: userFormCompany?.portReference ?? undefined,
      authority: userFormAuthorityToCompanyAuthority(userFormCompany?.authority),
      active: userFormCompany?.active ?? undefined,
      startedAt: userFormCompany?.startedAt ?? undefined
    }
    return companyData
  }
  const userFormToUserObject = (userForm: User) => {
    const user: User = {
      id: userForm.id,
      name: userForm.name,
      email: userForm.email,
      phone: userForm?.phone ?? undefined,
      address: userForm?.address ?? undefined,
      birthdate: userForm?.birthdate ?? undefined,
      nationality: userForm?.nationality ?? undefined,
      sex: userForm?.sex ?? undefined,
      issuedByReference: userForm?.companyData?.authority?.issuedByReference ?? undefined,
      companyReference: userForm?.companyReference ?? undefined,
      companyData: userFormCompanyToCompanyData(userForm?.companyData)
    }
    return user
  }

  const reference_id = <T extends DatabaseRecord>(data?: T): ReferenceId => {
    return {
      id: data?.id ?? 'no-id'
    }
  }

  return {
    reference_id,
    userFormToUserObject,

    dates,
    // days,
    hours,
    weeks,
    months,
    years,

    userImplToUserObject,

    optionsFromPorts,
    optionsFromRoutes,
    passengersToTableRows,
    passengersToPDFRows,
    passengerListToPDFRows,
    usersToTableRows,
    userFormToCompanyUser,
    userDataFromFirestore,
    tableRowsFromTickets,
    tableRowsFromPorts,
    // tableRowsFromRoutes,
    // tableRowsFromPassengerTypes,
    // tableRowsFromCargoTypes,
    tableRowsFromConveyances,
    tableRowsFromTripCancellations,
    // companyUsersToFirestore,

    cargoListToPDFRows,
    cargosToTableRows
  }
}
