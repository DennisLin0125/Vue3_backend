<template>
  <div class="box10">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <button @click="goHome">首頁</button>
  </div>
</template>

<script lang="ts">
export default {
  name: '404',
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'

let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.box10 {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: yellowgreen;

  img {
    width: 800px;
    height: 400px;
  }

  button {
    width: 80px;
    height: 40px;
    color: white;
    background-color: #001529;
    border-radius: 30%;
  }
}
</style>
