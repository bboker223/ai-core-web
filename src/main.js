import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import axios from './ser/index'
import url from './ser/api';


// MD
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// 引入主题的 CSS 文件
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
Vue.use(VMdPreview);


Vue.prototype.$url = url;
Vue.prototype.$axios = axios;

Vue.config.devtools = false

new Vue({
  router,
  store,
  vuetify,
  data() {
    return {
      // 核心黑盒：全局防闪烁与流光条调度状态
      globalLoading: false
    }
  },
  render: h => h(App)
}).$mount('#app')


// 使用 setTimeout 来确保 Vue 渲染完成后再移除，效果更平滑
window.addEventListener('load', () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.classList.add('hidden');
    // 在过渡动画完成后彻底移除 DOM 元素
    spinner.addEventListener('transitionend', () => {
      spinner.remove();
    });
  }
});