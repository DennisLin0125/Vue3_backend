<template>
  <div class="logo" v-if="setting.isShowLogo">
    <img :src="setting.logo" alt="logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<script setup lang="ts">
//引入設置標題的文件
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  width: 100%;
  height: $base-menu-logo-height;
  padding: 10px;
  color: white;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    margin-left: 10px;
    font-size: $base-logo-title-font-size;
  }
}
</style>
