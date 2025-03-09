import { DocumentReference, Timestamp } from 'firebase/firestore'
import pluralize from 'pluralize'
import { firestoreDefaultConverter } from 'vuefire'

// const _log = useDebugLogger()
export function useConverter() {
  const utils = useUtils()

  // USER
  const user = {
    fromFirestore: (snapshot: any, options: any) => {
      const reference = useFirestoreReference()
      const userId = snapshot.id

      const defaultConvert: any = firestoreDefaultConverter.fromFirestore(snapshot, options)
      const data = mainConverterFromFirestore<User>(defaultConvert as User)
      if (data.company && data.company instanceof DocumentReference && userId) {
        data.companyData = reference.document_collection(data.company, 'users', userId).withConverter(company_user)
      }

      return data
    },

    toFirestore: (data: User) => {
      if (!data)
        return {}
      delete data.companyData
      const filteredData = mainConverterToFirestore(data)
      return firestoreDefaultConverter.toFirestore(filteredData as any)
    }
  }

  const company_user = {
    fromFirestore: (snapshot: any, options: any) => {
      const defaultConvert: any = firestoreDefaultConverter.fromFirestore(snapshot, options)
      return mainConverterFromFirestore<UserCompanyData>(defaultConvert)
    },
    toFirestore: (data: UserCompanyData) => {
      if (!data)
        return {}
      const filteredData = mainConverterToFirestore(data)
      return firestoreDefaultConverter.toFirestore(filteredData as any)
    }
  }

  const defaultConverter = {
    // TODO: add default defaultConverter on the reference fields
    fromFirestore: (snapshot: any, options: any) => {
      const default_data: any = firestoreDefaultConverter.fromFirestore(snapshot, options)
      return mainConverterFromFirestore(default_data)
    },
    toFirestore: (data: any) => {
      const filteredData = mainConverterToFirestore(data)
      return firestoreDefaultConverter.toFirestore(filteredData)
    }
  }

  const ticket = {
    fromFirestore: (snapshot: any, options: any) => {
      const default_data: any = firestoreDefaultConverter.fromFirestore(snapshot, options)
      const data = mainConverterFromFirestore(default_data)

      const cargoPassengers: Passenger[] = []
      if (data.cargos.length > 0) {
        data.cargos.forEach((cargoItem: Cargo) => {
          if (cargoItem.passengers && cargoItem.passengers?.length > 0) {
            const tempCargoPassengers = cargoItem.passengers.map(
              (passenger: Passenger) => {
                return {
                  ...passenger,
                  ticket: {
                    ...passenger.ticket,
                    isFree: true
                  },
                  birthdate: useUtils().convertToDate(passenger.birthdate),
                  type: {
                    ...passenger.type,
                    isFree: true
                  }
                }
              }
            )
            cargoPassengers.push(...tempCargoPassengers)
          }
        })
      }

      data.passengers = [...cargoPassengers, ...data.passengers]
      return data
    },
    toFirestore: (data: any) => {
      const filteredData = mainConverterToFirestore(data)
      return firestoreDefaultConverter.toFirestore(filteredData)
    }
  }

  // MAIN CONVERTERS FROM <<===
  const mainConverterFromFirestore = <T extends { [key: string]: any, updatedAt?: Date, createdAt?: Date }>(obj: T): T => {
    // if (!obj)
    //   return obj
    return subConverterFromFirestore(obj)
  }

  // MAIN CONVERTERS TO ===>>
  const mainConverterToFirestore = <T extends { [key: string]: any }>(obj: T): T => {
    if (!obj)
      return {} as any
    const convertedData: any = subConverterToFirestore(obj)
    const hasId = !!convertedData.id
    // const isCreate = !!obj.create
    delete convertedData.id
    // delete convertedData.create
    if (!convertedData.deleted) {
      convertedData.deleted = null
    }
    if (!hasId) {
      convertedData.createdAt = Timestamp.now()
    }
    convertedData.updatedAt = Timestamp.now()
    return convertedData
  }

  const subConverterToFirestore = <T extends { [key: string]: any }>(obj: T): T => {
    const result: any = {}
    if (obj === undefined) return result
    for (const key of Object.keys(obj)) {
      const fieldValue = obj[key]

      if (fieldValue === undefined) continue

      if (fieldValue && (typeof fieldValue !== 'boolean')) {
        if (utils.isDateAttribute(key)) {
          result[key] = utils.convertToTimestamp(fieldValue)
        } else if (fieldValue instanceof DocumentReference && utils.isReferenceAttribute(key)) {
          result[key] = fieldValue
        } else if (typeof fieldValue === 'object') {
          if (fieldValue instanceof DocumentReference) {
            const refKey1 = `${key}Reference`
            result[refKey1] = fieldValue
          } else if (!(fieldValue instanceof DocumentReference) && utils.isClassInstance(fieldValue, 'toFirestore')) {
            // add checks for any instances other types that are class instances

            // ========================================
            const firestoreData = fieldValue?.toFirestore()

            if (utils.isClassInstance(fieldValue, 'toReference')) {
              // SNAPSHOT
              const snapKey = `${key}Snapshot`
              result[snapKey] = typeof firestoreData === 'object' ? subConverterToFirestore(firestoreData) : firestoreData ?? null

              // REFERENCE
              const refKey = `${key}Reference`
              const refValue = fieldValue.toReference()
              result[refKey] = refValue ?? null
            } else {
              result[key] = typeof firestoreData === 'object' ? subConverterToFirestore(firestoreData) : firestoreData ?? null
            }
          } else if (Array.isArray(fieldValue)) {
            if (!key.endsWith('References') && fieldValue.length && fieldValue.every(item => item instanceof DocumentReference)) {
              const singularKey = pluralize.singular(key)
              const refKey = `${singularKey}References`
              result[refKey] = fieldValue
            } else if (fieldValue.length && fieldValue.every(item => item instanceof DocumentReference)) {
              result[key] = fieldValue
            } else if (fieldValue.length && fieldValue.every(item => typeof item === 'object')) {
              result[key] = fieldValue.map(item => subConverterToFirestore(item))
            } else {
              result[key] = fieldValue
            }
          } else if (fieldValue instanceof Timestamp) {
            result[key] = fieldValue
          } else if (fieldValue instanceof Date) {
            result[key] = Timestamp.fromDate(fieldValue)
          } else {
            result[key] = subConverterToFirestore(fieldValue)
          }
        } else {
          result[key] = fieldValue
        }
      } else if (typeof fieldValue === 'boolean' || typeof fieldValue === 'number' || typeof fieldValue === 'string') {
        result[key] = fieldValue
      } else {
        result[key] = null
      }
    }
    if (obj.id && obj.updatedAt) {
      result.updatedAt = Timestamp.now()
    }
    return result
  }

  // CUSTOM CONVERTERS FROM <<===
  const subConverterFromFirestore = <T extends { [key: string]: any }>(obj: T): T => {
    // FROM FIRESTORE
    const result: any = {}
    // const converter = useConverter()
    for (const key of Object.keys(obj)) {
      const fieldValue = obj[key]

      // if (fieldValue === undefined) continue
      // if (key.endsWith('Snapshot')) continue

      if (fieldValue === null) {
        result[key] = undefined
        continue
      }
      if (fieldValue && (typeof fieldValue !== 'boolean')) {
        if (utils.isDateAttribute(key)) {
          result[key] = utils.convertToDate(fieldValue)
        } else if (fieldValue instanceof DocumentReference && utils.isReferenceAttribute(key)) {
          const shortKey = key.replace(/Reference$/, '')
          result[shortKey] = fieldValue.withConverter(defaultConverter)
        } else if (typeof fieldValue === 'object') {
          if (fieldValue instanceof DocumentReference)
            result[key] = fieldValue.withConverter(defaultConverter)
          else if (Array.isArray(fieldValue))
            if (key.endsWith('References')) {
              const baseKey = key.replace(/References$/, '')
              const shortKey = pluralize(baseKey)
              result[shortKey] = fieldValue?.map(item => item.withConverter(defaultConverter)) ?? []
            } else {
              // result[key] = fieldValue
              // result[key] = fieldValue.map((item) => item instanceof DocumentReference ? item : subConverterFromFirestore(item))
              result[key] = fieldValue.map((item) => {
                if (item instanceof DocumentReference) {
                  return item.withConverter(defaultConverter)
                } else if (typeof item === 'object') {
                  return subConverterFromFirestore(item)
                } else {
                  return item
                }
              })
            }
          else if (fieldValue instanceof Timestamp)
            result[key] = fieldValue.toDate()
          else if (fieldValue instanceof Date)
            result[key] = fieldValue
          else
            result[key] = subConverterFromFirestore(fieldValue)
        } else {
          result[key] = fieldValue
        }
      } else if (typeof fieldValue === 'boolean' || typeof fieldValue === 'number' || typeof fieldValue === 'string') {
        result[key] = fieldValue
      } else {
        result[key] = undefined
      }
    }
    if (obj.id)
      result.id = obj.id
    if (obj.updatedAt)
      result.updatedAt = utils.convertToDate(obj.updatedAt)
    if (obj.createdAt)
      result.createdAt = utils.convertToDate(obj.createdAt)
    return result
  }

  return {
    defaultConverter,
    company_user,
    ticket,
    user
  }
}
