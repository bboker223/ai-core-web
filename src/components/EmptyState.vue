<template>
  <div class="bamo-empty-bg d-flex flex-column align-center justify-center position-relative" style="height: 100%; width: 100%;">
    <div class="content-wrapper text-center">
      <div class="core-engine mb-10">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="cube-container">
          <v-icon size="80" color="#94A3B8">mdi-hexagon-outline</v-icon>
          <v-icon size="40" color="#38BDF8" class="cube-core">mdi-brain</v-icon>
        </div>
      </div>
      <p class="text-subtitle-1 grey--text text--darken-1 mb-8 mx-auto" style="max-width: 480px;">
        已获取到您iMES权限下可用的 AI 模型
      </p>
      <v-chip color="rgba(56, 189, 248, 0.1)" text-color="#0284C7" class="px-6 py-4 font-weight-bold text-body-2 bamo-chip">
        <v-icon left size="22" class="mr-2 pulse-icon">mdi-gesture-tap</v-icon>
        请从左侧控制台选择...
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
/* 静态点阵背景，参数对齐登录页质感 */
.bamo-empty-bg {
  background-color: #F8FAFC;
  background-image: radial-gradient(#CBD5E1 1px, transparent 1px);
  background-size: 24px 24px;
  position: relative;
  overflow: hidden;
}

.content-wrapper { position: relative; z-index: 10; }
.core-engine { position: relative; width: 160px; height: 160px; margin: 0 auto; display: flex; align-items: center; justify-content: center; }
.ring { position: absolute; border-radius: 50%; border: 2px dashed #CBD5E1; }
.ring-1 { width: 100%; height: 100%; animation: spin-slow 20s linear infinite; }
.ring-2 { width: 70%; height: 70%; border: 2px dashed rgba(56, 189, 248, 0.4); animation: spin-slow-reverse 12s linear infinite; }
.cube-container { position: relative; display: flex; align-items: center; justify-content: center;  }
.cube-core { position: absolute }
.tracking-tight { letter-spacing: -0.02em !important; }

@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
@keyframes pulse-glow { 0% { transform: scale(0.9); opacity: 0.8; filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.4)); } 100% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8)); } }
@keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes spin-slow-reverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
.pulse-icon { animation: slide-left-right 1.5s ease-in-out infinite alternate; }
@keyframes slide-left-right { 0% { transform: translateX(-3px); } 100% { transform: translateX(3px); } }
</style>