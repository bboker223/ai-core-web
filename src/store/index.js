import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isInitialized: false,
    token: localStorage.getItem("token") || null,
    isBanned: false,
    userInfos: {},
    sysConfig: {},
    apiSecretKey: '',
  },
  actions:{
    // 异步获取密钥
    async fetchApiKey({ commit }) {
      // 从localStorage获取token
      const token = localStorage.getItem('token');
      if (!token) {
        return false; // 没有token，无法获取密钥
      }
      try {
        // 假设你的Axios实例配置了Authorization头
        const sendUrl = this.$url.baseUrl + '/duennc2d';
        const reqMap = { token: token };
        const res = await this.$axios.post(sendUrl, reqMap);
        if (res.status !== 'fail') {
          commit('setApiSecretKey', res.key);
          commit('setInitialized', true);
        } else {
          localStorage.removeItem('token');
          commit('removeToken');
          commit('setInitialized', true);
          return false; // 失败，返回 false
        }
      } catch (error) {
        localStorage.removeItem('token');
        commit('removeToken');
        commit('setInitialized', true);
        return false; // 失败，返回 false
      }
      commit('setInitialized', true); // 确保在所有异步操作完成后设置状态
    },


  },
  mutations:{
    // 设置token
    setToken(state, token) {
      localStorage.setItem("token", token);
      state.token = token
    },
    // 退出登录清空token
    removeToken(state) {
      localStorage.removeItem("token");
      state.token = null
    },

    setSysConfig(state, data ){
      state.sysConfig = data
    },
    // 设置用户信息 getUserMessage
    setUserInfo(state, data) {
      state.userInfos = data
    },

    setApiSecretKey(state, key) {
      state.apiSecretKey = key;
    },

    setInitialized(state, status) { // 设置初始化状态的 mutation
      state.isInitialized = status;
    },
    setIsBanned(state, isBanned) {
      state.isBanned = isBanned;
    },
  },
  getters : {
    getUserInfo(state){
      return state.userInfos;
    },
    getSysConfig(state){
      return state.sysConfig;
    },
    getIsInitialized(state){
      return state.isInitialized;
    },

    // 添加一个 getter 来获取被封禁状态
    isUserBanned: state => state.isBanned,
    isUserLoggedIn: state => !!state.token,

  }
})
