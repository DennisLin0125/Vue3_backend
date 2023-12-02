export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//已有的品牌的ts資料類型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

//包含全部品牌資料的ts類型
export type Records = TradeMark[]

//取得的已有全部品牌的資料ts類型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
