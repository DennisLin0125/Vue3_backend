//SPU管理模組的接口
import request from '@/utils/request'
import type {
  SkuInfoData,
  SkuData,
  SpuData,
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from './type'
enum API {
  //取得已有的SPU的數據
  HASSPU_URL = '/admin/product/',
  //取得全部品牌的數據
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //取得某個SPU下的全部的售賣商品的圖片數據
  IMAGE_URL = '/admin/product/spuImageList/',
  //取得某一個SPU下全部的已有的銷售屬性介面位址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  //取得整個項目全部的銷售屬性[顏色、版本、尺寸]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  //追加一個新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  //追加一個新增的SKU位址
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  //查看某一個已有的SPU下全部販售的商品
  SKUINFO_URL = '/admin/product/findBySpuId/',
  //刪除已有的SPU
  REMOVESPU_URL = '/admin/product/deleteSpu/',
}
//取得某一個三級分類下已有的SPU數據
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
//取得全部的SPU的品牌的數據
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
//取得某一個已有的SPU下全部商品的圖片位址
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
//取得某一個已有的SPU擁有多少個銷售屬性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
//取得全部的銷售屬性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
//新增一個新的SPU的
//更新已有的SPU介面
//data:即為新增的SPU|或已有的SPU對象
export const reqAddOrUpdateSpu = (data: SpuData) => {
  //如果SPU物件擁有ID,更新已有的SPU
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
//新增SKU的請求方法
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data)

//取得SKU數據
export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)

//刪除已有的SPU
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVESPU_URL + spuId)
