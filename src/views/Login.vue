<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="7" lg="8" class="d-none d-md-flex position-relative bamo-login-left">
        <v-img
            src="@/assets/images/p3.png"
            height="100%"
            width="100%"
            cover
            class="bamo-hero-img"
        >
          <div class="overlay-gradient fill-height d-flex flex-column justify-center px-16">
            <h1 class="text-h2 font-weight-black white--text mb-4 tracking-tight">巴莫科技</h1>
            <h2 class="text-h4 font-weight-medium white--text mb-6">工业AI智能体中枢平台</h2>
          </div>
        </v-img>
      </v-col>

      <v-col cols="12" md="5" lg="4" class="login-bg d-flex align-center justify-center pa-8">
        <v-card class="elevation-0 transparent-card" width="100%" max-width="420">
          <div class="text-center mb-10">
            <div class="logo-placeholder mx-auto mb-8 d-flex align-center justify-center">
              <v-img
                  src="@/assets/images/hb-logo_2.png"
                  height="100%"
                  width="100%"
                  cover
              ></v-img>
            </div>
            <h3 class="text-h5 font-weight-bold grey--text text--darken-4 mb-2">统一身份认证</h3>
            <div class="text-subtitle-2 grey--text">权限问题请联系管理员</div>
          </div>

          <v-form @submit.prevent="handleLogin" ref="form">
            <v-text-field
                v-model="username"
                label="工号 / iMES账号"
                outlined
                height="48"
                color="primary"
                prepend-inner-icon="mdi-account-outline"
                class="mb-3 auth-input"
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="密码"
                type="password"
                outlined
                height="48"
                color="primary"
                prepend-inner-icon="mdi-shield-key-outline"
                class="mb-6 auth-input"
            ></v-text-field>

            <v-btn
                type="submit"
                block
                color="#0F172A"
                dark
                height="52"
                elevation="2"
                class="font-weight-bold text-subtitle-1 auth-btn"
            >
              登录进入工作台
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    handleLogin() {
      // 触发全局加载条
      this.$root.globalLoading = true;
      setTimeout(() => {
        localStorage.setItem('bamo_token', 'mock_token_123');
        this.$root.globalLoading = false;
        this.$router.push('/portal');
      }, 800); // 模拟网络延迟
    }
  }
}
</script>

<style scoped>
/* 左侧暗色流光遮罩层，提升高级感 */
.overlay-gradient {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 75%);
}
.tracking-tight {
  letter-spacing: -0.02em !important;
}

/* 新增核心防溢出控制 */
.login-wrapper {
  height: 100vh !important;
  max-height: 100vh;
  overflow: hidden; /* 绝对截断滚动条 */
}
.bamo-login-left {
  height: 100vh; /* 强制左侧列与视口等高 */
}


/* 右侧点阵背景保留 */
.login-bg {
  background: #F8FAFC;
  background-image: radial-gradient(#CBD5E1 1px, transparent 1px);
  background-size: 24px 24px;
}
.transparent-card {
  background-color: transparent !important;
}

/* Logo 占位框 */
.logo-placeholder {
  width: 281px;
  height: 52px;
  border-radius: 4px;
}

/* 工业级输入框与按钮质感 */
.auth-input ::v-deep .v-input__slot {
  background-color: #FFFFFF !important;
  border-color: #E2E8F0 !important;
}
.auth-btn {
  transition: all 0.3s ease;
}
.auth-btn:hover {
  background-color: #1E293B !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15) !important;
}
</style>