//書寫品牌管理模組接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
//品牌管理模組介面位址
enum API {
  //取得已有品牌介面
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //新增品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //刪除已有品牌
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}
//取得已有品牌的介面方法
//page:取得第幾頁 ---預設第一頁
//limit:取得幾個已有品牌的數據
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
//新增與修改已有品牌介面方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //修改現有品牌的數據
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    //新增品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

//刪除某一個已有品牌的數據
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
