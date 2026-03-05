<template>
  <div class="fill-height d-flex flex-column align-center justify-center bamo-empty-bg">
    <div class="cube-container mb-8">
      <v-icon size="120" color="#E2E8F0">mdi-cube-outline</v-icon>
      <v-icon size="48" color="#38BDF8" class="cube-core">mdi-brain</v-icon>
    </div>

    <p class="text-subtitle-1 grey--text text--darken-1 mb-8" style="max-width: 500px; text-align: center;">
      已获取到您权限内应用信息
    </p>

    <v-chip color="blue lighten-5" text-color="blue darken-2" class="px-4 py-2 font-weight-medium">
      <v-icon left size="20">mdi-arrow-left-circle-outline</v-icon>
      请从左侧控制台选择您需要挂载的 AI 模型...
    </v-chip>
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
  background-image: radial-gradient(#E2E8F0 1px, transparent 1px);
  background-size: 30px 30px;
}

.cube-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 4s ease-in-out infinite;
}

.cube-core {
  position: absolute;
  animation: pulse 2s infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.8; }
}
</style>