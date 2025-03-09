export const copyToClipboard = (text?: string) => {
  const toast = useToast()
  if (!text) {
    toast.add({ title: 'No text to copy' })
    return
  }
  navigator.clipboard.writeText(text).then(() => {
    toast.add({ title: 'Copied to clipboard', description: text })
  }).catch((_) => {
    toast.add({ title: 'Failed to copy' })
  })
}
