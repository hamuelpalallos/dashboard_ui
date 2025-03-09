<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, ImageSettings } from 'qrcode.vue'

const level = ref<Level>('H')
const renderAs = ref<RenderAs>('svg')
const background = ref('transparent')
const foreground = ref('currentColor')
const margin = ref(2)
// const svgLogo = '/svg/logo.svg'
const logoImage = '/png/logo2.png'
const imageSettings = ref<ImageSettings>({
  src: logoImage,
  width: 30,
  height: 30,
  // x: 10,
  // y: 10,
  excavate: true
})
const { value = '' } = defineProps<{
  value: string
  img?: string
}>()
</script>

<template>
  <div>
    <QrcodeVue
      class=" !text-primary-900 !dark:text-primary-900 dark:bg-primary-50 rounded-lg"
      :value="value"
      :level="level"
      :render-as="renderAs"
      :background="background"
      :foreground="foreground"
      :image-settings="imageSettings"
      :margin
      @click="copyToClipboard(value)"
    />
  </div>
</template>
