import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false, // 設置菜單折疊
      reflash: false, //刷新
    }
  },
})

export default useLayoutSettingStore
