export const COLORS = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
export const COLORS_MUTED = ['slate', 'cool', 'zinc', 'neutral', 'stone']
export const COLORS_MODE_PREFERENCE = ['system', 'dark', 'light']

export type PrimaryColor = typeof COLORS[number]

export type MutedColor = typeof COLORS_MUTED[number]

export const useTheme = () => {
  const log = useLogger(false)
  const appConfig = useAppConfig()

  const defaultPrimary = appConfig.ui.primary
  const defaultMuted = appConfig.ui.gray

  const primary = useCookie('primary-color')
  const muted = useCookie('muted-color')

  const init = () => {
    log.i('theme init: ', [primary.value, muted.value])
    appConfig.ui.primary = primary.value ?? defaultPrimary
    appConfig.ui.gray = muted.value ?? defaultMuted
  }

  // init()

  const $reset = () => {
    primary.value = defaultPrimary
    muted.value = defaultMuted
  }
  const setPrimary = (c: PrimaryColor) => {
    primary.value = c
    appConfig.ui.primary = c
  }
  const setMuted = (c: MutedColor) => {
    muted.value = c
    appConfig.ui.gray = c
  }

  return {
    $reset,
    init,
    setMuted,
    setPrimary,
    primary,
    muted
  }
}
