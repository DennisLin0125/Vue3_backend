import { createApp } from 'vue'
import App from '@/App.vue'
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import globalComponent from '@/components'
import router from '@/router'
import pinia from '@/store'
import '@/permission.ts'

const app = createApp(App)
app.use(ElementPlus)
app.use(globalComponent)
app.use(router)
app.use(pinia)

app.mount('#app')
