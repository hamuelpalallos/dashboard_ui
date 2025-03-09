import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'

export function useAuthRepo() {
  const log = useLogger()
  const firestore_repo = useFirestoreRepo()
  const auth = useFirebaseAuth()!

  const getAuthState = async () => {
    return useCurrentUser()
  }

  const signIn = async (email: string, password: string) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    await setupUserDataInFirestore(credentials.user)
  }

  const signUp = async (email: string, password: string) => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    await setupUserDataInFirestore(credentials.user)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const credentials = await signInWithPopup(auth, provider)
    await setupUserDataInFirestore(credentials.user)
  }

  const signOut = async () => {
    log('SIGNING OUT')
    try {
      await auth.signOut()
    } catch (err) {
      log.e('Error signing out:', err)
      throw err
    }
  }

  const setupUserDataInFirestore = async (userImpl?: UserImpl) => {
    // console.log("setting up User in Firestore", userImpl)
    if (!userImpl)
      return
    const userId = userImpl.uid
    const usr = await firestore_repo.getUserData(userId)
    // console.log("AUTH REPO: GETTING USER DATA: ", usr)
    if (!usr) {
      // console.log("NO USER FOUND: creating user", userImpl)
      await firestore_repo.createUserFromImpl(userImpl)
    }
  }

  return {
    auth,
    signIn,
    signUp,
    signOut,
    getAuthState,
    signInWithGoogle,
    setupUserDataInFirestore
  }
}
