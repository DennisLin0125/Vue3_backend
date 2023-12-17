<template>
  <div class="box7">
    <div class="title">
      <p>年度遊客量比較</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Year',
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
  //設定配置項
  mychart.setOption({
    title: {
      text: '散點圖',
      left: '40%',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 20,
      top: 20,
      right: 0,
      bottom: 20,
    },
    series: {
      type: 'scatter',
      data: [
        33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313,
        123, 5, 657, 7,
      ],
      //標記圖形設定
      symbol: 'diamond',
      symbolSize: 16,
      //圖文標籤
      label: {
        show: true,
        position: 'top',
        color: 'red',
      },
      //散點圖標記的顏色
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // 0% 處的顏色
            },
            {
              offset: 1,
              color: 'blue', // 100% 處的顏色
            },
          ],
          global: false, // 預設為 false
        },
      },
    },
  })
})
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: 100%;
  margin: 20px 0;
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
