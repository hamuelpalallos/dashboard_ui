import { initializeApp } from 'firebase/app'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  Timestamp,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch
} from 'firebase/firestore'

export function useCompanyRepo(company_id: ComputedRef<string> | string, dev = false) {
  const log = useLogger()
  const companyId = isRef(company_id) ? company_id : ref(company_id)
  const reference = useFirestoreReference(dev)
  const company_reference = useCompanyReference(companyId.value, dev)
  const db = reference.db

  const utils = useUtils()

  const current_user = useCurrentUser()

  const generateDeleteData = () => {
    const currentUserId = current_user.value?.uid
    if (!currentUserId) return
    const deleteData: DeletedDataFirestore = {
      at: Timestamp.now(),
      byReference: reference.user(currentUserId)
    }
    return deleteData
  }

  const deleteRoute = async (dataId: string | string[]) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    const deleted = generateDeleteData()
    ids.forEach((id) => {
      const docRef = company_reference.route(id)
      batch.set(docRef, { id, deleted }, { merge: true })
    })
    await batch.commit()
  }

  const submitRoute = async (data: Route | Route[]) => {
    const dataArray = Array.isArray(data) ? data : [data]

    const batch = writeBatch(db)
    dataArray.forEach((item) => {
      log('🚀 ~ dataArray.forEach ~ item:', item)

      const firestoreData = new RouteInstance(item).toFirestore()

      log('🚀ROUTES: ~ dataArray.forEach ~ firestoreData:', firestoreData)
      const setRef = item.id ? company_reference.route(item.id) : doc(company_reference.routes())

      batch.set(setRef, { ...firestoreData }, { merge: true })
    })

    await batch.commit()
  }

  const toggleActiveRoute = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.route(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }

  const submitTripCancellation = async <T extends TripCancellation>(data: T | T[]) => {
    const dataArray = Array.isArray(data) ? data : [data]
    const batch = writeBatch(db)
    const notices: Notice[] = []

    dataArray.forEach((item) => {
      // const firestoreData = TripCancellationInstance.formToFirestore(item, companyId.value)
      const instance = new TripCancellationInstance(item)
      const firestoreData = instance.toFirestore()
      const setRef = item.id ? company_reference.trip_cancellation(item.id) : doc(company_reference.trip_cancellations())
      const id = item.id || setRef.id
      batch.set(setRef, { ...firestoreData }, { merge: true })

      // const notice = TripCancellationInstance.generateNoticeFromForm({ ...item, id }, companyId.value)
      const notice = instance.generateNotice(id)
      if (item.withNotice || item.id) {
        if (!item.id) {
          notice.createdAt = new Date()
        } else if (!item.withNotice) {
          notice.deleted = generateDeleteData() as any
        }
        notices.push(notice)
      }
    })

    await batch.commit()

    await submitNotice(notices)
  }

  const deleteTripCancellation = async (dataId: string | string[]) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    const deleted = generateDeleteData()
    ids.forEach((id) => {
      const docRef = company_reference.trip_cancellation(id)
      const noticeRef = company_reference.notice(id)
      batch.set(docRef, { id, deleted }, { merge: true })
      batch.set(noticeRef, { id, deleted }, { merge: true })
    })
    await batch.commit()
  }

  const toggleActivePort = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.port(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }
  const toggleActivePassengerType = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.passenger_type(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }
  const toggleActiveCargoType = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.cargo_type(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }
  const toggleActiveConveyance = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.conveyance(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }
  const toggleActiveCargoTypeFootprint = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.cargo_type_footprint(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }
  const toggleActiveCargoTypeClass = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.cargo_type_class(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }

  const toggleActiveCargoTypeCategory = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.cargo_type_category(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }

  const toggleActivePassengerTypeClass = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.passenger_type_class(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }
  const toggleActiveFirestore = async (collectionRef: ColRef, docIds: string[], active: boolean) => {
    const batch = writeBatch(db)
    docIds.forEach((id) => {
      const docRef = doc(collectionRef, id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }

  const toggleActiveTripCancellation = async (data: TripCancellation | TripCancellation[], active: boolean) => {
    const dataArray = Array.isArray(data) ? data : [data]
    const batch = writeBatch(db)
    dataArray.forEach((item) => {
      const id = item.id!
      const docRef = company_reference.trip_cancellation(id)
      batch.set(docRef, { id, active }, { merge: true })

      if (item.withNotice || !active) {
        const noticeRef = company_reference.notice(id)
        batch.set(noticeRef, { id, active }, { merge: true })
      }
    })
    await batch.commit()
  }

  const toggleActiveNotice = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.notice(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }

  const submitNotice = async (data: Notice | Notice[]) => {
    const batch = writeBatch(db)
    const dataArray = Array.isArray(data) ? data : [data]

    dataArray.forEach((notice) => {
      const firestoreData = new NoticeInstance(notice).toFirestore(companyId.value)

      const docRef = firestoreData.id ? company_reference.notice(firestoreData.id) : doc(company_reference.notices())
      batch.set(docRef, { ...firestoreData }, { merge: true })
    })

    await batch.commit()
  }

  const submitPort = async (data: Port | Port[]) => {
    const batch = writeBatch(db)
    const dataArray = Array.isArray(data) ? data : [data]
    dataArray.forEach((item) => {
      const setRef = item.id ? company_reference.port(item.id) : doc(company_reference.ports())
      batch.set(setRef, { ...(item as any) }, { merge: true })
    })
    await batch.commit()
  }

  const deleteCargoCategory = async (dataId: string | string[]) => {
    const batch = writeBatch(db)
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const deleted = generateDeleteData()
    ids.forEach((id) => {
      const docRef = company_reference.cargo_type_category(id)
      batch.set(docRef, { id, deleted }, { merge: true })
    })
    await batch.commit()
  }

  const deletePort = async (dataId: string | string[]) => {
    const batch = writeBatch(db)
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const deleted = generateDeleteData()
    ids.forEach((id) => {
      const docRef = company_reference.port(id)
      batch.set(docRef, { id, deleted }, { merge: true })
    })
    await batch.commit()
  }

  const deleteNotice = async (dataId: string | string[]) => {
    const batch = writeBatch(db)
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const deleted = generateDeleteData()
    ids.forEach((id) => {
      const docRef = company_reference.notice(id)
      batch.set(docRef, { id, deleted }, { merge: true })
    })
    await batch.commit()
  }

  const createPassengerType = async (
    companyId: string,
    passengerType: PassengerType
  ) => {
    try {
      const { id, data } = utils.separateObjectFromId(passengerType)
      if (id) {
        const setRef = company_reference.passenger_type(id)
        await setDoc(setRef, { ...data })
      } else {
        const addRef = company_reference.passenger_types()
        await addDoc(addRef, { ...data })
      }
      return true
    } catch (error) {
      log.e(error)
      return false
    }
  }

  const updateUserInBoth = async (user: User) => {
    await updateUser(user)
    await updateUserInCompany(user)
  }

  const updateUser = async (user: User, companyId?: string) => {
    const { id, data } = utils.separateObjectFromId(user)
    if (!id)
      return
    delete data.user
    const userRef = company_reference.user(id)

    await updateDoc(userRef, { ...data })
    if (companyId)
      await updateUserInCompany({ ...user })
  }

  const updateUserInCompany = async (userData: Partial<User>) => {
    const { id, data } = utils.separateObjectFromId(userData)
    const userRef = company_reference.user(id)
    const userCompanyData = data.companyData
    delete userCompanyData.id
    await updateDoc(userRef, { ...userCompanyData })
  }

  // const updateUserType = async (userId: string, type: UserRole, companyId?: string) => {
  //   if (!userId)
  //     return

  //   const userRef = company_reference.user(userId)

  //   await updateDoc(userRef, { role: type, types: arrayUnion(type) })
  //   if (companyId) {
  //     const userRefInCompany = company_reference.user(userId)
  //     await updateDoc(userRefInCompany, { role: type, types: arrayUnion(type) })
  //   }
  // }

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

  // const submitUserData = async (data: UserCompanyData) => {
  //   if (!data.id) return
  //   const userRef = company_reference.user(data.id)
  //   const companyRef = company_reference.company()

  //   const companyUserRef = company_reference.user(data.id)
  //   await setDoc(companyUserRef, { ...data }, { merge: true })
  // }

  const submitCompany = async (company: Company) => {
    if (!company.id) return
    const companyRef = company_reference.company()
    await updateDoc(companyRef, { ...(company as any) }, { merge: true })
  }

  const getUserData = async (userId?: string) => {
    if (!userId) return
    const userRef = company_reference.user(userId)
    return await getDoc(userRef)
  }

  const submitCargoType = async (data: CargoType | CargoType[]) => {
    const batch = writeBatch(db)
    const dataArray = Array.isArray(data) ? data : [data]
    dataArray.forEach((item) => {
      const firestoreData = new CargoTypeInstance(item).toFirestore()
      const setRef = item.id ? company_reference.cargo_type(item.id) : doc(company_reference.cargo_types())
      batch.set(setRef, { ...firestoreData }, { merge: true })
    })
    await batch.commit()
  }

  const submitCargoTypeCategory = async (data: CargoTypeCategory | CargoTypeCategory[]) => {
    const batch = writeBatch(db)
    const dataArray = Array.isArray(data) ? data : [data]
    dataArray.forEach((item) => {
      const firestoreData = item
      const setRef = item.id ? company_reference.cargo_type_category(item.id) : doc(company_reference.cargo_type_categories())
      batch.set(setRef, { ...firestoreData }, { merge: true })
    })
    await batch.commit()
  }

  const submitCargoTypeClass = async (data: CargoTypeClass | CargoTypeClass[]) => {
    const batch = writeBatch(db)
    const dataArray = Array.isArray(data) ? data : [data]
    dataArray.forEach((item) => {
      const firestoreData = item
      const setRef = item.id ? company_reference.cargo_type_class(item.id) : doc(company_reference.cargo_type_classes())
      batch.set(setRef, { ...firestoreData }, { merge: true })
    })
    await batch.commit()
  }

  const submitPassengerType = async (data: PassengerType | PassengerType[]) => {
    const batch = writeBatch(db)
    const dataArray = Array.isArray(data) ? data : [data]
    dataArray.forEach((item) => {
      const firestoreData = new PassengerTypeInstance(item).toFirestore()
      const setRef = item.id ? company_reference.passenger_type(item.id) : doc(company_reference.passenger_types())
      batch.set(setRef, { ...firestoreData }, { merge: true })
    })
    await batch.commit()
  }

  const submitCargoTypeFootprint = async (data: CargoTypeFootprint | CargoTypeFootprint[]) => {
    const batch = writeBatch(db)
    const dataArray = Array.isArray(data) ? data : [data]

    dataArray.forEach((item) => {
      const firestoreData = item
      const setRef = item.id ? company_reference.cargo_type_footprint(item.id) : doc(company_reference.cargo_type_footprints())
      batch.set(setRef, { ...firestoreData }, { merge: true })
    })
    await batch.commit()
  }

  const submitConveyance = async (data: Conveyance | Conveyance[]) => {
    const dataArray: Conveyance[] = Array.isArray(data) ? data : [data]
    const batch = writeBatch(db)
    dataArray.forEach((item) => {
      const firestoreData = item
      const setRef = item.id ? company_reference.conveyance(item.id) : doc(company_reference.conveyances())
      batch.set(setRef, { ...firestoreData }, { merge: true })
    })
    await batch.commit()
  }

  const submitPassengerTypeClass = async (data: PassengerTypeClass | PassengerTypeClass[]) => {
    const dataArray = Array.isArray(data) ? data : [data]
    const batch = writeBatch(db)
    dataArray.forEach((item) => {
      const firestoreData = item
      const setRef = item.id ? company_reference.passenger_type_class(item.id) : doc(company_reference.passenger_type_classes())
      batch.set(setRef, { ...firestoreData }, { merge: true })
    })
    await batch.commit()
  }

  const submitTrip = async (data: Trip | Trip[]) => {
    try {
      const dataArray = Array.isArray(data) ? data : [data]
      const batch = writeBatch(db)
      dataArray.forEach((item) => {
        const instance = new TripInstance(item)
        const firestoreData = instance.toFirestore()
        const setRef = company_reference.trip(item.id || instance.generateId())
        batch.set(setRef, { ...firestoreData }, { merge: true })
      })
      await batch.commit()
      return true
    } catch (error) {
      log('🚀 ~ submitTrip ~ error', error)
    }
  }

  const deleteTrip = async (dataId: string | string[]) => {
    const batch = writeBatch(db)
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const deleted = generateDeleteData()
    ids.forEach((id) => {
      const docRef = company_reference.trip(id)
      batch.set(docRef, { id, deleted }, { merge: true })
    })
    await batch.commit()
  }

  const toggleActiveTrip = async (dataId: string | string[], active: boolean) => {
    const ids = Array.isArray(dataId) ? dataId : [dataId]
    const batch = writeBatch(db)
    ids.forEach((id) => {
      const docRef = company_reference.trip(id)
      batch.set(docRef, { id, active }, { merge: true })
    })
    await batch.commit()
  }

  const toggleActiveRecord = {
    port: toggleActivePort,
    passengerType: toggleActivePassengerType,
    passengerTypeClass: toggleActivePassengerTypeClass,
    cargoType: toggleActiveCargoType,
    conveyance: toggleActiveConveyance,
    cargoTypeFootprint: toggleActiveCargoTypeFootprint,
    cargoTypeClass: toggleActiveCargoTypeClass,
    cargoTypeCategory: toggleActiveCargoTypeCategory,
    notice: toggleActiveNotice,
    route: toggleActiveRoute,
    trip: toggleActiveTrip,
    tripCancellation: toggleActiveTripCancellation
  }
  const deleteFirestore = async (colRef: ColRef, data: DatabaseRecord[]) => {
    const dataIds: string[] = data.reduce<string[]>((acc, obj) => {
      if (obj.id !== undefined) {
        acc.push(obj.id)
      }
      return acc
    }, [])
    const batch = writeBatch(db)
    const currentUser = await getCurrentUser()
    if (!currentUser) return

    const deleteData: DeletedDataFirestore = {
      at: Timestamp.now(),
      byReference: reference.user(currentUser.uid)
    }

    dataIds.forEach((id) => {
      const docRef = doc(colRef, id)
      batch.set(docRef, deleteData, { merge: true })
    })
    await batch.commit()
  }

  const deleteRecord = {
    passengerTypeClass: async (data: PassengerTypeClass[]) => {
      const colRef = reference.company_passenger_type_classes(companyId.value)
      await deleteFirestore(colRef, data)
    },
    passengerType: async (data: PassengerType[]) => {
      const colRef = reference.company_passenger_types(companyId.value)
      await deleteFirestore(colRef, data)
    }
  }

  return {
    db,
    deleteRecord,
    deleteFirestore,
    toggleActiveRecord,
    toggleActiveFirestore,
    submitTrip,
    toggleActiveTrip,
    deleteTrip,
    deleteNotice,
    toggleActivePort,
    toggleActivePassengerType,
    toggleActivePassengerTypeClass,
    toggleActiveCargoType,
    toggleActiveConveyance,
    toggleActiveCargoTypeFootprint,
    toggleActiveCargoTypeClass,
    toggleActiveCargoTypeCategory,
    toggleActiveNotice,
    toggleActiveRoute,

    submitConveyance,
    submitPassengerType,
    submitPassengerTypeClass,
    submitCargoTypeFootprint,
    submitCargoTypeClass,
    submitCargoType,
    submitCompany,
    submitCargoTypeCategory,
    submitRoute,
    toggleActiveTripCancellation,
    deletePort,
    getUserData,
    deleteCargoCategory,
    submitPort,
    updateUser,
    updateUserInCompany,
    updateUserInBoth,
    createPassengerType,

    createUserReferenceOnly,

    submitTripCancellation,
    deleteTripCancellation,
    deleteRoute,
    submitNotice
  }
}
