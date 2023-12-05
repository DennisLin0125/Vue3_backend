//伺服器全部介面傳回的資料型別
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//SPU資料的ts類型:需要修改
export interface SpuData {
  category3Id: string | number
  id?: number
  spuName: string
  tmId: number | string
  description: string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]
}
//數組:元素都是已有SPU資料型別
export type Records = SpuData[]
//定義取得已有的SPU介面回傳的資料ts類型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//品牌資料的TS類型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
//品牌介面回傳的資料ts類型
export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}

//商品圖片的ts類型
export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}
//已有的SPU的照片牆資料的類型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

//已有的銷售屬性值物件ts類型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
//儲存已有的銷售屬性值數組類型
export type SpuSaleAttrValueList = SaleAttrValue[]

//銷售屬性物件ts類型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}
//SPU已有的銷售屬性介面回傳資料ts類型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

//已有的全部SPU的回傳資料ts類型
export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: number | string //平台屬性的ID
  valueId: number | string //屬性值的ID
}

export interface saleArr {
  saleAttrId: number | string //屬性ID
  saleAttrValueId: number | string //屬性值的ID
}
export interface SkuData {
  category3Id: string | number //三級分類的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string //sku名字
  price: string | number //sku價格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string //sku圖片地址
}

//取得SKU資料介面的ts類型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
