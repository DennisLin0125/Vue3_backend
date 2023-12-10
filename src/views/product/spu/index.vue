<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene == 0">
        <el-button
          @click="addSpu"
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            type="index"
            label="序號"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column prop="spuName" label="SPU名稱" />
          <el-table-column
            prop="description"
            label="SPU描述"
            show-overflow-tooltip="..."
          >
            <template v-slot="{ row, $index }"></template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row, $index }">
              <el-button
                @click="addSku(row)"
                type="primary"
                icon="Plus"
                title="添加SKU"
              />
              <el-button
                @click="updateSpu(row)"
                type="warning"
                icon="Edit"
                title="修改SPU"
              />
              <el-button
                @click="findSku(row)"
                type="info"
                icon="View"
                title="查看SKU"
              />
              <el-popconfirm
                @confirm="deleteSpu(row)"
                width="200px"
                :title="`確定刪除 ${row.spuName} ?`"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete" title="刪除SPU" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="size"
          :page-sizes="[3, 5, 10]"
          background
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @size-change="changeSize"
          @current-change="getHasSpu"
        />
      </div>
      <!--      添加修改spu-->
      <SpuForm ref="spuForm" v-show="scene == 1" @changeScene="changeScene" />
      <!--      添加Sku-->
      <SkuForm ref="skuForm" v-show="scene == 2" @changeScene="changeScene" />
      <!--      dialog對話框-->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName" />
          <el-table-column label="SKU價格" prop="price" />
          <el-table-column label="SKU重量" prop="weight" />
          <el-table-column>
            <template v-slot="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 80px; height: 80px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Spu',
}
</script>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import type {
  HasSpuResponseData,
  Records,
  SpuData,
  SkuInfoData,
  SkuData,
} from '@/api/product/spu/type.ts'
import useCategoryStore from '@/store/modules/category.ts'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
// 引入子組件
import SpuForm from '@/views/product/spu/spuForm.vue'
import SkuForm from '@/views/product/spu/skuForm.vue'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
//場景的數據
let scene = ref<number>(0)
const page = ref<number>(1)
const size = ref<number>(3)
const total = ref<number>(20)
const records = ref<Records>([])
// 獲取子組件實例
let spuForm = ref<any>()
let skuForm = ref<any>()

let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)

// 清除數據
onBeforeUnmount(() => {
  categoryStore.$reset()
})
// 監聽三級分類數據
watch(
  () => categoryStore.c3Id,
  () => {
    if (categoryStore.c3Id) {
      getHasSpu()
    }
  },
)

const getHasSpu = async (pages = 1) => {
  page.value = pages
  let result: HasSpuResponseData = await reqHasSpu(
    page.value,
    size.value,
    categoryStore.c3Id,
  )
  if (result.code === 200) {
    total.value = result.data.total
    records.value = result.data.records
  }
}

const changeSize = () => {
  getHasSpu()
}

const addSpu = () => {
  scene.value = 1
  spuForm.value.initAddSpu(categoryStore.c3Id)
}

const updateSpu = (row: SpuData) => {
  scene.value = 1
  // 調用子組件的方法
  spuForm.value.initHasSpuData(row)
}

// 自訂義事件回調
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params === 'update') {
    getHasSpu(page.value)
  } else {
    getHasSpu()
  }
}

const addSku = (row: SpuData) => {
  scene.value = 2
  const { c1Id, c2Id } = categoryStore
  skuForm.value.initSkuData(c1Id, c2Id, row)
}

const findSku = async (row: SpuData) => {
  let result: any = await reqSkuList(row.id!)
  if (result.code === 200) {
    show.value = true
    skuArr.value = result.data
  }
}

const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id!)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
    await getHasSpu(records.value.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '刪除失敗',
    })
  }
}
</script>

<style scoped lang="scss"></style>
