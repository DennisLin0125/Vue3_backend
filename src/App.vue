<template>
  <div>
    <h1>測試axios</h1>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request.ts'
import { onMounted } from 'vue'

onMounted(async () => {
  let result = await request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111',
    },
  })
  console.log(result)
})
</script>

<style scoped lang="scss">
div {
  h1 {
    color: $base-menu-background;
  }
}
</style>
