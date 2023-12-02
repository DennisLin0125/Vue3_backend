<template>
  <div>
    <h1>home</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
}
</script>
<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()

onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped lang="scss"></style>
