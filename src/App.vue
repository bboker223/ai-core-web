<template>
  <v-app>
    <transition name="fade">
      <div v-if="$root.globalLoading" class="bamo-gradient-bar"></div>
    </transition>
    <router-view />
  </v-app>
</template>


<script>
export default {
  name: 'App'
}
</script>

<style>
/* 隐藏原生滚动条，保持界面整洁 */
html {
  overflow-y: auto;
}

/* 工业互联网标志性流光渐变条 */
.bamo-gradient-bar {
  height: 4px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: linear-gradient(90deg, #c019d2, #00BCD4, #4CAF50, #1976D2);
  background-size: 200% 100%;
  animation: gradientMove 3s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

/* 新增渐隐动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>