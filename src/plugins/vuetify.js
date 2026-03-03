import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import '@mdi/font/css/materialdesignicons.css' // 确保本地引入

import zh from 'vuetify/lib/locale/zh-Hans' // 导入中文包
import en from 'vuetify/lib/locale/en' // 保留英文包

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zh, en },
    current: 'zh' // 设置默认语言为中文
  },
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  theme: {
    dark: false, // 默认亮色主题 true
    fonts: {
      body: {
        fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '16px',
        lineHeight: 1.5
      },
      heading: {
        fontFamily: '"Roboto Condensed", "Arial Narrow", sans-serif',
        fontWeight: 700
      }
    },
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#1565C0",
        secondary: "#d4dbde",
        accent: "#FFC107",
        error: "#F44336",
        background: "#F5F5F5",
        card:"#385f73",
        tag_fl: '#FFF176',
        ware:'#EF6C00',
        success: '#2aa734',
        price: '#ff8400',
      },
      dark: {
        primary: "#7E57C2",
        secondary: "#212121",
        accent: "#80DEEA",
        error: "#F44336",
        background: "#121212",
        card:"#385f73",
        tag_fl: '#F9A825',
        ware:'#FF9100',
        success: '#2a9131',
        price: '#F57F17',
      }
    }

  },
// ...其他配置保持不变...
  icons: {
    iconfont: 'mdiSvg', // 推荐使用Font Awesome SVG方式
  }
});
