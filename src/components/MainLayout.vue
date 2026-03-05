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
        <div class="px-4 pb-6">
          <v-chip small color="green lighten-5" text-color="green darken-2" class="font-weight-medium w-100 justify-center bamo-status-chip">
            <span class="pulse-dot mr-2"></span>Online
          </v-chip>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="flex-grow-1 pa-0" style="height: 100vh; overflow: hidden; background-color: #FFFFFF;">
      <AIPortal v-if="activeAppId" :appId="activeAppId" :appUrl="currentAppUrl" />
      <EmptyState v-else />
    </v-main>
  </div>
</template>
<script>

import EmptyState from '@/components/EmptyState.vue';
import AIPortal from "../views/AIPortal.vue"; // 我们马上写这个组件

export default {
  name: 'MainLayout',
  components: { AIPortal, EmptyState },
  data() {
    return {
      activeAppId: null,
      appList: []        // 真实的数据列表
    }
  },
  created() {
    this.fetchAppList();
  },
  computed: {
    currentAppUrl() {
      const app = this.appList.find(a => a.id === this.activeAppId);
      // 动态拼接 MaxKB URL
      return app ? `http://192.168.8.141:8080/chat/${app.chatToken}` : '';
    }
  },
  methods: {

    async fetchAppList() {
      try {
        const userId = localStorage.getItem('bamo_userId');

        // 这里需要配置你的 token 头传递方式，通常在 axios 拦截器里做，这里演示直接传
        const res = await this.$axios.get(`${this.$url.baseUrl}/api/portal/app/list?userId=${userId}`);
        console.log(res);
        // 将后端驼峰字段映射到前端
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
        console.warn('【安全熔断】需前置 AuthDialog 提权授权', app.name);
      } else {
        this.activeAppId = app.id; // 点击后才触发右侧 iframe 渲染
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