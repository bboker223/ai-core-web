<template>
  <v-app>
    <div class="top-gradient-bar"></div>

    <v-app-bar app color="white" elevate-on-scroll class="px-4">
      <v-toolbar-title class="font-weight-bold text-h5 primary--text">
        BAMO <span class="text--secondary text-subtitle-1">| 工业智能中枢</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="primary" size="40">
              <span class="white--text font-weight-bold">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-content>
              <v-list-item-title>退出登录</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container fluid class="fill-height pa-6">
        <router-view></router-view>
      </v-container>
    </v-main>

    <AuthDialog ref="authDialog" />
  </v-app>
</template>

<style scoped>
/* 灵魂设计：顶部的流光渐变条 */
.top-gradient-bar {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #1976D2 0%, #42A5F5 50%, #00BCD4 100%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>