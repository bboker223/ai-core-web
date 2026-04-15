<template>
  <div class="bamo-chat-container">
    <v-overlay
        :value="iframeLoading"
        absolute
        color="#FFFFFF"
        opacity="1"
        z-index="10"
        class="d-flex flex-column align-center justify-center"
    >
      <div class="text-center">
        <v-progress-circular indeterminate color="#90CAF9" size="24" width="2"></v-progress-circular>
        <div class="text-subtitle-2 grey--text text--darken-2 font-weight-medium tracking-wide"></div>
      </div>
    </v-overlay>

    <iframe
        :key="appUrl"
        :src="appUrl"
        class="bamo-maxkb-iframe"
        :style="{ opacity: iframeLoading ? 0 : 1 }"
        frameborder="0"
        allow="microphone; camera; clipboard-read; clipboard-write"
        @load="handleIframeReady"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'AIPortal',
  props: {
    appId: {
      type: [String, Number],
      required: true
    },
    appUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      iframeLoading: true
    }
  },
  watch: {
    appUrl: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.iframeLoading = true;
        }
      }
    }
  },
  methods: {
    handleIframeReady() {
      setTimeout(() => {
        this.iframeLoading = false;
      }, 300);
    }
  }
}
</script>

<style scoped>
.bamo-chat-container { width: 100%; height: 100%; position: relative; background-color: #FFFFFF; overflow: hidden; }
.bamo-maxkb-iframe { width: 100%; height: 100%; display: block; border: none; background: #FFFFFF; transition: opacity 0.3s ease; }
.tracking-wide { letter-spacing: 0.05em !important; }
</style>