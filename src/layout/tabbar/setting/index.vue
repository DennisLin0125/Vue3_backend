<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateReflash"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    alt="logo"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登入</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting.ts'
let layoutSettingStore = useLayoutSettingStore()

import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()

import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()

const updateReflash = () => {
  layoutSettingStore.reflash = !layoutSettingStore.reflash
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  try {
    await userStore.userLogout()
    await $router.push({
      path: '/login',
      query: {
        redirect: $route.path,
      },
    })
  } catch (e) {
    alert('退出登入失敗')
  }
}
</script>

<style scoped lang="scss"></style>
