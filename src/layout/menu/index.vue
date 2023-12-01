<template>
  <template v-for="item in menuList" :key="item.path">
    <!--    沒有子路由-->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!--    只有1個子路由-->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
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
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--      使用遞歸組件-->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'

//接收父組件傳來的路由數組
defineProps(['menuList'])
let $router = useRouter()
// 點擊菜單的回調函數
const goRoute = (vc: any) => {
  // 路由跳轉
  $router.push(vc.index)
}
</script>

<style scoped lang="scss"></style>
