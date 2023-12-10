<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名稱">
      <el-input placeholder="SKU名稱" />
    </el-form-item>
    <el-form-item label="價格(元)">
      <el-input placeholder="價格(元)" type="number" />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="重量(克)" type="number" />
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input type="textarea" rows="4" />
    </el-form-item>
    <el-form-item label="平台屬性">
      <el-form inline>
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select placeholder="請選擇">
            <el-option
              v-for="item2 in item.attrValueList"
              :key="item2.id"
              :label="item2.valueName"
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
          <el-select placeholder="請選擇">
            <el-option
              v-for="item2 in item.spuSaleAttrValueList"
              :key="item2.id"
              :label="item2.saleAttrValueName"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="圖片名稱">
      <el-table border :data="imgArr">
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
            <el-button type="warning">設置默認</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
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
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
import type { SpuData } from '@/api/product/spu/type.ts'

import { ref } from 'vue'
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])

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
  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  let result1: any = await reqSpuHasSaleAttr(spu.id as number)
  let result2: any = await reqSpuImageList(spu.id as number)

  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}

defineExpose({
  initSkuData,
})
</script>

<style scoped lang="scss"></style>
