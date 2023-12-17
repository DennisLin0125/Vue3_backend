<template>
  <div class="box">
    <div class="top">
      <p class="tilte">即時遊客統計</p>
      <p class="bg"></p>
      <p class="right">
        可預約總人數
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tourist',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
let people = ref('216908人')
</script>

<style scoped lang="scss">
.box {
  margin-top: 10px;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;

  .top {
    margin-left: 20px;

    .tilte {
      font-size: 20px;
      color: white;
    }

    .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
    }

    .right {
      float: right;
      font-size: 20px;
      color: white;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    display: flex;
    padding: 10px;
    margin-top: 30px;

    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
      color: #29fcff;
      text-align: center;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .charts {
    width: 100%;
    height: 250px;
    background-color: red;
  }
}
</style>
