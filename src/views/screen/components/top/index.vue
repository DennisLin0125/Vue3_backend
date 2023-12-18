<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首頁</span>
    </div>
    <div class="center">
      <div class="title">智慧旅遊數據可視化大數據展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">統計報告</span>
      <span class="time">當前時間:{{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Top',
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'
// 儲存當前時間
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timeId = ref(0)
let $router = useRouter()

onMounted(() => {
  timeId.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})

onBeforeUnmount(() => clearInterval(timeId.value))
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.top {
  display: flex;
  width: 100%;
  height: 40px;

  .left {
    flex: 1.5;
    background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;

    .lbtn {
      float: right;
      width: 150px;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      color: #29fcff;
      text-align: center;
      background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: 100% 100%;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .right {
    display: flex;
    flex: 1.5;
    align-items: center;
    justify-content: space-between;
    background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: 100% 100%;

    .rbtn {
      width: 150px;
      height: 40px;
      font-size: 20px;
      line-height: 40px;
      color: #29fcff;
      text-align: center;
      background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: 100% 100%;
    }

    .time {
      margin-right: 10px;
      font-size: 20px;
      color: #29fcff;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      font-size: 30px;
      line-height: 74px;
      color: #29fcff;
      text-align: center;
      background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
