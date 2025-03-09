export default defineNuxtPlugin(() => {
  const googleMaps = useGoogleMaps()
  googleMaps.loadScript()
})
