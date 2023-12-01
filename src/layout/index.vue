<template>
  <div class="layout-container">
    <!--    左側菜單-->
    <div class="layout-slider" :class="{ fold: !!layoutSettingStore.fold }">
      <logo></logo>
      <!--      滾動組件-->
      <el-scrollbar class="scrollbar">
        <!--       菜單組件 -->
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          :collapse="!!layoutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    頂部導航-->
    <div class="layout-tabular" :class="{ fold: !!layoutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!--    內容展示區-->
    <div class="layout-main" :class="{ fold: !!layoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'

import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()

import useLayoutSettingStore from '@/store/modules/setting.ts'
let layoutSettingStore = useLayoutSettingStore()

// 獲取路由對象
import { useRoute } from 'vue-router'
let $route = useRoute()
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
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout-tabular {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }

  .layout-main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
