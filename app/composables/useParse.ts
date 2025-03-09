export const useParse = () => {
  const toBoolean = (value?: string | null): boolean => {
    if (value === undefined || value === null) return false
    if (value === 'true') return true
    if (value === 'false') return false
    return Boolean(value)
  }
  const toBooleanString = (value?: boolean | null): string => {
    // if (value === undefined || value === null) return 'false'
    return value ? 'true' : 'false'
  }
  return {
    toBoolean,
    toBooleanString
  }
}
