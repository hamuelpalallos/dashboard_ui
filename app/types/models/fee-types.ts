export type FeeType = typeof FEE_TYPES[number]

export interface Fee extends DatabaseRecord {
  type: FeeType
  fixed: number
  percent: number
  min: number
  max: number
}

export interface FeeCalculable {
  fee?: Fee
  rate?: number
  free?: boolean
}
export interface FeeItem {
  name?: string
  fee: Fee
  description?: string
  // feeReference: FeeRef
}
