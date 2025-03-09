export function usePluginHelper() {
  const loadScript = (url: string, callback: () => void) => {
    if (!scriptExists(url)) {
      const script = document.createElement('script')
      script.src = url
      script.async = true
      script.defer = true
      script.onload = callback
      document.head.appendChild(script)
    }
    else {
      callback()
    }
  }

  const scriptExists = (url: string) => {
    return !!document.querySelector(`script[src="${url}"]`)
  }

  return {
    loadScript,
  }
}
