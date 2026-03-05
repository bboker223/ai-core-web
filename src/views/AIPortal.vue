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
        <v-progress-circular indeterminate color="#2196F3" size="56" width="4" class="mb-4"></v-progress-circular>
        <div class="text-subtitle-2 grey--text text--darken-2 font-weight-medium tracking-wide">
          正在建立信道 ...
        </div>
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
    // 监听传入的 URL 变化，一旦变化，马上亮起骨架屏动画
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
      // 缓冲 300ms 等待内部 DOM 渲染
      setTimeout(() => {
        this.iframeLoading = false;
      }, 300);
    }
  }
}
</script>

<style scoped>
/* 保持其他样式不变，只需调整背景色与 MaxKB 融合 */
.bamo-chat-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #FFFFFF; /* 改为纯白底色 */
  overflow: hidden;
}

.bamo-maxkb-iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
  background: #FFFFFF;
  transition: opacity 0.3s ease; /* 增加平滑显示的过渡动画 */
}

.tracking-wide {
  letter-spacing: 0.05em !important;
}
</style>