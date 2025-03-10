<script setup lang="ts">
import { FirebaseError } from 'firebase/app'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
  middleware: ['un-auth']
})

useSeoMeta({
  title: 'Login'
})

// const fields = [{
//   name: 'email',
//   type: 'email',
//   label: 'Email',
//   autocomplete: 'email username',
//   placeholder: 'Enter your email'
// }, {
//   name: 'password',
//   label: 'Password',
//   type: 'password',
//   autocomplete: 'current-password',
//   placeholder: 'Enter your password'
// }]

const validate = (state: any) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}
const { google: googleIcon } = useIcon()
const userStore = useUserStore()


// const log = useLogger()
const simulateLoading = ref(false)

const isUserLoading = computed(() => {
  return userStore.userPending || simulateLoading.value
})

// const wasLoading = ref(false)

// watch(isUserLoading, (isLoading) => {
//   if (isLoading) {
//     wasLoading.value = true
//   } else {
//     if (wasLoading.value && hasAccess.value) {
//       // console.log('USER_LOADED_LOADING:', userStore.user)
//       wasLoading.value = false
//       navigateTo('/')
//     }
//   }
// })
// const hasAccess = computed(() => userStore.hasAccess)
// debouncedWatch(hasAccess, (allowed) => {
//   if (allowed) {
//     navigateTo('/')
//   }
// }, { debounce: 500 })

const errors = ref<any[]>([])
const setFieldError = (key?: string, err?: string) => {
  errors.value.push({ key, err })
}
const setErrors = (errs?: { [key: string]: string }) => {
  errors.value = []
  if (errs) {
    Object.entries(errs).forEach(([key, value]) => {
      setFieldError(key, value)
    })
  }
}
const toast = useToast()
// async function onSubmit(values: any) {
//   // console.log('Submitted', values)
//   errors.value = []
//   simulateLoading.value = true
//   try {
//     await userStore.signIn(values.email, values.password)

//     // await userStore.userSource

//     // loginSuccess()
//     // navigateTo('/redirect')
//   } catch (error: any) {
//     console.log('LOGIN: error', error)
//     // console.log('LOGIN: error code:', error?.code)
//     // console.log('LOGIN: error message:', error?.message)
//     if (error instanceof FirebaseError) {
//       console.log('LOGIN: It is a FirebaseError')

//       if (error.code === 'auth/user-not-found') {
//         setErrors({
//           email: 'User not found. Please check your credentials.'
//         })
//       } else if (error.code === 'auth/invalid-credential') {
//         setFieldError('email', 'Invalid credentials')
//       } else if (error.code === 'auth/wrong-password') {
//         setFieldError('password', 'Invalid credentials (use "password")')
//       } else if (error.code === 'auth/network-request-failed') {
//         setFieldError('network', 'No network connection')
//         toast.add({ color: 'red', icon: 'i-heroicons-information-circle', title: 'Network error', description: 'Check your connection.' })
//       } else {
//         setFieldError('error', error.message)
//         toast.add({ color: 'red', icon: 'i-heroicons-information-circle', title: 'Error', description: error.message })
//       }
//     } else {
//       setFieldError('password', 'Invalid credentials (use "password")')
//     }
//   }
//   simulateLoading.value = false
// }

const componentId = useId()

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    userStore.signInWithGoogle()
    // toast.add({ title: 'Google', description: 'Login with Google' })
  }
}]


// const providers = [{
//   label: 'Continue with Google',
//   icon: googleIcon,
//   color: 'white' as const,
//   click: () => {
//     userStore.signInWithGoogle()
//   }
// }]
const schema = useZodSchema().LoginSchema
type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  errors.value = []
  simulateLoading.value = true
  try {
    await userStore.signIn(payload.data.email, payload.data.password)

  } catch (error: any) {
    console.log('LOGIN: error', error)
    // console.log('LOGIN: error code:', error?.code)
    // console.log('LOGIN: error message:', error?.message)
    if (error instanceof FirebaseError) {
      console.log('LOGIN: It is a FirebaseError')

      if (error.code === 'auth/user-not-found') {
        setErrors({
          email: 'User not found. Please check your credentials.'
        })
      } else if (error.code === 'auth/invalid-credential') {
        setFieldError('email', 'Invalid credentials')
      } else if (error.code === 'auth/wrong-password') {
        setFieldError('password', 'Invalid credentials (use "password")')
      } else if (error.code === 'auth/network-request-failed') {
        setFieldError('network', 'No network connection')
        toast.add({ color: 'error', icon: 'i-heroicons-information-circle', title: 'Network error', description: 'Check your connection.' })
      } else {
        setFieldError('error', error.message)
        toast.add({ color: 'error', icon: 'i-heroicons-information-circle', title: 'Error', description: error.message })
      }
    } else {
      setFieldError('password', 'Invalid credentials (use "password")')
    }
  }
  simulateLoading.value = false
}
const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password'
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const
}]

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schema" title="Login" description="Enter your credentials to access your account."
        icon="i-lucide-user" :fields="fields" :providers="providers" @submit="onSubmit" />
    </UPageCard>
  </div>
</template>
