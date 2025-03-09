import { DocumentReference, Timestamp } from 'firebase/firestore'
import pluralize from 'pluralize'

const _log = useLogger()
export function useUtils() {
  const truncate = (str: string, maxLength: number): string => {
    if (str.length > maxLength)
      return `${str.substring(0, maxLength)}...`

    return str
  }

  const removeEmojis = (str: string): string => {
    return str.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}\u{2700}-\u{27BF}|\u{1F1E6}-\u{1F1FF}]/gu, '').trim()
  }

  const separateObjectFromId = (object: any) => {
    const id = object.id
    const data = deepCopy(object)
    delete data.id
    return {
      id,
      data
    }
  }

  const assignObjectByKey = (obj1: any, obj2: any) => {
    const result: any = {}
    for (const key of Object.keys(obj1)) {
      if (Object.prototype.hasOwnProperty.call(obj2, key)) {
        if (
          typeof obj1[key] === 'object'
          && typeof obj2[key] === 'object'
          && obj1[key] !== null
          && obj2[key] !== null
        )
          result[key] = assignObjectByKey(obj1[key], obj2[key])
        else
          result[key] = obj2[key]
      } else {
        result[key] = obj1[key]
      }
    }
    return result
  }

  const objectCopyWith = (obj1: any, obj2: any) => {
    const result: any = { ...obj1 }
    for (const key of Object.keys(obj2)) {
      if (obj2[key] !== undefined && obj2[key] !== null) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object')
          result[key] = assignObjectByKey(obj1[key], obj2[key])
        else
          result[key] = obj2[key]
      }
    }
    return result
  }

  function deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }

  const objectToDate = (dateObject: any): Date | undefined => {
    if (dateObject) {
      if (dateObject.toDate instanceof Function) {
        return dateObject.toDate()
      } else if (dateObject.seconds && dateObject.nanoseconds >= 0) {
        return new Date(
          dateObject.seconds * 1000 + dateObject.nanoseconds / 1000000
        )
      }
    }
  }

  const generateIdFromString = (str: string) => {
    let hash = str.trim().toLowerCase().replace(/\s/g, '_')
    hash = hash.replace(/[^a-zA-Z0-9_]/g, '')
    hash = `${hash}_${Math.floor(Math.random() + Date.now())}`
    return hash
  }

  const stringNormalize = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
  }

  function time24To12(time: string): string {
    const [hour, minute] = time.split(':')

    const hourAsNumber = Number.parseInt(hour!, 10)

    let suffix
    let adjustedHour
    if (hourAsNumber < 12) {
      suffix = 'AM'
      adjustedHour = hourAsNumber === 0 ? 12 : hourAsNumber
    } else {
      suffix = 'PM'
      adjustedHour = hourAsNumber === 12 ? 12 : hourAsNumber - 12
    }

    const formattedHour = adjustedHour.toString().padStart(2, '0')

    return `${formattedHour}:${minute} ${suffix}`
  }

  const stringToTime = (strTime: string) => {
    const [hour, minute] = strTime.split(':')
    const date = new Date()
    date.setHours(Number.parseInt(hour!))
    date.setMinutes(Number.parseInt(minute!))

    return useFormat().time(date)
  }

  const getEmptyUser = () => {
    return {
      id: null,
      image: null,
      photo: null,
      phone: null,
      password: null,
      confirm: null,
      type: null,
      company: {
        id: null,
        name: null
      },
      email: null,
      name: {
        first: null,
        last: null,
        middle: null,
        display: null
      },
      address: {
        region: {
          code: null,
          name: null
        },
        province: {
          code: null,
          name: null
        },
        city: {
          code: null,
          name: null
        },
        barangay: {
          code: null,
          name: null
        },
        street: null,
        zip: null
      }
    }
  }

  const getDayOfWeek = (date: Date): DayOfWeek => {
    const day = date.getDay()
    return day === 0 ? 7 : day as DayOfWeek
  }

  const inputDateFormat = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toISOString().split('T')[0]
  }

  const timestampToLocalDate = (dateObject: object): Date | null => {
    const dateString = objectToDate(dateObject)?.toLocaleDateString('en-US', {
      timeZone: 'Asia/Manila'
    })
    if (!dateString)
      return null
    return new Date(dateString)
  }

  const getTimeFromDateObject = (dateObject: object) => {
    const date = objectToDate(dateObject)
    if (!date)
      return null

    return date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
  }

  const objectToDateTime = (dateObject: object) => {
    const date = objectToDate(dateObject)
    if (!date)
      return null

    return (
      `${date.toLocaleDateString('en-US', { timeZone: 'Asia/Manila' })
      } ${
        date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}`
    )
  }

  const userImplToUserObject = (userImpl: any): User => {
    const user: User = {
      id: userImpl.uid,
      name: {
        display: userImpl.displayName
      },
      email: userImpl.email,
      phone: userImpl.phoneNumber,
      image: userImpl.photoURL
    }
    return user
  }

  const calculateFee = (type?: FeeCalculable) => {
    if (!type?.fee && !type?.rate)
      return 0

    const rate = type?.rate ?? 0

    const fixed = type?.fee?.fixed ?? 0
    const percent = type?.fee?.percent ?? 0
    const rate_percent = rate * (percent / 100)
    const min = type?.fee?.min ?? 0
    const max = type?.fee?.max ?? 0

    switch (type.fee?.type) {
      case 'percent':
        return rate_percent
      case 'fixed':
        return fixed
      case 'percent-min':
        return rate_percent < min ? min : rate_percent
      case 'percent-max':
        return rate_percent > max ? max : rate_percent
      case 'percent-min-max':
        return rate_percent < min
          ? min
          : rate_percent > max
            ? max
            : rate_percent
      default:
        return 0
    }
  }

  const isEmpty = (obj: any) => {
    switch (typeof obj) {
      case 'string':
        return obj === ''
      case 'number':
        return obj === 0
      case 'object':
        if (obj === null)
          return true
        if (Array.isArray(obj))
          return obj.length === 0
        return Object.keys(obj).length === 0
      default:
        return true
    }
  }

  const isNotEmpty = (obj: any) => {
    return !isEmpty(obj)
  }

  const getUserIndexPage = (role?: UserRole) => {
    return USER_INDEX_PAGE[role ?? 'guest']
  }

  const removeObjectEmptyFields = <T extends { [key: string]: any }>(obj: T): T => {
    const result: any = {}
    for (const key of Object.keys(obj)) {
      if (obj[key] !== undefined && obj[key] !== null)
        result[key] = obj[key]
    }
    return result
  }

  const getIndexPath = (companyUser?: User, needAuth = false) => {
    if (!companyUser)
      return needAuth ? AUTH_LOGIN_PATH : '/'
    return USER_INDEX_PAGE[companyUser?.companyData?.role ?? 'guest']
  }

  const getBasePath = (companyUser?: User, needAuth = false) => {
    if (!companyUser)
      return needAuth ? AUTH_LOGIN_PATH : '/'
    return USER_BASE_PAGE[companyUser?.companyData?.role ?? 'guest']
  }

  const toTimestamp = (date?: Date): Timestamp | undefined => {
    try {
      return Timestamp.fromDate(date ?? new Date())
    } catch {
      return undefined
    }
  }
  const toTimestampOrNow = (date?: Date): Timestamp => {
    try {
      return Timestamp.fromDate(date ?? new Date())
    } catch {
      return Timestamp.now()
    }
  }

  const isDateAttribute = (key: string): boolean => {
    const { dateAttributes } = useConstants()
    return dateAttributes.includes((key as any)) || key.endsWith('At') || key.endsWith('Date')
  }
  const isReferenceAttribute = (key: string): boolean => {
    return key.endsWith('Reference')
  }

  const isReference = (item: any): boolean => {
    return item instanceof DocumentReference
  }

  const isClassInstance = (item: any, methodName = 'toSchema'): boolean => {
    return typeof item === 'object' && item.constructor !== Object && !(item instanceof Array) && !(typeof item === 'function') && typeof item[methodName] === 'function'
  }

  const isServerTimestamp = (value: any): boolean => {
    return JSON.stringify(value) === JSON.stringify({ '.sv': 'timestamp' })
  }

  const convertToTimestampOrNow = (date?: Date) => {
    if (!date)
      return Timestamp.now()
    return convertToTimestamp(date)
  }

  const convertToTimestamp = (value?: any): Timestamp | null => {
    if (!value)
      return null
    if (value instanceof Date)
      return Timestamp.fromDate(new Date(value))
    else if (typeof value === 'string' && !isNaN(Date.parse(value)))
      return Timestamp.fromDate(new Date(value))
    else if (value instanceof Timestamp)
      return value

    return null
  }

  const convertToDate = (value: any) => {
    if (!value)
      return undefined
    if (value instanceof Date)
      return value
    else if (value instanceof Timestamp) {
      return value.toDate()
    } else if (typeof value === 'string' && !isNaN(Date.parse(value)))
      return new Date(value)

    return undefined
  }

  const calculateAge = (birthdate?: Date): number => {
    const today = new Date()
    const birthDate = birthdate ? new Date(birthdate) : today
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
      age--
    return age
  }

  const convertReferenceObjects = (obj: any): any => {
    if (obj === undefined || obj === null) return undefined
    if (typeof obj !== 'object') return obj
    return Object.keys(obj).reduce((result, key) => {
      const value = obj[key]
      // ? How about the DocumentReference objects
      if (key.endsWith('Reference') && typeof value === 'object') {
        const shortKey = key.replace(/Reference$/, '')
        result[shortKey] = convertReferenceObjects(value)
      } else if (key.endsWith('References') && Array.isArray(value)) {
        const shortKey = pluralize(key.replace(/References$/, ''))
        result[shortKey] = value.map(i => convertReferenceObjects(i))
      } else {
        result[key] = value
      }
      return result
    }, {} as any)
  }

  const convertSnapshotObjects = (obj: any): any => {
    if (obj === undefined || obj === null) return undefined
    if (typeof obj !== 'object') return obj
    return Object.keys(obj).reduce((result, key) => {
      const value = obj[key]
      if (value instanceof Date) {
        result[key] = value
        return result
      }
      if (Array.isArray(value)) {
        // if (key.endsWith('Snapshots')) {
        const shortKey = key.endsWith('Snapshots') ? pluralize(key.replace(/Snapshots$/, '')) : key
        result[shortKey] = value.map(i => convertSnapshotObjects(i))
        // } else {
        //   result[key] = value.map((item) => {
        //     if (typeof item === 'object') {
        //       return convertSnapshotObjects(item)
        //     } else {
        //       return item
        //     }
        //   })
        // }
        return result
      }
      if (key.endsWith('Snapshot') && typeof value === 'object') {
        const shortKey = key.replace(/Snapshot$/, '')
        if (!obj[shortKey]?.exists || typeof obj[shortKey] !== 'object') {
          result[shortKey] = convertSnapshotObjects(value)
        } else {
          result[key] = convertSnapshotObjects(value)
        }
      } else {
        result[key] = typeof value === 'object' ? convertSnapshotObjects(value) : value
      }
      return result
    }, {} as any)
  }

  const convertReferenceSnapshotObjects = (obj: any): any => {
    return convertSnapshotObjects(convertReferenceObjects(obj))
  }

  const removeEmptyFields = (data: any): any => {
    return Object.keys(data).reduce((acc, key) => {
      if (data[key] !== null && data[key] !== undefined) {
        acc[key] = data[key]
      }
      return acc
    }, {} as any)
  }

  // const copyToClipboard = (text?: string) => {
  //   const toast = useToast()
  //   if (!text) {
  //     toast.add({ title: 'No text to copy' })
  //     return
  //   }
  //   navigator.clipboard.writeText(text).then(() => {
  //     toast.add({ title: 'Copied to clipboard', description: text })
  //   }).catch((_) => {
  //     toast.add({ title: 'Failed to copy' })
  //   })
  // }

  return {
    removeEmptyFields,
    // copyToClipboard,
    convertReferenceSnapshotObjects,
    convertSnapshotObjects,
    convertReferenceObjects,
    calculateAge,
    isClassInstance,
    isReference,
    convertToDate,
    removeEmojis,
    isServerTimestamp,
    isDateAttribute,
    getIndexPath,
    getBasePath,
    isEmpty,
    isNotEmpty,
    calculateFee,
    getUserIndexPage,
    truncate,
    assignObjectByKey,
    generateIdFromString,
    stringNormalize,
    objectToDate,
    objectToDateTime,
    getEmptyUser,
    deepCopy,
    time24To12,
    stringToTime,
    inputDateFormat,
    timestampToLocalDate,
    getTimeFromDateObject,
    getDayOfWeek,
    objectCopyWith,
    separateObjectFromId,
    userImplToUserObject,

    removeObjectEmptyFields,
    toTimestamp,
    toTimestampOrNow,

    convertToTimestamp,
    convertToTimestampOrNow,

    isReferenceAttribute

  }
}
