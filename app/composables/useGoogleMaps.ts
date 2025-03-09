export const useGoogleMaps = () => {
  const _log = useLogger()
  const env = useEnv()
  const apiKey = env.GOOGLE_MAPS_API_KEY

  const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`

  const autocomplete = ref<google.maps.places.Autocomplete>()
  const loadScript = (callback?: () => void) => {
    if (!document) return
    if (!apiKey) {
      _log.e('No Google Maps API key provided')
      return
    }
    if (!scriptExists(url)) {
      const script = document.createElement('script')
      script.src = url
      script.async = true
      script.defer = true
      script.onload = callback ?? null
      document.head.appendChild(script)
      _log.d('script has been loaded:', script)
    } else {
      callback?.()
    }

    // <style>

    // .pac-container {
    //   z-index: 9999 !important;
    // }
    // </style>

    // add to css style
    // .pac-container {
    //   z-index: 9999 !important;
    // }
  }

  const scriptExists = (url: string) => {
    return !!getScriptElement(url)
  }

  const getScriptElement = (url: string) => {
    if (!document) return
    return document.querySelector(`script[src="${url}"]`)
  }

  function setupAutocomplete(inputElement: HTMLInputElement, onchanged: () => void) {
    // Access the input element using the ref created for autocompleteInput

    // const inputElement = inputRef?.value
    // let autocomplete: google.maps.places.Autocomplete

    if (!inputElement) {
      console.error('Input element not found. Check your component structure.')
      return
    }

    // Initialize the Autocomplete widget with componentRestrictions
    autocomplete.value = new google.maps.places.Autocomplete(inputElement, {
      types: ['establishment'], // You can specify additional options as needed
      componentRestrictions: { country: 'PH' },
      fields: ['formatted_address']
    })

    // Listen for the 'place_changed' event when a suggestion is selected
    autocomplete.value.addListener('place_changed', onchanged)
  }

  return {
    autocomplete,
    loadScript,
    setupAutocomplete
  }
}
