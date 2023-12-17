<template>
  <div class="box8">
    <div class="title">
      <p>數據統計</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Counter',
}
</script>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
//取得DOM節點
let charts = ref()
//元件掛載完畢
onMounted(() => {
  //一個容器可以同時展示多種類型的圖形圖標
  let mychart = echarts.init(charts.value)
  let option = {
    title: {
      text: '遊客消費統計',
      textStyle: {
        color: 'white',
      },
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消費', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出遊', max: 30000 },
        { name: '點心', max: 38000 },
        { name: '嗜好', max: 52000 },
        { name: '景點', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '購物',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '吃',
          },
        ],
      },
    ],
  }
  //設定配置項
  mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box8 {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    p {
      font-size: 18px;
      color: white;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
