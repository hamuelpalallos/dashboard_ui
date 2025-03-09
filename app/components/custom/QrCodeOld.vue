<script setup lang="ts">
//
import VueQrcode from 'vue-qrcode'

const dataUrl = ref<string>()
const onDataUrlChange = (url: any) => {
  dataUrl.value = url
}
</script>

<template>
  <VueQrcode
    value="https://www.1stg.me"
    :color="{ dark: 'green', light: '#gvb  ' }"
    type="image/png"
    @change="onDataUrlChange"
  />
</template>

<!-- <script>
import VueQrcode from 'vue-qrcode'

export default {
  components: {
    VueQrcode
  },
  data() {
    return {
      dataUrl: null
    }
  },
  methods: {
    onDataUrlChange(dataUrl) {
      this.dataUrl = dataUrl
    }
  }
}
</script> -->
