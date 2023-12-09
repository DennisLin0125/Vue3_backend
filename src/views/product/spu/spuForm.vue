<template>
  <el-form label-width="100">
    <el-form-item label="SPU名稱">
      <el-input placeholder="請輸入SPU名稱" v-model="SpuParams.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option
          :value="item.id"
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="請輸入描述"
        rows="4"
        v-model="SpuParams.description"
      />
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="fileList"
        action=""
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU銷售屬性">
      <el-select placeholder="還有" style="margin-right: 10px">
        <el-option>12</el-option>
      </el-select>
      <el-button type="primary" icon="Plus">添加銷售屬性</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column label="序號" type="index" width="80" align="center" />
        <el-table-column label="屬性名" width="120" />
        <el-table-column label="屬性值" width="width" />
        <el-table-column label="操作" width="120">
          <template v-slot="{ row, $index }">
            <el-button type="danger" icon="Delete" size="small" />
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
  name: 'spuForm',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type {
  AllTradeMark,
  SpuData,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
} from '@/api/product/spu/type.ts'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu'
import { TradeMark } from '@/api/product/trademark/type.ts'

let $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', 0)
}

// 儲存數據
let allTradeMark = ref<TradeMark[]>([])
let spuImageList = ref<SpuImg[]>([])
let spuHasSaleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])

//儲存已有的SPU對象
let SpuParams = ref<SpuData>({
  category3Id: '', //收集三級分類的ID
  spuName: '', //SPU的名字
  description: '', //SPU的描述
  tmId: '', //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
const initHasSpuData = async (spu: SpuData) => {
  // 儲存已有的Spu
  SpuParams.value = spu
  // 獲取全部品牌的數據
  let resultAllTradeMark: AllTradeMark = await reqAllTradeMark()
  if (resultAllTradeMark.code === 200) {
    allTradeMark.value = resultAllTradeMark.data
  }
  let resultSpuImageList: SpuHasImg = await reqSpuImageList(spu.id as number)
  if (resultSpuImageList.code === 200) {
    spuImageList.value = resultSpuImageList.data
  }
  let resultSpuHasSaleAttr: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number,
  )
  if (resultSpuHasSaleAttr.code === 200) {
    spuHasSaleAttr.value = resultSpuHasSaleAttr.data
  }
  let resultAllSaleAttr: HasSaleAttrResponseData = await reqAllSaleAttr()
  if (resultAllSaleAttr.code === 200) {
    allSaleAttr.value = resultAllSaleAttr.data
  }
}

defineExpose({
  initHasSpuData,
})
</script>

<style scoped lang="scss"></style>
