import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  //取得對應的使用者倉庫
  //全域自訂指令:實作按鈕的權限
  app.directive('has', {
    //代表使用這個全域自訂指令的DOM|元件掛載完畢的時候會執行一次
    mounted(el: any, options: any) {
      //自訂指令右側的數值:如果在使用者資訊buttons陣列當中沒有
      //從DOM樹上幹掉
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
