import { capitalize } from 'vue'

export function useData() {
  const option = (data: string, config: OptionConfig = { selected: false }): OptionItem => {
    return {
      label: capitalize(data),
      value: data,
      ...config
    }
  }
  const options = (arr: string[], extension: OptionItem[] = [], config?: OptionConfig, override = false): OptionItem[] => {
    extension = extension.reverse().filter((item, index, self) => self.findIndex(t => t.value === item.value) === index).reverse()
    const extensionValues = extension.map((item: OptionItem) => item.value)
    const options = [...new Set(arr)].filter(item => !extensionValues.includes(item))
    if (override && config) {
      extension = extension.map((item: OptionItem) => {
        return { ...item, ...config }
      })
    }
    return options.map((item: string) => option(item, config)).concat(extension)
  }

  const activeColor = (active?: string | boolean) => {
    if (typeof active === 'string') {
      switch (active?.toLowerCase()) {
        case 'yes': return 'green'
        default: {
          return 'gray'
        }
      }
    }
    return active ? 'green' : 'gray'
  }

  return {
    activeColor,
    options,
    option
  }
}
