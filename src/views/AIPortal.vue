<template>
  <div class="bamo-chat-container">
    <v-overlay
        :value="iframeLoading"
        absolute
        color="#F9FAFB"
        opacity="1"
        z-index="10"
        class="d-flex flex-column align-center justify-center"
    >
      <div class="text-center">
        <v-progress-circular
            indeterminate
            color="#38BDF8"
            size="56"
            width="4"
            class="mb-4"
        ></v-progress-circular>
        <div class="text-subtitle-2 grey--text text--darken-2 font-weight-medium tracking-wide">
          正在建立信道 ...
        </div>
      </div>
    </v-overlay>

    <iframe
        :src="currentMaxkbUrl"
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
  data() {
    return {
      iframeLoading: true,
      // 真实场景下，这里的 Token '37a62b89b9480517' 应该从 Vuex 管理的选中应用列表中动态获取
      currentMaxkbUrl: 'http://192.168.8.141:8080/chat/37a62b89b9480517?mode=mobile'
    }
  },
  watch: {
    // 监听侧边栏切换应用导致的 URL 变化，重新触发加载态
    currentMaxkbUrl() {
      this.iframeLoading = true;
    }
  },
  methods: {
    handleIframeReady() {
      // 增加 300ms 缓冲期，等待 MaxKB 内部 Vue/React 渲染 DOM，彻底阻断白屏
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