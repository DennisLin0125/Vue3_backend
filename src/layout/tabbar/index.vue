<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<script setup lang="ts">
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import Setting from '@/layout/tabbar/setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  // background-image: linear-gradient(
  //  to right,
  //  rgb(232 223 223),
  //  rgb(201 178 178),
  //  rgb(232 223 223)
  // );

  .tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
