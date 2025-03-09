<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  accept?: () => void
  onClose?: () => void
  loading?: boolean
}

const {
  title = 'Delete record',
  description = 'Are you sure you want to delete?',
  accept,
  onClose,
  loading = false
} = defineProps<Props>()
const disabled = computed(() => loading)
const open = defineModel<boolean>({ default: false })
</script>

<template>
  <UModal
    v-model="open"
    @close="onClose"
  >
    <UCard>
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <slot>
        <p>{{ description }}</p>
      </slot>
      <template #footer>
        <div class="flex gap-4">
          <UButton
            :loading="loading"
            :disabled

            variant="outline"
            color="red"
            label="Delete"
            @click="accept"
          />
          <UButton
            :loading
            :disabled
            variant="outline"
            color="gray"
            label="Cancel"
            @click="open = false"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
