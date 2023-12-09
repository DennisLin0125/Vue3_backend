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
        v-model:file-list="spuImageList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :before-upload="handleUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU銷售屬性">
      <el-select
        :placeholder="`還有 ${unSelectSaleAttr.length} 個未選`"
        style="margin-right: 10px"
        v-model="saleAttrIdAndValueName"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        />
      </el-select>
      <el-button
        @click="addSaleAttr"
        :disabled="!saleAttrIdAndValueName"
        type="primary"
        icon="Plus"
      >
        添加屬性
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column label="序號" type="index" width="80" align="center" />
        <el-table-column prop="saleAttrName" label="屬性名" width="120" />
        <el-table-column label="屬性值" width="width">
          <template v-slot="{ row, $index }">
            <el-tag
              v-for="tag in row.spuSaleAttrValueList"
              :key="tag.id"
              class="mx-1"
              closable
              :type="tag.type"
              style="margin: 0 5px"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-button type="primary" size="small" icon="Plus" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="{ row, $index }">
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              @click="saleAttr.splice($index, 1)"
            />
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
import { ref, computed } from 'vue'
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
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')

const cancel = () => {
  $emit('changeScene', 0)
}

// 儲存數據
let allTradeMark = ref<TradeMark[]>([])
let spuImageList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
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

// 收集
let saleAttrIdAndValueName = ref<string>('')
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
    spuImageList.value = resultSpuImageList.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      }
    })
  }
  let resultSpuHasSaleAttr: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number,
  )
  if (resultSpuHasSaleAttr.code === 200) {
    saleAttr.value = resultSpuHasSaleAttr.data
  }
  let resultAllSaleAttr: HasSaleAttrResponseData = await reqAllSaleAttr()
  if (resultAllSaleAttr.code === 200) {
    allSaleAttr.value = resultAllSaleAttr.data
  }
}

const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上傳檔案務必小於3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上傳檔案務必PNG|JPG|GIF',
    })
    return false
  }
}
// 計算出還未擁有的屬性
let unSelectSaleAttr = computed(() => {
  return allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
})

const addSaleAttr = () => {
  /*
   "baseSaleAttrId": number,
   "saleAttrName": string,
   "spuSaleAttrValueList": SpuSaleAttrValueList
   */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  //準備一個新的銷售屬性物件:將來帶給伺服器即可
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  //追加到數組當中
  saleAttr.value.push(newSaleAttr)
  //清空收集的數據
  saleAttrIdAndValueName.value = ''
}

defineExpose({
  initHasSpuData,
})
</script>

<style scoped lang="scss"></style>
