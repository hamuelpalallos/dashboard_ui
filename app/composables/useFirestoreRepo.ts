import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  writeBatch
} from 'firebase/firestore'

const _log = useLogger()

export function useFirestoreRepo(dev = false) {
  const utils = useUtils()
  const map = useMap()
  const reference = useFirestoreReference(dev)
  const db = reference.db
  // const { db } = useFirestoreReference()

  const converter = useFirestoreConverter()

  type CollectionName = 'routes' | 'ports' | 'users' | 'passenger-types' | 'cargo-types' | 'conveyances'
  const addFieldKey = async (companyId: string, collections: CollectionName[], key: string, defaultValue = null) => {
    const collectionNames: CollectionName[] = ['routes', 'ports', 'users', 'passenger-types', 'cargo-types', 'conveyances']
    collectionNames.forEach(async (collectionName) => {
      const batch = writeBatch(db)
      _log.d('ADDING FIELD KEY: ', collectionName)
      const collectionRef = collection(db, 'companies', companyId, collectionName)
      const collectionDocs = await getDocs(collectionRef)
      collectionDocs.forEach(async (doc) => {
        batch.set(doc.ref, { deleted: defaultValue }, { merge: true })
      })
      await batch.commit()
    })
    _log.d('ADDING FIELD KEY:  COMMITTING BATCH')
  }

  const createCompany = async (company: Company, userId?: string) => {
    try {
      const { id, data } = utils.separateObjectFromId(company)
      // _log.d('CREATING COMPANY ID: ', id)
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
      _log.d('Error creating company: ', error)
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
      // fee: category.fee,
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
      // _log.d('CREATING ROUTE ID: ', id)

      if (id) {
        // const setRef = doc(db, 'companies', companyId, 'routes', id)
        const setRef = reference.company_route(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        const addRef = reference.company_routes(companyId)
        await addDoc(addRef, { ...data })
      }

      return true
    } catch (error) {
      _log.d('Error creating routes: ', error)
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
  // const createCompanyTripCancellation = async (companyId: string, tripCancellation: TripCancellation) => {
  //   if (port.id) {
  //     const setRef = reference.company_trip_cancellations(companyId, tripCancellation.id)
  //     await setDoc(setRef, { ...(port as any) }, { merge: true })
  //     return
  //   }
  //   const addRef = reference.ports(companyId)
  //   await addDoc(addRef, { ...port })
  // }
  const createCompanyPortMultiple = async (companyId: string, ports: Port[]) => {
    const batch = writeBatch(db)

    ports.forEach((port) => {
      _log.d('PORT ID: ', port.id)
      if (port.id) {
        const setRef = reference.company_port(companyId, port.id)
        batch.set(setRef, { ...port })
      } else {
        // const newRef = doc(collection(db, companyId, 'ports'))
        // batch.set(newRef, { ...port })
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
      // _log.d('CREATING CARGO TYPE: ', cargoType)
      const { id, data } = utils.separateObjectFromId(cargoType)
      if (id) {
        // const setRef = doc(db, 'companies', companyId, 'cargo-types', id)
        const setRef = reference.company_cargo_type(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        // const addRef = collection(db, 'companies', companyId, 'cargo-types')
        const addRef = reference.company_cargo_types(companyId)
        await addDoc(addRef, { ...data })
      }
      return true
    } catch (error) {
      _log.d('Error creating cargo types: ', error)
      return false
    }
  }

  // create passenger type
  const createPassengerType = async (
    companyId: string,
    passengerType: PassengerType
  ) => {
    try {
      // _log.d('CREATING PASSENGER TYPE: ', passengerType)
      const { id, data } = utils.separateObjectFromId(passengerType)
      if (id) {
        // const setRef = doc(db, 'companies', companyId, 'passenger-types', id)
        const setRef = reference.company_passenger_type(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        // const addRef = collection(db, 'companies', companyId, 'passenger-types')
        const addRef = reference.company_passenger_types(companyId)
        await addDoc(addRef, { ...data })
      }
      return true
    } catch (error) {
      _log.d('Error creating passenger types: ', error)
      return false
    }
  }

  const createCargoCategory = async (
    companyId: string,
    cargoCategory: CargoTypeCategory
  ) => {
    try {
      // _log.d('CREATING CARGO CATEGORY: ', cargoCategory)
      const { id, data } = utils.separateObjectFromId(cargoCategory)
      if (id) {
        // const setRef = doc(db, 'companies', companyId, 'cargo-categories', id)
        const setRef = reference.company_cargo_type_category(companyId, id)
        await setDoc(setRef, { ...data })
      } else {
        // const addRef = collection(
        //   db,
        //   'companies',
        //   companyId,
        //   'cargo-categories',
        // )
        const addRef = reference.company_cargo_type_categories(companyId)
        await addDoc(addRef, { ...data })
      }
      return true
    } catch (error) {
      _log.d('Error creating cargo categories: ', error)
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
    // const reference = useReference()
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
    // const userRef = doc(db, 'users', userId)
    const userRef = reference.user(userId)
    // TODO: fix the user types
    await updateDoc(userRef, { role: type, types: arrayUnion(type) })
    if (companyId) {
      // const userRef = doc(db, 'companies', companyId, 'users', userId)
      const userRefInCompany = reference.company_user(companyId, userId)
      await updateDoc(userRefInCompany, { role: type, types: arrayUnion(type) })
    }
  }

  // const updateUserCompany = async (userId: string, userCompany: CompanyRef) => {
  //   // const userRef = doc(db, 'users', userId)
  //   const userRef = reference.user(userId)
  //   await updateDoc(userRef, { company: userCompany })
  //   if (userCompany.id) {
  //     // const userRef = doc(db, 'companies', userCompany.id, 'users', userId)
  //     const userRefInCompany = reference.company_user(userCompany.id, userId)
  //     await updateDoc(userRefInCompany, { company: userCompany })
  //   }
  // }

  const createUserReferenceOnly = async (
    email: string,
    password: string
  ) => {
    // get the firebase config
    const firebaseConfig2 = db.app.options
    // create a new firebase app
    const app2 = initializeApp(firebaseConfig2, 'app2')
    // create a new firestore instance
    const auth2 = getAuth(app2)

    const userResult = await createUserWithEmailAndPassword(auth2, email, password)
    await auth2.signOut()
    return userResult.user
  }

  const createCompanyUser = async (user: User) => {
    // _log.d('CREATING COMPANY USER: ', user)

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
    // const issuerRef = reference.user()
    delete user.companyData
    const userOnly: any = { ...user }
    delete userOnly.id
    await setDoc(userRef, {
      ...userOnly,
      companyReference: companyRef,
      issuedByReference: user
    }, { merge: true })
  }

  // const getCompanyUser = async (
  //   companyId: string,
  //   userId: string,
  // ): Promise<UserCompanyData> => {
  //   // const userRef = doc(db, 'companies', companyId, 'users', userId)
  //   const userRef = reference.company_user(companyId, userId)
  //   const userDoc = await getDoc(userRef)
  //   return useMap().userDataFromFirestore(userDoc)
  // }

  const updateCompanyInfo = async (companyId: string, companyData: Partial<Company>) => {
    // const companyRef = doc(db, 'companies', companyId)
    const companyRef = reference.company(companyId)
    await updateDoc(companyRef, { ...(companyData as any) }, { merge: true })
  }

  // const test = async () => {
  //   const docRef = doc(db, 'tests', '12345')
  //   return await getDoc(docRef)
  // }

  // const userData = (userId?: string) => {
  //   if (!userId)
  //     return
  //   // const userRef = doc(db, 'users', userId)
  //   const userRef = reference.user(userId)
  //   return useDocument<User>(userRef)
  // }

  // const userCompanyData = (companyId?: string, userId?: string) => {
  //   if (!companyId || !userId)
  //     return
  //   // const userRef = doc(db, 'companies', companyId, 'users', userId)
  //   const userRef = reference.company_user(companyId, userId)
  //   return useDocument<UserCompanyData>(userRef)
  // }

  const getUserData = async (userId?: string) => {
    if (!userId) return undefined
    const userRef = reference.user(userId)
    return await getDoc(userRef)
  }

  // const getCurrentUserData = async () => {
  //   const { uid: userId } = await getCurrentUser()
  //   if (!userId)
  //     return undefined
  //   return await getUserData(userId)
  // }

  const createUserFromImpl = async (
    userImpl: UserImpl
  ) => {
    const userRef = reference.user(userImpl.uid)
    const user = map.userImplToUserObject(userImpl)
    if (!user) return
    await setDoc(userRef, { ...user }, { merge: true })
  }

  const createUserFromForm = async (form: any) => {
    // _log.d('CREATING COMPANY USER: ', form)

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
    // delete companyUserData.id

    await setDoc(companyUserDocRef, {
      ...companyUserData
    }, { merge: true })

    const userOnly: any = { ...form }
    // delete userOnly.id
    delete userOnly.passwordConfirm
    delete userOnly.password
    delete userOnly.companyData
    delete userOnly.file
    await setDoc(userRef, {
      ...userOnly,
      image: imageUrl
      // updatedAt: Timestamp.now(),
      // createdAt: Timestamp.now(),
    }, { merge: true })
  }

  const createEmail = async (content: Email) => {
    const addRef = collection(db, 'emails')
    await addDoc(addRef, { ...content })
  }

  const deletePassengerTypeClass = async (companyId: string, categoryId: string) => {
    const docRef = reference.company_passenger_type_class(companyId, categoryId)
    await setDoc(docRef, { deleted: true }, { merge: true })
  }

  // const deleteFirestore = async (colRef: ColRef, data: DatabaseRecord[]) => {
  //   const dataIds: string[] = data.reduce<string[]>((acc, obj) => {
  //     if (obj.id !== undefined) {
  //       acc.push(obj.id)
  //     }
  //     return acc
  //   }, [])
  //   const batch = writeBatch(db)
  //   const currentUser = await getCurrentUser()
  //   if (!currentUser) return

  //   const deleteData: DeletedDataFirestore = {
  //     at: Timestamp.now(),
  //     byReference: reference.user(currentUser.uid)
  //   }

  //   dataIds.forEach((id) => {
  //     const docRef = doc(colRef, id)
  //     batch.set(docRef, deleteData, { merge: true })
  //   })
  //   await batch.commit()
  // }

  // const deleteRecord = {
  //   passengerTypeClass: async (companyId: string, data: PassengerTypeClass[]) => {
  //     const colRef = reference.company_passenger_type_classes(companyId)
  //     await deleteFirestore(colRef, data)
  //   },
  //   passengerType: async (companyId: string, data: PassengerType[]) => {
  //     const colRef = reference.company_passenger_types(companyId)
  //     await deleteFirestore(colRef, data)
  //   }
  // }

  return {
    // deleteFirestore,
    // deleteRecord,
    deletePassengerTypeClass,
    createEmail,
    db,
    // userData,
    // userCompanyData,

    updateCompanyInfo,
    // getCompanies,
    getUserData,
    addCompanyCargoCategory,
    deleteCargoCategory,
    addCompanyPort,
    deleteCompanyPort,
    // getCompany,
    createCompany,
    createCompanyPort,
    createRoute,
    createUserFromImpl,
    createCargoType,
    updateUser,
    updateUserInCompany,
    updateUserInBoth,
    // updateUserCompany,
    createPassengerType,
    createCargoCategory,
    createUserReferenceOnly,
    createCompanyUser,
    // getCompanyUser,
    createUser,
    createUserDataInCompany,
    updateUserType,
    // getCompanyUserData,
    // getCurrentUserData,
    // test,

    createUserFromForm,
    deleteCompanyPortMultiple,
    addFieldKey,
    // deleteTheDeletedRecords,
    createCompanyPortMultiple
    // createCompanyTripCancellation,
  }
}
