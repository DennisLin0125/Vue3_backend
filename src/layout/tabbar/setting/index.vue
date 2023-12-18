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
  <el-popover placement="bottom" title="主題設置" :width="300" trigger="hover">
    <!--    表單元素-->
    <el-form>
      <el-form-item label="顏色">
        <el-color-picker
          size="small"
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          size="default"
          active-icon="MoonNight"
          inactive-icon="Sunny"
          inline-prompt
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>

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
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user.ts'
import { ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()

let userStore = useUserStore()

let $router = useRouter()
let $route = useRoute()

let dark = ref<boolean>(false)

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

const color = ref('rgba(255, 69, 0, 0.68)')

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style scoped lang="scss"></style>
