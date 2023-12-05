export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//定義SKU物件的ts類型
export interface Attr {
  id?: number
  attrId: number | string //平台屬性的ID
  valueId: number | string //屬性值的ID
}
export interface saleArr {
  id?: number
  saleAttrId: number | string //屬性ID
  saleAttrValueId: number | string //屬性值的ID
}
export interface SkuData {
  category3Id?: string | number //三級分類的ID
  spuId?: string | number //已有的SPU的ID
  tmId?: string | number //SPU品牌的ID
  skuName?: string //sku名字
  price?: string | number //sku價格
  weight?: string | number //sku重量
  skuDesc?: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg?: string //sku圖片地址
  isSale?: number //控製商品的上架與下架
  id?: number
}

//取得SKU介面回傳的資料ts類型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

//取得SKU商品詳情介面的ts類型
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
