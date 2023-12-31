// 自訂義組件

// 假設 allGlobalComponent 的類型是某種結構
interface AllGlobalComponent {
  [key: string]: any
}

import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from '@/components/Category/index.vue'

// 引入全部icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: AllGlobalComponent = { SvgIcon, Category }

export default {
  install(app: any) {
    // 註冊項目的全局組件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    // 註冊icon為全局組件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
