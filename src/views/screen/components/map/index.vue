<template>
  <div class="box4" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

import chinaJSON from './china.json'

let map = ref()
echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
  let myChart = echarts.init(map.value)
  //設定配置項
  myChart.setOption({
    //地圖元件
    geo: {
      map: 'china', //中國地圖
      roam: true, //滑鼠縮放的效果
      //地圖的位置偵錯
      left: 150,
      top: 150,
      right: 150,
      zoom: 1.2,
      bottom: 0,
      //地圖上的文字的設置
      label: {
        show: true, //文字顯示出來
        color: 'white',
        fontSize: 14,
      },

      itemStyle: {
        //每一個多邊形的樣式
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
        opacity: 0.8,
      },
      //地圖高亮的效果
      emphasis: {
        itemStyle: {
          color: 'red',
        },
        label: {
          fontSize: 40,
        },
      },
    },
    //佈局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航線的系列
        data: [
          {
            coords: [
              [91.132212, 29.660361], // 起點
              [87.617733, 43.792818], // 終點
            ],
            // 統一的樣式設定
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起點
              [119.306239, 26.075302], // 終點
            ],
            // 統一的樣式設定
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起點
              [114.298572, 30.584355], // 終點
            ],
            // 統一的樣式設定
            lineStyle: {
              color: 'yellow',
              width: 5,
            },
          },
        ],
        //開啟動畫特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10,
        },
      },
    ],
  })
})
</script>

<script lang="ts">
export default {
  name: 'Map',
}
</script>

<style scoped lang="scss"></style>
