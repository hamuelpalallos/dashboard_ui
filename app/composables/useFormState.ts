import { capitalize, type ComponentInternalInstance } from 'vue'
import type { FormError, FormSubmitEvent } from '#ui/types'

export const useFormState = <T extends DatabaseRecord>(params: {
  state: T
  meta: PageData
  submit: (data: T) => Promise<void>
}) => {
  const log = useLogger()
  const { emit } = getCurrentInstance() as ComponentInternalInstance
  const toast = useToastExt()

  const state = reactive<T>({
    ...params.state
  })

  const loading = ref(false)
  const disabled = computed(() => loading.value)
  const isNew = computed<boolean>(() => !state?.id)

  const validate = (x: any): FormError[] => {
    log('validating x:', x)
    return []
  }

  const meta = usePageData({
    ...params.meta
  })

  const submit = async (event: FormSubmitEvent<T>) => {
    log('Form values:', event.data)
    loading.value = true
    try {
      // wait for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000))

      // await clientStore.submitPort(event.data)
      log('submitted supposedly 2')
      await params.submit(event.data)

      emit('success')
      toast.success({
        description: `${capitalize(meta.category)} has been ${isNew.value ? 'created' : 'updated'}!`
      })
    } catch (e) {
      log('Form submission error:', e)
      toast.error({
        description: `${e}`
      })
    }

    loading.value = false
  }
  const test = () => {
    console.log('success')
    emit('success')
  }
  return {
    isNew,
    test,
    validate,
    state,
    submit,
    loading,
    disabled,
    meta
  }
}

export type FormState = ReturnType<typeof useFormState>
