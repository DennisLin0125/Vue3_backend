<template>
  <div class="box5">
    <div class="title">
      <p>未來七天遊客數量趨勢圖</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Line',
}
</script>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let line = ref()
onMounted(() => {
  let mycharts = echarts.init(line.value)
  //設定配置項
  mycharts.setOption({
    //標題元件
    title: {
      text: '訪問量',
    },
    //x|y軸
    xAxis: {
      type: 'category',
      //兩側不留白
      boundaryGap: false,
      //分割線不要
      splitLine: {
        show: false,
      },
      data: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
      //軸線的設定
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //軸線的設定
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 0,
      right: 20,
      bottom: 20,
    },
    //系列
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 2299, 321, 890, 1200],
        //平滑曲線的設定
        smooth: true,
        //區域填滿樣式
        areaStyle: {
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
    ],
  })
})
</script>

<style scoped lang="scss">
.box5 {
  width: 100%;
  height: 100%;
  margin: 0 20px;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 10px;

    p {
      font-size: 20px;
      color: white;
    }
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>
