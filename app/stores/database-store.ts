import { defineStore } from 'pinia'
import { ocean_jet as oj } from '~/seeds/02-ocean-jet'

export const useDatabaseStore = defineStore('database', () => {
  // const repo = useCompanyRepo()
  // const firestoreRepo = useFirestoreRepo()
  const companyId = OCEAN_JET_ID
  const devMode = true
  const company_repo = useCompanyRepo(companyId, devMode)

  const initializeDatabaseData = async () => {
    // await initCompanies()

    await initPorts()

    await initRoutes()

    // await initCargoTypes()

    await initPassengerTypeClasses()

    await initPassengerTypes()

    // await initUsers()
  }
  const initUsers = async () => {
    // const { data: users } = await $fetch('/api/users/')
    // users.forEach(async (user: User) => {
    //   const userId = await firestoreRepo.createUser({ ...user })
    //   if (userId) {
    //     await firestoreRepo.createUserDataInCompany(companyId, userId, user.companyData ?? {})
    //   }
    // })
  }

  // =============== ** UPDATED CODE ** =====================>>
  const initCargoTypes = async () => {
    await company_repo.submitCargoType([])
  }
  const initCargoTypeCategories = async () => {
    // const { data: cargoTypeCategories } = await $fetch('/api/cargo-type-categories/')
    await company_repo.submitCargoTypeCategory([])
  }
  const initCargoTypeClasses = async () => {
    await company_repo.submitCargoTypeClass([])
  }

  const initCargoTypeFootprints = async () => {
    await company_repo.submitCargoTypeFootprint([])
  }

  const initPassengerTypeClasses = async () => {
    await company_repo.submitPassengerTypeClass(oj.passenger_type_class.all)
  }

  const initConveyances = async () => {
    await company_repo.submitConveyance([])
  }

  const initRoutes = async () => {
    // const formRoutes = RouteInstance.toForms(seed_routes)
    await company_repo.submitRoute(oj.route.all)
  }

  const initPorts = async () => {
    await company_repo.submitPort(oj.port.all)
  }

  const initPassengerTypes = async () => {
    await company_repo.submitPassengerType(oj.passenger_type.all)
  }

  return {
    initConveyances,
    initPassengerTypeClasses,
    initCargoTypeCategories,
    initCargoTypeClasses,
    initCargoTypeFootprints,
    initRoutes,
    // --------
    initializeDatabaseData,
    // initCompanies,
    initPorts,
    initCargoTypes,
    initPassengerTypes,
    initUsers
  }
})
