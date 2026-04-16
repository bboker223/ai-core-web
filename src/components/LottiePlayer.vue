<template>
  <div ref="lottieContainer" class="lottie-container" :style="{ width: width, height: height }"></div>
</template>

<script>
// 引入刚刚安装的播放器引擎
import lottie from 'lottie-web';

export default {
  name: 'LottiePlayer',
  props: {
    // 接收外部传进来的 json 动画数据
    animationData: {
      type: Object,
      required: true
    },
    // 控制动画宽度，默认 100%
    width: {
      type: String,
      default: '100%'
    },
    // 控制动画高度，默认 100%
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      animInstance: null // 用来保存动画实例
    }
  },
  mounted() {
    // 组件挂载后，初始化并播放动画
    this.animInstance = lottie.loadAnimation({
      container: this.$refs.lottieContainer, // 挂载到哪个 DOM 节点
      renderer: 'svg', // 使用 SVG 渲染，放大不失真
      loop: true,      // 循环播放
      autoplay: true,  // 自动播放
      animationData: this.animationData // 使用传进来的 json 数据
    });
  },
  beforeDestroy() {
    // 离开页面时销毁动画，防止内存泄漏，这是一个好习惯
    if (this.animInstance) {
      this.animInstance.destroy();
    }
  }
}
</script>

<style scoped>
/* 关键 1：使用 ::v-deep 穿透 Vue 的 scoped 隔离，
  因为 SVG 是被 Lottie 动态塞进页面的，直接写 CSS 选不到它。
*/
::v-deep .lottie-container svg path,
::v-deep .lottie-container svg rect,
::v-deep .lottie-container svg circle,
::v-deep .lottie-container svg polygon {

  /* 关键 2：强制所有填充色跟随当前容器的文字颜色 */
  fill: currentColor !important;

  /* 关键 3：如果你的动画是由线条组成的，还需要加上强制描边颜色 */
  stroke: currentColor !important;
}

/* 如果有些动画自带背景框，你想把它隐去，可以加这行（视情况使用）*/
/* ::v-deep .lottie-container svg { background: transparent !important; } */
</style>