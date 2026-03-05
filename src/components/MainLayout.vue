<template>
  <div class="main-layout d-flex fill-height w-100">

    <v-navigation-drawer permanent width="260" color="#FFFFFF" class="bamo-light-drawer flex-shrink-0">

      <div class="px-4 py-4 d-flex align-center justify-space-between bamo-drawer-header">
        <div class="d-flex align-center">
          <v-icon color="#1976D2" large class="mr-2">mdi-hexagon-multiple</v-icon>
          <div>
            <div class="text-h6 font-weight-bold grey--text text--darken-4 tracking-tight">BAMO</div>
          </div>
        </div>

        <v-menu offset-y bottom left rounded="lg" transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="user-avatar-btn">
              <v-avatar size="32" color="blue lighten-5">
                <span class="blue--text text--darken-2 text-caption font-weight-bold">ADM</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list dense width="200" class="py-0">
            <v-list-item class="px-4 py-3 grey lighten-5">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold text-body-2">系统管理员</v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-1">MES 域架构组</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout" class="px-4 py-2 hover-danger">
              <v-list-item-icon class="mr-3"><v-icon size="20" color="error">mdi-logout</v-icon></v-list-item-icon>
              <v-list-item-title class="error--text">安全退出系统</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-list nav class="px-3 mt-4">
        <div class="px-2 mb-2 text-caption grey--text font-weight-bold">核心解析模型</div>
        <v-list-item-group v-model="activeAppId" color="#1976D2">
          <v-list-item
              v-for="app in mockAppList"
              :key="app.id"
              :value="app.id"
              class="mb-2 bamo-nav-item"
              @click="handleAppClick(app)"
          >
            <v-list-item-icon class="mr-3">
              <v-icon :color="app.isSecure ? '#FF9800' : '#78909C'">{{ app.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium text-body-2 grey--text text--darken-3">{{ app.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="app.isSecure">
              <v-icon small color="#FF9800">mdi-shield-lock-outline</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="px-4 pb-6">
          <v-chip small color="green lighten-5" text-color="green darken-2" class="font-weight-medium w-100 justify-center bamo-status-chip">
            <span class="pulse-dot mr-2"></span> Engine Online
          </v-chip>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="bamo-main-bg flex-grow-1 pa-0" style="height: 100vh; overflow: hidden;">
      <router-view></router-view>
    </v-main>
  </div>
</template>
<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      activeAppId: '1',
      mockAppList: [
        { id: '1', name: 'SOP 知识检索引擎', icon: 'mdi-book-open-page-variant', isSecure: false },
        { id: '2', name: '产线 CPK 深度分析', icon: 'mdi-chart-bell-curve-cumulative', isSecure: true },
        { id: '3', name: '窑炉能耗监控中枢', icon: 'mdi-server-network', isSecure: true }
      ]
    }
  },
  computed: {
    currentAppName() {
      const app = this.mockAppList.find(a => a.id === this.activeAppId);
      return app ? app.name : '工作台';
    }
  },
  methods: {
    handleAppClick(app) {
      if (app.isSecure) {
        console.warn('【安全熔断】需前置 AuthDialog 提权授权', app.name);
        // 此处后续将阻断并弹出 AuthDialog
      } else {
        if (this.$route.name !== 'AIPortal') {
          this.$router.push({ name: 'AIPortal' }).catch(()=>{});
        }
      }
    },
    logout() {
      localStorage.removeItem('bamo_token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* --- 替换所有旧的样式 --- */

.py-4 {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

/* 侧边栏亮色极简风 */
.bamo-light-drawer {
  border-right: 1px solid #E5E7EB !important; /* 非常细微的分割线，与 MaxKB 融合 */
}

.bamo-drawer-header {
  border-bottom: 1px solid #F3F4F6;
}

.tracking-tight {
  letter-spacing: -0.02em !important;
}

/* 导航项悬停与激活状态 (亮色系) */
.bamo-nav-item {
  border-radius: 8px !important;
  transition: all 0.2s ease;
}
.bamo-nav-item:hover {
  background-color: #F3F4F6;
}
.v-list-item--active.bamo-nav-item {
  background-color: #EFF6FF !important;
}

.user-avatar-btn {
  transition: transform 0.2s;
}
.user-avatar-btn:hover {
  transform: scale(1.05);
}
.hover-danger:hover {
  background-color: #FEF2F2 !important;
}

/* 底部状态标 */
.bamo-status-chip {
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* 在线状态呼吸灯 */
.pulse-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #10B981;
  box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
</style>