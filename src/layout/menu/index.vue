<template>
  <template v-for="item in menuList" :key="item.path">
    <!--    沒有子路由-->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden">
        <template #title>
          <span>圖&nbsp;</span>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--    只有1個子路由-->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <template #title>
          <span>圖&nbsp;</span>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--    子路由個數大於1-->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--      使用遞歸組件-->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
//接收父組件傳來的路由數組
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped lang="scss"></style>
