import type { Notification } from '#ui/types'

export const useToastExt = () => {
  const toast = useToast()
  const success = (notification: Partial<Notification>) => {
    if (!notification.title) notification.title = 'Success'
    if (!notification.color) notification.color = 'green'
    if (!notification.icon) notification.icon = 'i-heroicons-check-circle'

    toast.add(notification)
  }
  const error = (notification: Partial<Notification>) => {
    if (!notification.title) notification.title = 'Error'
    if (!notification.color) notification.color = 'red'
    if (!notification.icon) notification.icon = 'i-heroicons-exclamation-circle'
    toast.add(notification)
  }

  const info = (notification: Partial<Notification>) => {
    if (!notification.title) notification.title = 'Info'
    if (!notification.color) notification.color = 'sky'
    if (!notification.icon) notification.icon = 'i-heroicons-information-circle'
    toast.add(notification)
  }

  const warning = (notification: Partial<Notification>) => {
    if (!notification.title) notification.title = 'Warning'
    if (!notification.color) notification.color = 'orange'
    if (!notification.icon) notification.icon = 'i-heroicons-exclamation-triangle'
    toast.add(notification)
  }
  return {
    success,
    error,
    info,
    warning
  }
}
