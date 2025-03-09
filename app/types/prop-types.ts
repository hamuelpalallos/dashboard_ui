export interface TableHeadingProps {
  label: string
  key: string
}

export interface TablePerPageProps {
  label: string
  value: number
}

export interface TableRowProps {
  // items: TableRowItemProps[]
  [key: string]: string
}

export interface TableRowItemProps {
  key: string
  value: any
}

// export interface TableColumn {
//   key: string | any
//   label: string
//   sortable?: boolean
//   direction?: 'asc' | 'desc'
//   class?: string
//   sortKey?: string // if key is different from the column key
//   type?: 'text' | 'number' | 'date' | 'datetime' | 'time' | 'currency' | 'boolean' | 'image' | 'link' | 'button' | 'icon' | 'select' | 'custom'
// }

// Table from UI
// interface Column {
//   key: string;
//   sortable?: boolean;
//   sort?: (a: any, b: any, direction: 'asc' | 'desc') => number;
//   direction?: 'asc' | 'desc';
//   class?: string;
//   rowClass?: string;
//   [key: string]: any;
// }

// export interface TableColumn<T> {
//   key: keyof T | string
//   label: string
//   sortable?: boolean
//   sort?: (a: any, b: any, direction: 'asc' | 'desc') => number
//   direction?: 'asc' | 'desc'
//   class?: string
//   rowClass?: string
//   // added ==>
//   type?: 'text' | 'number' | 'date' | 'datetime' | 'time' | 'currency' | 'boolean' | 'image' | 'link' | 'button' | 'icon' | 'select' | 'custom'
//   dropdown?: boolean
//   hidden?: boolean
//   display?: boolean
//   // filter?: 'select' | 'datepicker'

//   // added <==
//   [key: string]: any
// }

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  sort?: (a: any, b: any, direction: 'asc' | 'desc') => number
  direction?: 'asc' | 'desc'
  class?: string
  rowClass?: string
  // added ==>
  type?: 'text' | 'number' | 'date' | 'datetime' | 'time' | 'currency' | 'boolean' | 'image' | 'link' | 'button' | 'icon' | 'select' | 'custom'
  dropdown?: boolean
  hidden?: boolean
  display?: boolean
  // filter?: 'select' | 'datepicker'
  generate?: boolean

  // added <==
  [key: string]: any
}

export interface TripProps {
  company?: string
  stops?: number
  price?: number
  departure?: {
    time?: string
    date?: string
    city?: string
    airport?: string
  }
  arrival?: {
    time?: string
    date?: string
    city?: string
    airport?: string
  }
}

export interface FormFieldProps {
  label?: string
  name?: string
  loading?: boolean
  disabled?: boolean
}
