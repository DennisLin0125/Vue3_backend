<template>
  <!--      頂部左側靜態-->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!--      左側麵包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>權限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting.ts'
let layoutSettingStore = useLayoutSettingStore()
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<style scoped lang="scss"></style>
