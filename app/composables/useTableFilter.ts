// define the Filter Props
interface FilterQuery {
  q?: string
  statuses?: string[]
  locations?: string[]
  sort?: keyof any
  order?: 'asc' | 'desc'

}

interface FilterableItem {
  name?: string
  email?: string
  status?: string
  location?: string
}
export const useTableFilter = <T>(items: T[], query: FilterQuery, columns: TableColumn[]) => {
  const { q, order, sort } = query
  return items.filter((item) => {
    if (!q) return true
    // for searchables

    return item.name.search(new RegExp(q, 'i')) !== -1 || item.email.search(new RegExp(q, 'i')) !== -1
  }).filter((item) => {
    if (!statuses?.length) return true

    return statuses.includes(item.status)
  }).filter((item) => {
    if (!locations?.length) return true

    return locations.includes(item.location)
  }).sort((a, b) => {
    if (!sort) return 0

    const aValue = a[sort]
    const bValue = b[sort]

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })
}
