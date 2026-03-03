<template>
  <v-app>
    <div v-if="!$store.state.isInitialized" >
      <v-skeleton-loader
          :color="`grey ${$vuetify.theme.dark  ? 'darken-2' : 'lighten-4'}`"
          height="100%"
          type="card@2"
      ></v-skeleton-loader>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import store from './store';
export default {
  name: 'App',
  inject: {},
  data: () => ({
    //
  }),
  created() {

  },
  methods:{
  }
};
</script>

<style>

:root {
  --v-font-body: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --v-font-heading: 'Roboto Condensed', 'Arial Narrow', sans-serif;
}

body {
  font-family: var(--v-font-body);
  font-weight: 400;
}

h1, h2, h3, .text-h4, .text-h5 {
  font-family: var(--v-font-heading);
  font-weight: 700;
}

.v-application {
  font-family: var(--v-font-body) !important; /* 覆盖Vuetify基础样式 */
}

</style>

<style>


/* 移除 v-app 的背景色，让背景透明 */
.v-application--wrap {
  background-color: transparent !important;
}
</style>