<template>
  <div class="layout-container">
    <!--    左側菜單-->
    <div class="layout-slider">
      <logo></logo>
      <!--      滾動組件-->
      <el-scrollbar class="scrollbar">
        <!--       菜單組件 -->
        <el-menu background-color="#001529" text-color="white">
          <el-menu-item index="1">首頁</el-menu-item>
          <el-menu-item index="2">大數據</el-menu-item>
          <!--          摺疊式菜單-->
          <el-sub-menu index="3">
            <template #title>
              <span>權限管理</span>
            </template>
            <el-menu-item index="3-1">用戶管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜單管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    頂部導航-->
    <div class="layout-tabular">456</div>
    <!--    內容展示區-->
    <div class="layout-main">
      <p style="height: 10000px; color: red">我是一個p</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;

  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    color: white;
    background-color: $base-menu-background;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
  }

  .layout-tabular {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
  }

  .layout-main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
  }
}
</style>
