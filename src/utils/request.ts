//進行axios二次封裝:使用請求與回應攔截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
//引入使用者相關的倉庫
// import useUserStore from '@/store/modules/user'
//第一步:利用axios物件的create方法,去建立axios實例(其他的設定:基礎路徑、逾時的時間)
const request = axios.create({
  //基礎路徑
  baseURL: import.meta.env.VITE_APP_BASE_API, //基礎路徑上會攜帶/api
  timeout: 5000, //超時的時間的設置
})
//第二步:request實例新增請求與回應攔截器
request.interceptors.request.use((config) => {
  nProgress.start()
  //取得使用者相關的小倉庫:取得倉庫內部token,登入成功以後攜帶給伺服器
  // const userStore = useUserStore()
  // if (userStore.token) {
  //     config.headers.token = userStore.token
  // }
  //config配置物件,headers屬性請求頭,經常給伺服器端攜帶公共參數
  //回傳配置對象
  return config
})

//第三步:回應攔截器
request.interceptors.response.use(
  (response) => {
    //成功回調
    //簡化數據
    nProgress.done()
    return response.data
  },
  (error) => {
    //失敗回呼:處理http網路錯誤的
    //定義一個變數:儲存網路錯誤訊息
    let message = ''
    //http狀態碼
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN過期'
        break
      case 403:
        message = '無權訪問'
        break
      case 404:
        message = '請求位址錯誤'
        break
      case 500:
        message = '伺服器出現問題'
        break
      default:
        message = '網路出現問題'
        break
    }
    //提示錯誤訊息
    ElMessage({
      type: 'error',
      message,
    })
    nProgress.done()
    return Promise.reject(error)
  },
)
//外部暴露
export default request
