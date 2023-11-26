import { createApp } from 'vue'
import App from '@/App.vue'
import 'virtual:svg-icons-register'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)

import globalComponent from '@/components'
app.use(globalComponent)

import '@/styles/index.scss'

// 測試
import axios from 'axios'
// 登入API
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})

app.mount('#app')
