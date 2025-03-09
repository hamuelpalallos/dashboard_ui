export const useDevMode = () => {
  const { toBoolean, toBooleanString } = useParse()
  const devModeCookie = useCookie('dev-mode')
  const mode = computed<boolean>(() => toBoolean(devModeCookie.value))
  const $reset = () => {
    devModeCookie.value = toBooleanString(import.meta.env.DEV)
  }
  const setDevMode = (value: boolean) => {
    devModeCookie.value = toBooleanString(value)
  }

  const logo = '/svg/logo.svg'
  const logo_gray = '/svg/logo_gray.svg'
  const envModeOptions = [
    {
      label: 'Production',
      avatar: {
        src: logo
      },
      click: () => {
        setDevMode(false)
      }
    },
    {
      label: 'Development',
      avatar: {
        src: logo_gray
      },
      click: () => {
        setDevMode(true)
      }
    }
  ]
  const selectedEnvMode = computed(() => {
    return mode.value ? envModeOptions[1] : envModeOptions[0]
  })

  return {
    $reset,
    mode,
    setDevMode,
    selectedEnvMode,
    envModeOptions
  }
}
