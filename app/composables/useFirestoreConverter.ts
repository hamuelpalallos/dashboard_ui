import { DocumentReference, Timestamp } from 'firebase/firestore'
import pluralize from 'pluralize'
import { firestoreDefaultConverter } from 'vuefire'

export const useFirestoreConverter = (dev = false) => {
  const utils = useUtils()

  const user = {
    fromFirestore: (snapshot: any, options: any) => {
      const reference = useFirestoreReference(dev)
      const userId = snapshot.id

      const defaultConvert: any = firestoreDefaultConverter.fromFirestore(snapshot, options)
      const data = mainConverterFromFirestore<User>(defaultConvert as User)
      if (data?.companyReference instanceof DocumentReference && userId) {
        data.companyData = reference.document_collection(data?.companyReference, 'users', userId).withConverter(company_user)
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
    fromFirestore: (snapshot: any, options: any) => {
      // const dept = snapshot.data(options)
      // console.log('MAIN CONVERTER FROM FIRESTORE (OPTIONS): ', snapshot?.data(options))
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
      const defaultData: any = firestoreDefaultConverter.fromFirestore(snapshot, options)
      const data = mainConverterFromFirestore(defaultData)

      const cargoPassengers: Passenger[] = data.cargos.flatMap((cargoItem: Cargo) => {
        if (cargoItem.passengers && cargoItem.passengers.length > 0) {
          return cargoItem.passengers.map((p: Passenger) => ({
            ...p,
            ticket: {
              ...p.ticket,
              isFree: true
            },
            birthdate: utils.convertToDate(p.birthdate),
            type: {
              ...p.type,
              isFree: true
            }
          }))
        }
        return []
      })

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
    return subConverterFromFirestore(obj)
  }

  // MAIN CONVERTERS TO ===>>
  const mainConverterToFirestore = <T extends { [key: string]: any }>(obj: T): T => {
    if (!obj)
      return {} as any
    const convertedData: any = subConverterToFirestore(obj)
    const hasId = !!convertedData.id
    delete convertedData.id
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
    const result: any = {}

    const processFieldValue = (key: string, fieldValue: any) => {
      if (fieldValue === null) {
        return undefined
      }
      if (typeof fieldValue === 'boolean' || typeof fieldValue === 'number' || typeof fieldValue === 'string') {
        return fieldValue
      }
      if (utils.isDateAttribute(key)) {
        return utils.convertToDate(fieldValue)
      }
      if (fieldValue instanceof DocumentReference && utils.isReferenceAttribute(key)) {
        // const shortKey = key.replace(/Reference$/, '')
        return fieldValue.withConverter(defaultConverter)
      }
      if (typeof fieldValue === 'object') {
        if (fieldValue instanceof DocumentReference) {
          return fieldValue.withConverter(defaultConverter)
        }
        if (Array.isArray(fieldValue)) {
          if (key.endsWith('References')) {
            // const baseKey = key.replace(/References$/, '')
            // const shortKey = pluralize(baseKey)
            return fieldValue.map(item => item.withConverter(defaultConverter)) ?? []
          } else {
            return fieldValue.map((item) => {
              if (item instanceof DocumentReference) {
                return item.withConverter(defaultConverter)
              } else if (typeof item === 'object') {
                return subConverterFromFirestore(item)
              } else {
                return item
              }
            })
          }
        }
        if (fieldValue instanceof Timestamp) {
          return fieldValue.toDate()
        }
        if (fieldValue instanceof Date) {
          return fieldValue
        }
        return subConverterFromFirestore(fieldValue)
      }
      return undefined
    }

    for (const key of Object.keys(obj)) {
      result[key] = processFieldValue(key, obj[key])
    }

    if (obj.id) result.id = obj.id
    if (obj.updatedAt) result.updatedAt = utils.convertToDate(obj.updatedAt)
    if (obj.createdAt) result.createdAt = utils.convertToDate(obj.createdAt)

    return result
  }
  return {
    defaultConverter,
    company_user,
    ticket,
    user
  }
}
