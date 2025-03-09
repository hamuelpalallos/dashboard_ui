import { capitalize } from '@vue/shared'
import pluralize from 'pluralize'

export interface PageData {
  title?: string
  description?: string
  category: string
  categories?: string
}

export const usePageData = (data?: PageData) => {
  return {
    title: data?.title,
    description: data?.description,
    category: data?.category ?? '',
    Category: capitalize(data?.category ?? ''),
    categories: pluralize(data?.category ?? ''),
    Categories: capitalize(pluralize(data?.categories ?? ''))
  }
}
