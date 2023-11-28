<template>
  <div class="login_container">
    <el-row :gutter="10">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>歡迎來到後台管理系統</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登入
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入小倉庫
import useUserStore from '@/store/modules/user.ts'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入獲取當前時間的函數
import { getTime } from '@/utils/time.ts'
// 獲取路由器
let $router = useRouter()
let userStore = useUserStore()
// 收集表單數據
let loginForm = reactive({ username: 'admin', password: '111111' })
// 定義變量loading效果
let loading = ref(false)
// 獲取表單元素
let loginForms = ref()
// 登入按鈕回調
const login = async () => {
  await loginForms.value.validate()
  // 加載效果
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    await $router.push('/')
    ElNotification({
      type: 'success',
      message: '歡迎回來^^',
      title: `Hi,${getTime()}好`,
    })
    loading.value = false
  } catch (err: any) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: err.message as Error,
    })
  }
}
// 自訂義校驗規則方法
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('帳號長度為5-10位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (/^\d{6,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('密碼長度為6-10位'))
  }
}
// 表單較驗物件
const rules = {
  username: [
    {
      validator: validatorUserName,
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: validatorPassword,
      trigger: 'change',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    padding: 20px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
      font-size: 40px;
      color: white;
    }

    h2 {
      margin: 20px 0;
      font-size: 20px;
      color: white;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
