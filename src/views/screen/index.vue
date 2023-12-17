<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">左側</div>
        <div class="center">中間</div>
        <div class="right">右側</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Screen',
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/top/index.vue'
let screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .right {
        flex: 1;
      }

      .left {
        flex: 1;
      }

      .center {
        flex: 2;
      }
    }
  }
}
</style>
