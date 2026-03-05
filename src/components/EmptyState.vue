<template>
  <div class="bamo-empty-bg d-flex flex-column align-center justify-center position-relative" style="height: 100%; width: 100%;">

    <div class="dot-matrix-layer"></div>

    <div class="content-wrapper text-center">
      <div class="core-engine mb-10">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="cube-container">
          <v-icon size="80" color="#94A3B8">mdi-hexagon-outline</v-icon>
          <v-icon size="40" color="#38BDF8" class="cube-core">mdi-brain</v-icon>
        </div>
      </div>

      <h2 class="text-h4 font-weight-bold grey--text text--darken-3 mb-3 tracking-tight">智能中枢已就绪</h2>
      <p class="text-subtitle-1 grey--text text--darken-1 mb-8 mx-auto" style="max-width: 480px;">
        您的 MES 域权限已通过安全校验。<br>请从左侧控制台选择您需要挂载的 AI 解析模型。
      </p>

      <v-chip color="rgba(56, 189, 248, 0.1)" text-color="#0284C7" class="px-6 py-4 font-weight-bold text-body-2 bamo-chip">
        <v-icon left size="22" class="mr-2 pulse-icon">mdi-gesture-tap</v-icon>
        等待模块接入信号 ...
      </v-chip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState'
}
</script>

<style scoped>
.bamo-empty-bg {
  background-color: #F8FAFC;
  position: relative;
  overflow: hidden;
}

.dot-matrix-layer {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: radial-gradient(#94A3B8 2px, transparent 2px);
  background-size: 32px 32px;
  /* 修复兼容性：使用 black 和 transparent 标准语法 */
  -webkit-mask-image: radial-gradient(circle at center, black 10%, transparent 40%);
  mask-image: radial-gradient(circle at center, black 10%, transparent 40%);
  animation: matrix-wave 15s ease-in-out infinite alternate;
  z-index: 1;
}

@keyframes matrix-wave {
  0% { transform: scale(1) translate(0, 0) rotate(0deg); opacity: 0.3; }
  100% { transform: scale(1.15) translate(15px, 15px) rotate(2deg); opacity: 0.8; }
}

.content-wrapper {
  position: relative;
  z-index: 10;
}

.core-engine {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed #CBD5E1;
}
.ring-1 { width: 100%; height: 100%; animation: spin-slow 20s linear infinite; }
.ring-2 { width: 70%; height: 70%; border: 1px solid rgba(56, 189, 248, 0.4); animation: spin-slow-reverse 12s linear infinite; }

.cube-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 4s ease-in-out infinite;
}

.cube-core {
  position: absolute;
  animation: pulse-glow 2s infinite alternate;
}

.tracking-tight { letter-spacing: -0.02em !important; }

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
@keyframes pulse-glow {
  0% { transform: scale(0.9); opacity: 0.8; filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.4)); }
  100% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8)); }
}
@keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes spin-slow-reverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }

.pulse-icon { animation: slide-left-right 1.5s ease-in-out infinite alternate; }
@keyframes slide-left-right { 0% { transform: translateX(-3px); } 100% { transform: translateX(3px); } }
</style>