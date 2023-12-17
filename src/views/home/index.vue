<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好呀!!{{ userStore.username }}</h3>
        <p class="subTitle">後台管理平台</p>
      </div>
    </div>
  </el-card>
  <div class="svgBottom">
    <svg-icon name="welcome" width="600px" height="300px" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
}
</script>
<script setup lang="ts">
import useUserStore from '@/store/modules/user.ts'
import { getTime } from '@/utils/time.ts'

let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      margin-bottom: 30px;
      font-size: 30px;
      font-weight: 900;
    }

    .subTitle {
      font-style: italic;
      color: silver;
    }
  }
}

.svgBottom {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
