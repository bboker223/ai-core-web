<template>
  <div class="main-layout d-flex fill-height w-100">
    <v-navigation-drawer permanent width="260" color="#FFFFFF" class="bamo-light-drawer flex-shrink-0">
      <div class="px-4 py-4 d-flex align-center justify-space-between bamo-drawer-header">
        <div class="d-flex align-center">
          <img src="@/assets/bmlogo.png" alt="巴莫科技" height="32" class="mr-2" style="object-fit: contain;" />
          <div>
            <div class="text-h6 font-weight-bold grey--text text--darken-4 tracking-tight">巴莫AI平台</div>
          </div>
        </div>
        <v-menu offset-y bottom left rounded="lg" transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="user-avatar-btn">
              <v-avatar size="32" color="blue lighten-5">
                <v-icon dark>
                  mdi mdi-exit-to-app
                </v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list dense width="200" class="py-0">
            <v-list-item class="px-4 py-3 grey lighten-5">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold text-body-2">{{username}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout" class="px-4 py-2 hover-danger">
              <v-list-item-title class="error--text">退出系统</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-list nav class="px-3 mt-4">
        <div class="px-2 mb-2 text-caption grey--text font-weight-bold">智能工作空间</div>
        <v-list-item-group v-model="activeAppId" color="#1976D2">
          <v-list-item
              v-for="app in appList"
              :key="app.id"
              :value="app.id"
              class="mb-2 bamo-nav-item"
              @click="handleAppClick(app)"
          >
            <v-list-item-icon class="mr-3">
              <v-icon :color="app.isSecure ? '#FF9800' : '#78909C'">mdi-{{ app.icon }}</v-icon>
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

        <div class="text-center bamo-copyright">
          <div class="opacity-70">   <v-icon size="12" color="#94A3B8" class="mr-1">mdi-shield-check</v-icon>巴莫科技 · 工业智能AI中枢 v1.0</div>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="flex-grow-1 pa-0" style="height: 100vh; overflow: hidden;">
      <AIPortal v-if="activeAppId" :appId="activeAppId" :appUrl="currentAppUrl" />
      <EmptyState v-else />
    </v-main>


  </div>
</template>

<script>
import EmptyState from '@/components/EmptyState.vue';
import AIPortal from '@/views/AIPortal.vue';

export default {
  name: 'MainLayout',
  components: {
    AIPortal,
    EmptyState,
  },
  data() {
    return {
      activeAppId: null, // 默认不选中任何应用
      appList: []
    }
  },
  created() {
    this.fetchAppList();
  },
  computed: {
    currentAppUrl() {
      const app = this.appList.find(a => a.id === this.activeAppId);
      return app ? `http://192.168.8.141:8080/chat/${app.chatToken}?mode=mobile` : '';
    },
    username(){
      return localStorage.getItem('bamo_userName');
    }
  },
  methods: {
    async fetchAppList() {
      try {
        const userId = localStorage.getItem('bamo_userId');
        const res = await this.$axios.get(`${this.$url.baseUrl}/api/portal/app/list?userId=${userId}`);

        if (res.data.code === 401) {
          console.warn("登录已过期，请重新登录");
          this.logout();
          return;
        }

        this.appList = res.data.data.map(item => ({
          id: item.id,
          name: item.appName,
          icon: item.appIcon || 'hexagon',
          isSecure: item.isSecure === 1,
          chatToken: item.chatToken
        }));
      } catch (error) {
        console.error("获取权限列表失败:", error);
      }
    },
    handleAppClick(app) {
      if (app.isSecure) {
        console.warn('需授权', app.name);
      }
      // 测试阶段先全部放行
      this.activeAppId = app.id;
    },
    logout() {
      localStorage.removeItem('bamo_token');
      localStorage.removeItem('bamo_userId');
      localStorage.removeItem('bamo_userName');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.py-4 { padding-top: 10px !important; padding-bottom: 10px !important; }
.bamo-light-drawer { border-right: 1px solid #E5E7EB !important; }
.bamo-drawer-header {
  border-bottom: 1px solid #F3F4F6;
  /* 从白色平滑过渡到右侧的起始色 */
  background: linear-gradient(90deg, #ffffff 0%, #ebf1ff 100%);
  //border-bottom: 1px solid #F3F4F6;
  //background: linear-gradient(
  //    269deg, #ebf1ff 100%, #e5fbf8 56.18%, #f2ebfe 83.18%);
}
.tracking-tight { letter-spacing: -0.02em !important; }
.bamo-nav-item { border-radius: 8px !important; transition: all 0.2s ease; }
.bamo-nav-item:hover { background-color: #F3F4F6; }
.v-list-item--active.bamo-nav-item { background: linear-gradient(90deg, #ffffff 0%, #ebf1ff 100%)!important; }
.hover-danger:hover { background-color: #FEF2F2 !important; }
.bamo-status-chip { border: 1px solid rgba(16, 185, 129, 0.2); }
.pulse-dot {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  background-color: #10B981; box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.bamo-copyright {
  font-size: 12px;
  color: #94A3B8;
  user-select: none;
}

.bamo-copyright .opacity-70 {
  opacity: 0.9;
  transform: scale(0.9); /* 利用缩放实现比 12px 更小的原生字号 */
  transform-origin: center;
}
</style>