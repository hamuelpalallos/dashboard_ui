export function useFind() {
  const item = <T extends { id?: string }>(items?: T[], id?: string) => {
    if (!items || !id)
      return undefined
    return items.find((item) => item?.id === id)
  }

  return {
    item,
  }
}
