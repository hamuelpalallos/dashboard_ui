import { addDays, addHours, addMonths, addWeeks, addYears, differenceInDays, differenceInHours, differenceInMonths, differenceInWeeks, differenceInYears, isBefore, isSameDay } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

import { toZonedTime } from 'date-fns-tz'
import type { Period } from '~/types'

const preferredTimezone = 'Asia/Manila'

export function useDate() {
  function closestFutureDate(dateList: Date[]): Date | null {
    // Get the current date and time
    const currentDate = new Date()

    // Initialize variables to store the closest date and the time difference
    let closestDate: Date | null = null
    let minTimeDifference = Number.POSITIVE_INFINITY

    for (const date of dateList) {
      // Check if the date is in the future
      if (date > currentDate) {
        // Calculate the time difference in milliseconds
        const timeDifference = date.getTime() - currentDate.getTime()

        // Update the closest date if this date is closer
        if (timeDifference < minTimeDifference) {
          minTimeDifference = timeDifference
          closestDate = date
        }
      }
    }

    return closestDate
  }

  const dateFromFirestore = (firestoreDate: any): Date => {
    let convertedDate: Date
    if (
      typeof firestoreDate === 'number'
      || typeof firestoreDate === 'string'
    )
      convertedDate = new Date(firestoreDate)
    else if (typeof firestoreDate === 'object')
      convertedDate = (firestoreDate as Timestamp).toDate()
    else
      throw new Error('Invalid date format')

    convertedDate = toZonedTime(convertedDate, preferredTimezone)

    return convertedDate
  }

  /*
    @param existingDate - The date object to update
    @param timeString - only 24hr The time string to set the date to
  */

  function setTimeInDate(existingDate: Date, timeStr: string): Date {
    const clonedDate = new Date(existingDate) // Clone the original date

    const [hours, minutes] = timeStr.split(':').map(Number)

    // if (isPM && hours < 12)
    //   hours += 12
    // else if (!isPM && hours === 12)
    //   hours = 0 // Handle 12:00 AM (midnight) in 12-hour format

    clonedDate.setHours(hours!)
    clonedDate.setMinutes(minutes!)
    clonedDate.setSeconds(0) // Optional: Reset seconds to zero
    return clonedDate // Return the new Date object
  }

  const getDatesBetween = (date1: Date, date2: Date = new Date()): Date[] => {
    const dates = []
    let startDate = date1 < date2 ? date1 : date2
    let endDate = date1 < date2 ? date2 : date1
    startDate = toZonedTime(startDate, preferredTimezone)
    endDate = toZonedTime(endDate, preferredTimezone)

    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    const currentDate = new Date(startDate)

    while (isSameDay(currentDate, endDate) || isBefore(currentDate, endDate)) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1) // Increment by one day
    }

    // console.log('getDatesBetween: dates', dates, startDate, endDate)
    return dates
  }

  function getWeeksBetween(
    startDate: Date,
    endDate: Date = new Date(),
  ): Date[] {
    const weeks = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      weeks.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 7) // Increment by one week
    }

    return weeks
  }

  const getMonthsBetween = (
    startDate: Date,
    endDate: Date = new Date(),
  ): Date[] => {
    const months = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      months.push(new Date(currentDate))
      currentDate.setMonth(currentDate.getMonth() + 1) // Increment by one month
    }

    return months
  }

  const getYearsBetween = (startDate: Date, endDate: Date = new Date()): Date[] => {
    const years = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      years.push(new Date(currentDate))
      currentDate.setFullYear(currentDate.getFullYear() + 1) // Increment by one year
    }
    return years
  }
  const addPeriod = (date: Date, period: Period): Date => {
    switch (period) {
      case 'daily':
        return addDays(date, 1)
      case 'weekly':
        return addWeeks(date, 1)
      case 'monthly':
        return addMonths(date, 1)
      case 'yearly':
        return addYears(date, 1)
      default:
        throw new Error(`Unknown period: ${period}`)
    }
  }
  // get months between

  const between_dates = (date1: Date, date2: Date, period: Period = 'daily'): Date[] => {
    const { startDate, endDate } = sort_start_end(date1, date2)
    const dates = []
    let iterator = new Date(startDate)
    while (iterator <= endDate) {
      dates.push(new Date(iterator))
      iterator = addPeriod(iterator, period)
    }
    return dates
  }

  const between_days = (date1: Date, date2: Date): Date[] => {
    const { startDate, endDate } = sort_start_end(date1, date2)

    const days = []
    let iterator = new Date(startDate)

    while (iterator <= endDate) {
      days.push(new Date(iterator))
      iterator = addDays(iterator, 1)
    }
    return days
  }

  const sort_start_end = (date1: Date, date2: Date) => {
    const startDate = date1 < date2 ? date1 : date2
    const endDate = date1 > date2 ? date1 : date2
    return { startDate, endDate }
  }

  const between_hours = (date1: Date, date2: Date) => {
    const { startDate, endDate } = sort_start_end(date1, date2)
    const hours = []
    let iterator = new Date(startDate)
    while (iterator <= endDate) {
      hours.push(new Date(iterator))
      iterator = addHours(iterator, 1)
    }
    return hours
  }

  const between_weeks = (date1: Date, date2: Date) => {
    const { startDate, endDate } = sort_start_end(date1, date2)
    const weeks = []
    let iterator = new Date(startDate)
    while (iterator <= endDate) {
      weeks.push(new Date(iterator))
      iterator = addWeeks(iterator, 1)
    }
    return weeks
  }

  const between_months = (date1: Date, date2: Date) => {
    const { startDate, endDate } = sort_start_end(date1, date2)
    const months = []
    let iterator = new Date(startDate)
    while (iterator <= endDate) {
      months.push(new Date(iterator))
      iterator = addMonths(iterator, 1)
    }
    return months
  }

  const between_years = (date1: Date, date2: Date) => {
    const { startDate, endDate } = sort_start_end(date1, date2)
    const years = []
    let iterator = new Date(startDate)
    while (iterator <= endDate) {
      years.push(new Date(iterator))
      iterator = addYears(iterator, 1)
    }
    return years
  }

  const date_span = (date1: Date, date2: Date): string => {
    const { startDate, endDate } = sort_start_end(date1, date2)
    if (differenceInHours(endDate, startDate) > 0 && differenceInDays(endDate, startDate) === 0)
      return 'hourly'
    else if (differenceInDays(endDate, startDate) > 0 && differenceInWeeks(endDate, startDate) === 0)
      return 'daily'
    else if (differenceInWeeks(endDate, startDate) > 0 && differenceInMonths(endDate, startDate) === 0)
      return 'weekly'
    else if (differenceInMonths(endDate, startDate) > 0 && differenceInYears(endDate, startDate) === 0)
      return 'monthly'
    else
      return 'yearly'
  }

  const date_from_firestore = (date: any) => {
    if (date instanceof Timestamp) {
      // Handle Firestore Timestamp
      return date.toDate()
    }
    else if (typeof date === 'string' && !isNaN(Date.parse(date))) {
      // Handle string dates
      return new Date(date)
    }
    return null
  }

  const date_to_firestore = (date: any) => {
    if (date instanceof Date) {
      // Handle Firestore Timestamp
      return Timestamp.fromDate(date)
    }
    else if (typeof date === 'string' && !isNaN(Date.parse(date))) {
      // Handle string dates
      return Timestamp.fromDate(new Date(date))
    }
    return null
  }

  const datetime_string_key = (date: Date) => {
    // Convert the Date object to an ISO string (e.g., "2023-10-05T14:48:00.000Z")
    const isoString = date.toISOString()

    // Extract the date part (e.g., "2023-10-05")
    const datePart = isoString.slice(0, 10)

    // Extract the time part (e.g., "14:48:00") and replace colons with hyphens
    const timePart = isoString.slice(11, 19).replace(/:/g, '-')

    // Combine date and time parts with hyphens
    return `${datePart}-${timePart}`
  }

  const day_of_week = (date: Date): DayOfWeek => {
    const day = date.getDay()
    if (day === 0) return 7
    return day as DayOfWeek
  }

  return {
    day_of_week,
    datetime_string_key,

    date_from_firestore,
    date_to_firestore,

    date_span,
    dates_start_end: sort_start_end,
    between_hours,
    between_days,
    between_weeks,
    between_months,
    between_years,

    between_dates,

    closestFutureDate,
    setTimeInDate,
    dateFromFirestore,
    getDatesBetween,
    getWeeksBetween,
    getMonthsBetween,
    getYearsBetween,

  }
}
