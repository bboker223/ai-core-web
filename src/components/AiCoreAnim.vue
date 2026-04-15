<template>
  <div class="ai-brain-container">
    <svg viewBox="0 0 440 360" xmlns="http://www.w3.org/2000/svg" class="ai-brain-svg">

      <!-- ===== 中央脊柱 ===== -->
      <line x1="220" y1="65" x2="220" y2="295" stroke="#60a5fa" stroke-width="2.5" class="spine"/>

      <!-- ===== 中央芯片 ===== -->
      <rect x="202" y="158" width="36" height="50" rx="4"
            fill="none" stroke="#60a5fa" stroke-width="2" class="chip-outer"/>
      <rect x="209" y="165" width="22" height="36" rx="2"
            fill="none" stroke="#93c5fd" stroke-width="1.2" class="chip-inner"/>
      <!-- 左引脚 -->
      <line x1="202" y1="169" x2="193" y2="169" stroke="#60a5fa" stroke-width="2"/>
      <line x1="202" y1="177" x2="193" y2="177" stroke="#60a5fa" stroke-width="2"/>
      <line x1="202" y1="185" x2="193" y2="185" stroke="#60a5fa" stroke-width="2"/>
      <line x1="202" y1="193" x2="193" y2="193" stroke="#60a5fa" stroke-width="2"/>
      <line x1="202" y1="201" x2="193" y2="201" stroke="#60a5fa" stroke-width="2"/>
      <!-- 右引脚 -->
      <line x1="238" y1="169" x2="247" y2="169" stroke="#60a5fa" stroke-width="2"/>
      <line x1="238" y1="177" x2="247" y2="177" stroke="#60a5fa" stroke-width="2"/>
      <line x1="238" y1="185" x2="247" y2="185" stroke="#60a5fa" stroke-width="2"/>
      <line x1="238" y1="193" x2="247" y2="193" stroke="#60a5fa" stroke-width="2"/>
      <line x1="238" y1="201" x2="247" y2="201" stroke="#60a5fa" stroke-width="2"/>

      <!-- ===== 左侧电路板 (base + pulse 分层) ===== -->

      <!-- Trace A：顶部折线 -->
      <path d="M 202,103 L 158,103 L 158,78 L 94,78"
            fill="none" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <path d="M 202,103 L 158,103 L 158,78 L 94,78"
            fill="none" stroke="#93c5fd" stroke-width="2.5"
            pathLength="100" stroke-dasharray="8 100" class="pulse pA"/>
      <circle cx="94" cy="78" r="7.5" fill="none" stroke="#60a5fa" stroke-width="2" class="node nA"/>

      <!-- Trace B：点划线样式 -->
      <path d="M 202,123 L 152,123" fill="none" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <line x1="142" y1="123" x2="130" y2="123" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <line x1="120" y1="123" x2="108" y2="123" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <path d="M 202,123 L 94,123"
            fill="none" stroke="#93c5fd" stroke-width="2.5"
            pathLength="100" stroke-dasharray="8 100" class="pulse pB"/>
      <circle cx="84" cy="123" r="7.5" fill="none" stroke="#60a5fa" stroke-width="2" class="node nB"/>

      <!-- Trace C：折线 + 实心节点 -->
      <path d="M 202,143 L 162,143 L 162,132 L 112,132"
            fill="none" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <path d="M 202,143 L 162,143 L 162,132 L 112,132"
            fill="none" stroke="#93c5fd" stroke-width="2.5"
            pathLength="100" stroke-dasharray="8 100" class="pulse pC"/>
      <circle cx="112" cy="132" r="5" fill="#60a5fa" class="dot dC"/>

      <!-- Trace D：下方折线 -->
      <path d="M 202,223 L 160,223 L 160,245 L 98,245"
            fill="none" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <path d="M 202,223 L 160,223 L 160,245 L 98,245"
            fill="none" stroke="#93c5fd" stroke-width="2.5"
            pathLength="100" stroke-dasharray="8 100" class="pulse pD"/>
      <circle cx="98" cy="245" r="7.5" fill="none" stroke="#60a5fa" stroke-width="2" class="node nD"/>

      <!-- Trace E：点划线样式 -->
      <path d="M 202,248 L 152,248" fill="none" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <line x1="142" y1="248" x2="130" y2="248" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <line x1="120" y1="248" x2="108" y2="248" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <path d="M 202,248 L 94,248"
            fill="none" stroke="#93c5fd" stroke-width="2.5"
            pathLength="100" stroke-dasharray="8 100" class="pulse pE"/>
      <circle cx="84" cy="248" r="7.5" fill="none" stroke="#60a5fa" stroke-width="2" class="node nE"/>

      <!-- Trace F：折线 + 实心节点 -->
      <path d="M 202,270 L 162,270 L 162,285 L 112,285"
            fill="none" stroke="#1e3a8a" stroke-width="2" opacity="0.5"/>
      <path d="M 202,270 L 162,270 L 162,285 L 112,285"
            fill="none" stroke="#93c5fd" stroke-width="2.5"
            pathLength="100" stroke-dasharray="8 100" class="pulse pF"/>
      <circle cx="112" cy="285" r="5" fill="#60a5fa" class="dot dF"/>

      <!-- Branch G：顶部延伸分支 -->
      <path d="M 158,78 L 158,52 L 62,52"
            fill="none" stroke="#1e3a8a" stroke-width="1.5" opacity="0.4"/>
      <path d="M 158,78 L 158,52 L 62,52"
            fill="none" stroke="#93c5fd" stroke-width="2"
            pathLength="100" stroke-dasharray="8 100" class="pulse pG"/>
      <circle cx="62" cy="52" r="6.5" fill="none" stroke="#3b82f6" stroke-width="1.5" class="node nG"/>

      <!-- Branch H：底部延伸分支 -->
      <path d="M 160,245 L 160,300 L 65,300"
            fill="none" stroke="#1e3a8a" stroke-width="1.5" opacity="0.4"/>
      <path d="M 160,245 L 160,300 L 65,300"
            fill="none" stroke="#93c5fd" stroke-width="2"
            pathLength="100" stroke-dasharray="8 100" class="pulse pH"/>
      <circle cx="65" cy="300" r="6.5" fill="none" stroke="#3b82f6" stroke-width="1.5" class="node nH"/>

      <!-- ===== 右侧大脑 ===== -->

      <!-- 主轮廓 (描绘动画) -->
      <path d="M 220,78 C 238,62 274,58 306,74 C 338,90 360,122 362,156
               C 374,176 370,208 353,226 C 372,244 367,276 344,290
               C 317,306 274,306 248,290 L 236,282 L 220,278"
            fill="none" stroke="#60a5fa" stroke-width="2.5"
            pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"
            class="brain-outline"/>

      <!-- 顶部连接弧 -->
      <path d="M 220,78 C 228,65 234,70 236,80"
            fill="none" stroke="#60a5fa" stroke-width="2.5"/>
      <!-- 底部连接弧 -->
      <path d="M 220,278 C 228,292 234,286 236,278"
            fill="none" stroke="#60a5fa" stroke-width="2.5"/>

      <!-- 脑回褶皱 (依次描绘) -->
      <path d="M 296,72 C 325,60 352,82 354,110"
            fill="none" stroke="#60a5fa" stroke-width="2"
            pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"
            class="brain-fold bf1"/>
      <path d="M 355,136 C 372,156 370,184 353,198"
            fill="none" stroke="#60a5fa" stroke-width="2"
            pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"
            class="brain-fold bf2"/>
      <path d="M 347,224 C 365,244 358,270 336,282"
            fill="none" stroke="#60a5fa" stroke-width="2"
            pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"
            class="brain-fold bf3"/>
      <path d="M 256,68 C 275,56 298,64 302,82"
            fill="none" stroke="#60a5fa" stroke-width="1.8"
            pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"
            class="brain-fold bf4"/>
      <path d="M 238,82 C 255,70 272,80 274,96"
            fill="none" stroke="#60a5fa" stroke-width="1.5"
            pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"
            class="brain-fold bf5"/>

      <!-- 突触节点 -->
      <circle cx="278" cy="148" r="3"   fill="#93c5fd" class="syn sy1"/>
      <circle cx="316" cy="135" r="2.5" fill="#93c5fd" class="syn sy2"/>
      <circle cx="346" cy="164" r="3"   fill="#93c5fd" class="syn sy3"/>
      <circle cx="312" cy="190" r="2.5" fill="#93c5fd" class="syn sy4"/>
      <circle cx="272" cy="207" r="3"   fill="#93c5fd" class="syn sy5"/>
      <circle cx="316" cy="222" r="2.5" fill="#93c5fd" class="syn sy6"/>
      <circle cx="340" cy="246" r="2"   fill="#93c5fd" class="syn sy7"/>
      <circle cx="295" cy="258" r="2.5" fill="#93c5fd" class="syn sy8"/>
      <circle cx="250" cy="152" r="2"   fill="#93c5fd" class="syn sy9"/>

      <!-- 突触连接线 -->
      <line x1="278" y1="148" x2="316" y2="135" stroke="#3b82f6" stroke-width="1" class="syn-l sl1"/>
      <line x1="316" y1="135" x2="346" y2="164" stroke="#3b82f6" stroke-width="1" class="syn-l sl2"/>
      <line x1="346" y1="164" x2="312" y2="190" stroke="#3b82f6" stroke-width="1" class="syn-l sl3"/>
      <line x1="312" y1="190" x2="272" y2="207" stroke="#3b82f6" stroke-width="1" class="syn-l sl4"/>
      <line x1="272" y1="207" x2="316" y2="222" stroke="#3b82f6" stroke-width="1" class="syn-l sl5"/>
      <line x1="316" y1="222" x2="340" y2="246" stroke="#3b82f6" stroke-width="1" class="syn-l sl6"/>
      <line x1="340" y1="246" x2="295" y2="258" stroke="#3b82f6" stroke-width="1" class="syn-l sl7"/>
      <line x1="278" y1="148" x2="250" y2="152" stroke="#3b82f6" stroke-width="1" class="syn-l sl8"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'AiCoreAnim'
}
</script>

<style scoped>
.ai-brain-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ai-brain-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* ===== 脊柱 ===== */
.spine {
  animation: spineGlow 3s ease-in-out infinite alternate;
}

/* ===== 芯片 ===== */
.chip-outer { animation: chipGlow 2.5s ease-in-out infinite alternate; }
.chip-inner { animation: chipInnerGlow 2.5s ease-in-out infinite alternate; }

/* ===== 数据脉冲 ===== */
/* pathLength="100" 已归一化路径长度
   stroke-dasharray: "8 100" → 8单位亮段 + 100单位间隙
   dashoffset: 8 → -100，亮段从路径入口穿越至出口 */
.pulse { animation: pulseTravel linear infinite; }

.pA { animation-duration: 2.8s; animation-delay: 0.0s; }
.pB { animation-duration: 2.4s; animation-delay: 0.5s; }
.pC { animation-duration: 3.0s; animation-delay: 0.9s; }
.pD { animation-duration: 2.6s; animation-delay: 0.3s; }
.pE { animation-duration: 2.2s; animation-delay: 0.7s; }
.pF { animation-duration: 3.2s; animation-delay: 1.1s; }
.pG { animation-duration: 3.8s; animation-delay: 1.6s; }
.pH { animation-duration: 3.6s; animation-delay: 0.4s; }

/* ===== 节点 ===== */
.node {
  transform-box: fill-box;
  transform-origin: center;
  animation: nodeBlink 2.2s ease-in-out infinite;
}
.nA { animation-delay: 0.0s; }
.nB { animation-delay: 0.5s; }
.nD { animation-delay: 0.3s; }
.nE { animation-delay: 0.8s; }
.nG { animation-delay: 1.3s; }
.nH { animation-delay: 0.7s; }

.dot {
  transform-box: fill-box;
  transform-origin: center;
  animation: dotBlink 2.2s ease-in-out infinite;
}
.dC { animation-delay: 0.4s; }
.dF { animation-delay: 1.0s; }

/* ===== 大脑轮廓 ===== */
.brain-outline {
  animation: drawBrain 2.5s ease-out forwards,
             brainBreath 4s ease-in-out 2.5s infinite alternate;
}

/* 脑回褶皱依次描绘，animation-fill-mode: both 确保延迟期间保持隐藏 */
.brain-fold {
  animation: drawFold ease-out both;
}
.bf1 { animation-duration: 0.7s; animation-delay: 1.2s; }
.bf2 { animation-duration: 0.6s; animation-delay: 1.7s; }
.bf3 { animation-duration: 0.6s; animation-delay: 2.0s; }
.bf4 { animation-duration: 0.5s; animation-delay: 2.3s; }
.bf5 { animation-duration: 0.5s; animation-delay: 2.6s; }

/* ===== 突触 ===== */
.syn {
  transform-box: fill-box;
  transform-origin: center;
  animation: synFire 2.0s ease-in-out infinite;
}
.sy1 { animation-delay: 0.00s; }
.sy2 { animation-delay: 0.22s; }
.sy3 { animation-delay: 0.44s; }
.sy4 { animation-delay: 0.66s; }
.sy5 { animation-delay: 0.88s; }
.sy6 { animation-delay: 1.10s; }
.sy7 { animation-delay: 1.32s; }
.sy8 { animation-delay: 1.54s; }
.sy9 { animation-delay: 0.35s; }

.syn-l { animation: synLinkFlash 2.5s ease-in-out infinite; }
.sl1 { animation-delay: 0.00s; }
.sl2 { animation-delay: 0.30s; }
.sl3 { animation-delay: 0.60s; }
.sl4 { animation-delay: 0.90s; }
.sl5 { animation-delay: 1.20s; }
.sl6 { animation-delay: 1.50s; }
.sl7 { animation-delay: 1.80s; }
.sl8 { animation-delay: 0.15s; }

/* ===== 关键帧 ===== */

@keyframes pulseTravel {
  from { stroke-dashoffset:  8; }
  to   { stroke-dashoffset: -100; }
}

@keyframes spineGlow {
  from { stroke: #2563eb; opacity: 0.7; }
  to   { stroke: #93c5fd; opacity: 1; filter: drop-shadow(0 0 4px #60a5fa); }
}

@keyframes chipGlow {
  from { stroke: #2563eb; }
  to   { stroke: #93c5fd; filter: drop-shadow(0 0 10px #3b82f6); }
}

@keyframes chipInnerGlow {
  from { stroke: #3b82f6; opacity: 0.5; }
  to   { stroke: #dbeafe; opacity: 1; }
}

@keyframes nodeBlink {
  0%, 100% { stroke: #3b82f6; stroke-width: 2;   opacity: 0.5; }
  50%       { stroke: #bfdbfe; stroke-width: 2.5; opacity: 1;
              filter: drop-shadow(0 0 6px #60a5fa); }
}

@keyframes dotBlink {
  0%, 100% { opacity: 0.4; transform: scale(0.8); fill: #2563eb; }
  50%       { opacity: 1;   transform: scale(1.8); fill: #bfdbfe;
              filter: drop-shadow(0 0 5px #93c5fd); }
}

@keyframes drawBrain {
  from { stroke-dashoffset: 100; opacity: 0.2; }
  to   { stroke-dashoffset: 0;   opacity: 1; }
}

@keyframes brainBreath {
  from { stroke: #60a5fa; }
  to   { stroke: #93c5fd; filter: drop-shadow(0 0 7px #3b82f6); }
}

@keyframes drawFold {
  from { stroke-dashoffset: 100; opacity: 0; }
  to   { stroke-dashoffset: 0;   opacity: 0.8; }
}

@keyframes synFire {
  0%, 100% { opacity: 0.2; transform: scale(1);   fill: #60a5fa; }
  50%       { opacity: 1;   transform: scale(2.4); fill: #ffffff;
              filter: drop-shadow(0 0 5px #bfdbfe); }
}

@keyframes synLinkFlash {
  0%, 100% { opacity: 0.07; stroke: #3b82f6; }
  50%       { opacity: 0.65; stroke: #93c5fd; }
}
</style>