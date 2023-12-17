<template>
  <div class="box6">
    <div class="title">
      <p>熱門景區排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 圖形圖示的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Rank',
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
  let myChart = echarts.init(charts.value)
  //設定配置項
  myChart.setOption({
    //標題元件
    title: {
      //主標題
      text: '景區排行',
      link: 'http://www.google.com',
      //標題的位置
      left: '50%',
      //主標題文字樣式
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20,
      },
      //子標題
      subtext: '各大景區排行',
      //子標題的樣式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 16,
      },
    },
    //x|y軸組件
    xAxis: {
      type: 'category', //圖形圖示在x軸均勻分佈展示
    },
    yAxis: {},
    //佈局元件
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    //系列:決定顯示圖形圖示是哪一種的
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        //長條圖的:圖形上的文字標籤，
        label: {
          show: true,
          //文字的位置
          position: 'insideTop',
          //文字顏色
          color: 'yellowgreen',
        },
        //是否顯示背景顏色
        showBackground: true,
        backgroundStyle: {
          //底部背景的顏色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'black', // 0% 處的顏色
              },
              {
                offset: 1,
                color: 'blue', // 100% 處的顏色
              },
            ],
            global: false, // 預設為 false
          },
        },
        //柱條的樣式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          //柱條顏色
          color: function (data: any) {
            //給每一個柱條這是背景顏色
            let arr = [
              'red',
              'orange',
              'yellowgreen',
              'green',
              'purple',
              'hotpink',
              'skyblue',
            ]
            return arr[data.dataIndex]
          },
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true, //平滑曲線
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  })
})
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  margin: 20px 0;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 5px;

    p {
      font-size: 20px;
      color: white;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
