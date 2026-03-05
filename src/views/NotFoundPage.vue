<template>
  <v-container fill-height class="justify-center align-center text-center">
    <div>
      <v-icon size="100" color="grey lighten-1" class="mb-6">mdi-robot-dead-outline</v-icon>
      <h1 class="text-h3 font-weight-bold grey--text text--darken-2 mb-2">404</h1>
      <p class="text-subtitle-1 grey--text text--darken-1 mb-8">
        信号丢失。请求的分析域或视图不存在。
      </p>
      <v-btn color="primary" outlined to="/" exact>
        <v-icon left>mdi-arrow-left</v-icon> 返回工作台
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>