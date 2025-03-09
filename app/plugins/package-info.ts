// import the packages json file
import packageInfo from '../../package.json'

export default defineNuxtPlugin((_) => {
  // Add the packageInfo to the context
  // nuxtApp.provide('packageInfo', packageInfo)
  return {
    provide: { packageInfo, version: packageInfo?.version }
  }
})
