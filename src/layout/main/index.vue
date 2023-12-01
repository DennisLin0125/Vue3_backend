<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<script setup lang="ts">
import {watch,ref,nextTick} from "vue";
import useLayoutSettingStore from "@/store/modules/setting.ts";
let layoutSettingStore = useLayoutSettingStore()

// 控制當前組件是否銷毀
let flag = ref(true)
// 監聽數據
watch(()=>layoutSettingStore.reflash,()=>{
  // 點擊刷新按鈕,路由組件銷毀
  flag.value=false
  nextTick(()=>{
    flag.value=true
  })
})
</script>

<style scoped lang="scss">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
