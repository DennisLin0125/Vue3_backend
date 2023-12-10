<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名稱">
      <el-input placeholder="SKU名稱" v-model="skuParams.skuName" />
    </el-form-item>
    <el-form-item label="價格(元)">
      <el-input
        placeholder="價格(元)"
        type="number"
        v-model="skuParams.price"
      />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="重量(克)"
        type="number"
        v-model="skuParams.weight"
      />
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input type="textarea" rows="4" v-model="skuParams.skuDesc" />
    </el-form-item>
    <el-form-item label="平台屬性">
      <el-form inline>
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select
            placeholder="請選擇"
            v-model="item.attrIdAndValueId"
            style="margin: 0 10px"
          >
            <el-option
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="`${item.id}:${attrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="銷售屬性">
      <el-form inline>
        <el-form-item
          v-for="item in saleArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select placeholder="請選擇" v-model="item.saleIdAndValueId">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="圖片名稱">
      <el-table border :data="imgArr" ref="table">
        <el-table-column type="selection" width="80" align="center" />
        <el-table-column label="圖片">
          <template v-slot="{ row, $index }">
            <img
              :src="row.imgUrl"
              alt="logo"
              style="width: 80px; height: 80px"
            />
          </template>
        </el-table-column>
        <el-table-column label="名稱" prop="imgName" />
        <el-table-column label="操作">
          <template v-slot="{ row, $index }">
            <el-button type="warning" @click="handler(row)">設置默認</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
export default {
  name: 'skuForm',
}
</script>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu'
import type { SpuData, SkuData } from '@/api/product/spu/type.ts'
import { ElMessage } from 'element-plus'

import { ref, reactive } from 'vue'
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])
//取得table元件實例
let table = ref<any>()

let skuParams = reactive<SkuData>({
  //父元件傳遞過來的數據
  category3Id: '', //三級分類的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  //v-model收集
  skuName: '', //sku名字
  price: '', //sku價格
  weight: '', //sku重量
  skuDesc: '', //sku的描述

  skuAttrValueList: [], //平台屬性的收集
  skuSaleAttrValueList: [], //銷售屬性
  skuDefaultImg: '', //sku圖片地址
})

let $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', {
    flag: 0,
    params: 'update',
  })
}

const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData,
) => {
  //收集數據
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId

  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  let result1: any = await reqSpuHasSaleAttr(spu.id as number)
  let result2: any = await reqSpuImageList(spu.id as number)

  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}

//設定預設圖片的方法回調
const handler = (row: any) => {
  //點擊的時候,全部圖片的複選框不勾選
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  //選取的圖片才勾選
  table.value.toggleRowSelection(row, true)
  //收集圖片地址
  skuParams.skuDefaultImg = row.imgUrl
}

//儲存按鈕的方法
const save = async () => {
  //整理參數
  //平台屬性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  //銷售屬性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  //新增SKU的請求
  let result: any = await reqAddSku(skuParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '新增SKU成功',
    })
    //通知父元件切換場景為零
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '新增SKU失敗',
    })
  }
}

defineExpose({
  initSkuData,
})
</script>

<style scoped lang="scss"></style>
