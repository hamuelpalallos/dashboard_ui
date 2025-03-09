<script setup lang="ts">
import { FirebaseError } from 'firebase/app'

definePageMeta({
  layout: 'auth',
  middleware: ['un-auth']
})

useSeoMeta({
  title: 'Login'
})

const fields = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  autocomplete: 'email username',
  placeholder: 'Enter your email'
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  autocomplete: 'current-password',
  placeholder: 'Enter your password'
}]

const validate = (state: any) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}
const { google: googleIcon } = useIcon()
const userStore = useUserStore()
const providers = [{
  label: 'Continue with Google',
  icon: googleIcon,
  color: 'white' as const,
  click: () => {
    userStore.signInWithGoogle()
  }
}]

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
async function onSubmit(values: any) {
  // console.log('Submitted', values)
  errors.value = []
  simulateLoading.value = true
  try {
    await userStore.signIn(values.email, values.password)

    // await userStore.userSource

    // loginSuccess()
    // navigateTo('/redirect')
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
        toast.add({ color: 'red', icon: 'i-heroicons-information-circle', title: 'Network error', description: 'Check your connection.' })
      } else {
        setFieldError('error', error.message)
        toast.add({ color: 'red', icon: 'i-heroicons-information-circle', title: 'Error', description: error.message })
      }
    } else {
      setFieldError('password', 'Invalid credentials (use "password")')
    }
  }
  simulateLoading.value = false
}

const componentId = useId()
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm min-h-96 w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <ClientOnly>
      <template #fallback>
        <USkeleton
          class="w-full h-96"
          :ui="{ background: 'backdrop-blur bg-gray-100 dark:bg-primary-900 opacity-10' }"
        />
      </template>
      <UAuthForm
        :key="componentId"
        :fields="fields"
        :validate="validate"
        :providers="providers"
        title="Welcome back"
        description="hello"
        :align="'top'"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
        :loading="isUserLoading"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account? <NuxtLink
            to="/signup"
            class="text-primary font-medium"
          >Sign up</NuxtLink>.
        </template>

        <template #password-hint>
          <NuxtLink
            to="/"
            class="text-primary font-medium"
          >Forgot password?</NuxtLink>
        </template>
        <template
          #validation
        >
          <UAlert
            v-for="e in errors"
            :key="e"
            color="red"
            icon="i-heroicons-information-circle-20-solid"
            :title="e.err"
          />
        </template>
        <template #footer>
          By signing in, you agree to our <NuxtLink
            to="/"
            class="text-primary font-medium"
          >Terms of Service</NuxtLink>.
        </template>
      </UAuthForm>
    <!-- <USkeleton class="h-40 w-full" /> -->
    </ClientOnly>
  </UCard>
</template>
