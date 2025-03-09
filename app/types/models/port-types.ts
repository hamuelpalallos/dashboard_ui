export interface Port extends DatabaseRecord {
  name?: string
  code?: string
  address?: Address
  fees?: FeeItem[]
}
