import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch
} from 'firebase/firestore'

export function useAdminRepo(user?: User, dev = false) {
  const log = useLogger()
  const utils = useUtils()
  const map = useMap()
  const reference = useFirestoreReference(dev)
  const db = reference.db
  const repo = useFirestoreRepo()

  const converter = useConverter()

  const approvePendingTicket = async (ticket: Ticket, number: string) => {
    const format = useFormat()
    log.i('approving: ticket: ', ticket.id, user?.id)
    if (!ticket.id || !user?.id) return
    const ticketRef = reference.ticket(ticket.id)
    await updateDoc(ticketRef, {
      status: 'booked',
      number: number,
      approvedAt: new Date(),
      approvedByReference: reference.user(user.id),
      approvedBySnapshot: new UserInstance(user).toFirestore(),
      approved: {
        at: new Date(),
        byReference: reference.user(user.id),
        bySnapshot: new UserInstance(user).toFirestore()
      }
    })

    const contactEmail = ticket.contact?.email
    const userEmail = ticket.user?.email
    const emails: string[] = []
    if (!contactEmail && !userEmail) {
      log.e('No email found for ticket: ', ticket.id)
      return
    }
    if (contactEmail) emails.push(contactEmail)
    if (userEmail && contactEmail !== userEmail) emails.push(userEmail)
    await repo.createEmail({
      to: emails,
      template: {
        name: 'ticket-confirmation',
        data: {
          status: 'BOOKED',
          route: format.ticket_route(ticket),
          id: format.str_empty(ticket.id),
          name: format.name(ticket.user.name),
          departure: format.departure(ticket.departure),
          departureReturn: format.departure_return(ticket.return),
          company: format.company(ticket.company),
          number: format.uppercase(number),
          image: format.image(ticket.company.image),
          total: format.currency(ticket.total)
        }
      }
    })
  }

  const createCompany = async (company: Company, userId?: string) => {
    try {
      const { id, data } = utils.separateObjectFromId(company)

      if (userId)
        data.author = reference.user(userId)
      if (id) {
        const setRef = reference.company(id)
        await setDoc(setRef, { ...data })
      } else {
        const addRef = reference.companies
        await addDoc(addRef, { ...company })
      }
      return true
    } catch (error) {
      log.d('Error creating company: ', error)
      return false
    }
  }

  const addCompanyPort = async (companyId: string, port: Port) => {
    if (port.id) {
      const setRef = reference.company_port(companyId, port.id)
      return await setDoc(setRef, { ...(port as any) }, { merge: true })
    }
    const addRef = reference.company_ports(companyId)
    return await addDoc(addRef, { ...(port as any) })
  }

  const addCompanyCargoCategory = async (
    companyId: string,
    category: CargoTypeCategory
  ) => {
    const categoryEssential: CargoTypeCategory = {
      name: category.name,
      description: category.description

    }
    if (category.id) {
      const updateRef = reference.company_cargo_type_category(companyId, category.id)
      return await updateDoc(updateRef, { ...categoryEssential })
    }
    const addRef = reference.company_cargo_type_categories(companyId)
    return await addDoc(addRef, { ...categoryEssential })
  }

  const deleteCargoCategory = async (companyId: string, categoryId: string) => {
    const docRef = reference.company_cargo_type_category(companyId, categoryId)
    await setDoc(docRef, { deleted: true }, { merge: true })
  }

  const createUser = async (user: User) => {
    const userId = user.id
    if (!userId) return
    const userRef = reference.user(userId)
    await setDoc(userRef, { ...user }, { merge: true })
    return userRef.id
  }

  const createUserDataInCompany = async (
    companyId: string,
    userId: string,
    userCompanyData: Partial<UserCompanyData>
  ) => {
    if (!companyId || !userId || !userCompanyData)
      return
    const userRef = reference.company_user(companyId, userId)
    await setDoc(userRef, { ...userCompanyData }, { merge: true })
  }

  const createRoute = async (companyId: string, route: Route) => {
    try {
      const { id, data } = utils.separateObjectFromId(route)

      if (id) {
        const setRef = reference.company_route(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        const addRef = reference.company_routes(companyId)
        await addDoc(addRef, { ...data })
      }

      return true
    } catch (error) {
      log.d('Error creating routes: ', error)
      return false
    }
  }

  const createCompanyPort = async (companyId: string, port: Port) => {
    if (port.id) {
      const setRef = reference.company_port(companyId, port.id)
      await setDoc(setRef, { ...(port as any) }, { merge: true })
      return
    }
    const addRef = reference.company_ports(companyId)
    await addDoc(addRef, { ...port })
  }

  const createCompanyPortMultiple = async (companyId: string, ports: Port[]) => {
    const batch = writeBatch(db)

    ports.forEach((port) => {
      log.d('PORT ID: ', port.id)
      if (port.id) {
        const setRef = reference.company_port(companyId, port.id)
        batch.set(setRef, { ...port })
      } else {
        const companyRef = doc(db, 'companies', companyId)
        const newRef = doc(collection(companyRef, 'ports')).withConverter(converter.defaultConverter)
        batch.set(newRef, { ...port })
      }
    })
    await batch.commit()
  }

  const deleteCompanyPort = async (companyId: string, portId: string) => {
    const docRef = doc(db, 'companies', companyId, 'ports', portId)
    await setDoc(docRef, { deleted: true }, { merge: true })
    return true
  }

  const deleteCompanyPortMultiple = async (companyId: string, portIds: string[]) => {
    const batch = writeBatch(db)
    const currentUser = await getCurrentUser()
    if (!currentUser) return

    const deleteData: DeletedDataFirestore = {
      at: Timestamp.now(),
      byReference: reference.user(currentUser.uid)
    }

    portIds.forEach((portId) => {
      const docRef = reference.company_port(companyId, portId)
      batch.set(docRef, deleteData, { merge: true })
    })
    await batch.commit()
  }

  const createCargoType = async (companyId: string, cargoType: CargoType) => {
    try {
      const { id, data } = utils.separateObjectFromId(cargoType)
      if (id) {
        const setRef = reference.company_cargo_type(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        const addRef = reference.company_cargo_types(companyId)
        await addDoc(addRef, { ...data })
      }
      return true
    } catch (error) {
      log.d('Error creating cargo types: ', error)
      return false
    }
  }

  const createPassengerType = async (
    companyId: string,
    passengerType: PassengerType
  ) => {
    try {
      const { id, data } = utils.separateObjectFromId(passengerType)
      if (id) {
        const setRef = reference.company_passenger_type(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        const addRef = reference.company_passenger_types(companyId)
        await addDoc(addRef, { ...data })
      }
      return true
    } catch (error) {
      log.d('Error creating passenger types: ', error)
      return false
    }
  }

  const createCargoCategory = async (
    companyId: string,
    cargoCategory: CargoTypeCategory
  ) => {
    try {
      const { id, data } = utils.separateObjectFromId(cargoCategory)
      if (id) {
        const setRef = reference.company_cargo_type_category(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        const addRef = reference.company_cargo_type_categories(companyId)
        await addDoc(addRef, { ...data })
      }
      return true
    } catch (error) {
      log.d('Error creating cargo categories: ', error)
      return false
    }
  }

  const updateUserInBoth = async (companyId: string, user: User) => {
    await updateUser(user)
    await updateUserInCompany(companyId, user)
  }

  const updateUser = async (user: User, companyId?: string) => {
    const { id, data } = utils.separateObjectFromId(user)
    if (!id)
      return
    delete data.user
    const userRef = reference.user(id)

    await updateDoc(userRef, { ...data })
    if (companyId)
      await updateUserInCompany(companyId, { ...user })
  }

  const updateUserInCompany = async (companyId: string, userData: Partial<User>) => {
    const { id, data } = utils.separateObjectFromId(userData)
    const userRef = reference.company_user(companyId, id)
    const userCompanyData = data.companyData
    delete userCompanyData.id
    await updateDoc(userRef, { ...userCompanyData })
  }

  const updateUserType = async (userId: string, type: UserRole, companyId?: string) => {
    if (!userId)
      return

    const userRef = reference.user(userId)

    await updateDoc(userRef, { role: type, types: arrayUnion(type) })
    if (companyId) {
      const userRefInCompany = reference.company_user(companyId, userId)
      await updateDoc(userRefInCompany, { role: type, types: arrayUnion(type) })
    }
  }

  const createUserReferenceOnly = async (
    email: string,
    password: string
  ) => {
    const firebaseConfig2 = db.app.options

    const app2 = initializeApp(firebaseConfig2, 'app2')

    const auth2 = getAuth(app2)

    const userResult = await createUserWithEmailAndPassword(auth2, email, password)
    await auth2.signOut()
    return userResult.user
  }

  const createCompanyUser = async (user: User) => {
    const userId = user?.id
    const companyId = user?.company?.id

    if (!userId || !companyId)
      return

    const userRef = reference.user(userId)
    const companyRef = reference.company(companyId)

    const companyUserRef = reference.company_user(companyId, userId)
    await setDoc(companyUserRef, {
      ...user.companyData,
      userReference: userRef,
      id: userId
    })

    delete user.companyData
    const userOnly: any = { ...user }
    delete userOnly.id
    await setDoc(userRef, {
      ...userOnly,
      companyReference: companyRef,
      issuedByReference: user
    }, { merge: true })
  }

  const updateCompanyInfo = async (companyId: string, companyData: Partial<Company>) => {
    const companyRef = reference.company(companyId)
    await updateDoc(companyRef, { ...(companyData as any) }, { merge: true })
  }

  const getUserData = async (userId?: string) => {
    if (!userId) return undefined
    const userRef = reference.user(userId)
    return await getDoc(userRef)
  }

  const createUserFromImpl = async (
    userImpl: UserImpl
  ) => {
    const userRef = reference.user(userImpl.uid)
    const user = map.userImplToUserObject(userImpl)
    if (!user) return
    await setDoc(userRef, { ...user }, { merge: true })
  }

  const createUserFromForm = async (form: any) => {
    const userId = form.id!

    if (!form.companyReference && !form?.companyData?.userReference)
      return

    const userRef = reference.user(userId!)

    const companyRef = form.companyReference!

    let imageUrl = null
    if (form?.file)
      imageUrl = await useStorageRepo().uploadUserImage(userId, form?.file)

    const companyUserDocRef = reference.company_user(companyRef.id, userId)
    const companyUserData: any = { ...form.companyData }

    await setDoc(companyUserDocRef, {
      ...companyUserData
    }, { merge: true })

    const userOnly: any = { ...form }

    delete userOnly.passwordConfirm
    delete userOnly.password
    delete userOnly.companyData
    delete userOnly.file
    await setDoc(userRef, {
      ...userOnly,
      image: imageUrl

    }, { merge: true })
  }

  return {
    approvePendingTicket,

    updateCompanyInfo,

    getUserData,
    addCompanyCargoCategory,
    deleteCargoCategory,
    addCompanyPort,
    deleteCompanyPort,

    createCompany,
    createCompanyPort,
    createRoute,
    createUserFromImpl,
    createCargoType,
    updateUser,
    updateUserInCompany,
    updateUserInBoth,

    createPassengerType,
    createCargoCategory,
    createUserReferenceOnly,
    createCompanyUser,

    createUser,
    createUserDataInCompany,
    updateUserType,

    createUserFromForm,
    deleteCompanyPortMultiple,

    createCompanyPortMultiple

  }
}
