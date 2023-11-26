// 自訂義組件

import SvgIcon from '@/components/SvgIcon/index.vue'

const allGlobalComponent = { SvgIcon }

export default {
  install(app) {
    // 註冊項目的全局組件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
