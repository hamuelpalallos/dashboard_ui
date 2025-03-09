import { defineStore } from 'pinia'

export const useSettingStore = defineStore(
  'setting-store',
  () => {
    const devMode = ref(import.meta.env.DEV)

    const $reset = () => {
      devMode.value = import.meta.env.DEV
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
          devMode.value = false
        }
      },
      {
        label: 'Development',
        avatar: {
          src: logo_gray
        },
        click: () => {
          devMode.value = true
        }
      }
    ]
    const selectedEnvMode = computed(() => {
      return devMode.value ? envModeOptions[1] : envModeOptions[0]
    })

    return {
      $reset,
      devMode,
      selectedEnvMode,
      envModeOptions
    }
  }
)
