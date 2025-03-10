import { debouncedWatch } from '@vueuse/core'
import { defineStore } from 'pinia'

const log = useLogger(false)
export const useUserStore = defineStore(
  'user-store',
  () => {
    const disabled = ref(false)
    const firestoreRepo = useFirestoreRepo()
    const authRepo = useAuthRepo()
    const storage = useStorageRepo()
    const utils = useUtils()
    const color = useColor()
    const clientStore = useClientStore()
    // const devMode = useDevMode()
    const devMode = computed(() => import.meta.env.DEV && false)
    const adminStore = useAdminStore()
    const { convertReferenceSnapshotObjects: convertToNative } = useUtils()

    const $reset = () => {
      log.i('USER_STORE: RESETTING...')
      userData.value = undefined
      user.value = undefined
      role.value = undefined
      id.value = undefined
      role.value = undefined
      clientStore?.$dispose?.()
      adminStore?.$dispose?.()
      if (userId.value) {
        restarting.value = true
        restarting.value = false
      }
    }
    const signOut = async () => {
      await authRepo?.signOut()
      $reset()
      log.i('USER_STORE: SIGNED OUT going to login')
      navigateTo('/login')
    }
    const signUp = async (email: string, password: string) => {
      await authRepo.signUp(email, password)
    }
    const signIn = async (email: string, password: string) => {
      await authRepo.signIn(email, password)
    }
    const signInWithGoogle = async () => {
      await authRepo.signInWithGoogle()
    }

    const updateUserProfile = async (
      usrData: Partial<User>,
      file?: File
    ) => {
      if (!userId.value)
        throw new Error('User id is not set')
      const user_data: User = { id: userId.value, ...usrData }
      if (file) {
        if (user.value?.image)
          await storage.deleteUserImage(user.value?.image)

        const imageUrl = await storage.uploadUserImage(userId.value, file)
        user_data.image = imageUrl ?? null
      }
      await firestoreRepo.updateUser(user_data)
    }

    const basePath = computed(() => {
      return utils.getBasePath(user.value)
    })
    const indexPath = computed(() => {
      return utils.getIndexPath(user.value)
    })

    const currentUser = useCurrentUser()

    const userId = computed(() => {
      return currentUser.value?.uid
    })

    const reference = computed(() => {
      return useFirestoreReference(devMode.value)
    })

    const user = useState<User | undefined>('user-object-key', () => undefined)

    const userRole = computed(() => user.value?.companyData?.role)

    const getUserName = computed(() => {
      return useFormat().name(user.value?.name)
    })

    const company = computed(() => user.value?.company)
    const companyId = computed(() => company.value?.id)
    const companyReference = computed(() => companyId.value ? useCompanyReference(companyId.value, devMode.value) : undefined)
    const restarting = ref(false)
    const role = useState<string | undefined>('user-role-key', () => undefined)
    const id = useState<string | undefined>('user-id-key', () => undefined)

    const hasAccess = computed(() => {
      return import.meta.client
        && !disabled.value
        && !restarting.value
        && userId.value
        // && user.value
    })

    const userSource = computed(() => hasAccess.value ? reference.value.user(userId.value!) : null)

    const { pending: userPending, data: userData } = useDocument<User>(userSource, { wait: true, maxRefDepth: 2 })

    debouncedWatch(userData, (user_data: any) => {
      const routePath = useRoute().path
      log.i('USER_STORE: USER_DATA: ', user_data)
      user.value = user_data ? convertToNative(user_data) : undefined
      if (user_data?.admin === true) {
        clientStore?.$dispose?.()
      } else if (user_data && !user_data?.admin) {
        adminStore?.$dispose?.()
      }
      if (user_data && routePath === '/login') {
        log.i('USER_STORE: Redirecting to /')
        navigateTo('/')
      }
    }, { deep: true, debounce: 500 })

    debouncedWatch(userId, (uid, old_uid) => {
      if (!uid && old_uid && userData.value) {
        log.i('USER_STORE: redirecting to login (mismatch)', uid)
        $reset()
        navigateTo('/login')
      }
    }, { debounce: 500 })

    const perPage = ref(color.DEFAULT_PER_PAGE)

    return {
      $reset,
      hasAccess,
      userData,
      userSource,
      perPage,
      userId,
      id,
      user,
      devMode,
      // userReactive,
      role,
      userRole,
      getUserName,
      companyId,
      indexPath,
      basePath,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      updateUserProfile,
      company,
      userPending,
      companyReference,
      restarting
    }
  },
  {
    persist: true
  }
)

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }
