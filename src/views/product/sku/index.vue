<template>
  <el-card>
    <el-table border :data="skuArr">
      <el-table-column type="index" label="序號" width="80" align="center" />
      <el-table-column
        prop="skuName"
        label="名稱"
        width="150px"
        show-overflow-tooltip="..."
      />
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="150px"
        show-overflow-tooltip="..."
      />
      <el-table-column label="默認圖片" width="150px">
        <template v-slot="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(g)" width="150px" />
      <el-table-column prop="price" label="價格(元)" width="150px" />
      <el-table-column label="操作" fixed="right" width="width">
        <template v-slot="{ row, $index }">
          <el-button
            @click="updateSale(row)"
            type="info"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
          />
          <el-button @click="editSku" type="primary" size="small" icon="Edit" />
          <el-button
            @click="findSku(row)"
            type="info"
            size="small"
            icon="Info-filled"
          />
          <el-popconfirm
            @confirm="rmvSku(row)"
            :title="`確定要刪除 ${row.skuName} ?`"
            width="200px"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[10, 20, 30]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasSku"
      style="margin: 10px 0"
    />
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品詳情</h4>
      </template>
      <template #default>
        <el-row style="margin: 5px 0">
          <el-col :span="6">名稱</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">價格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">平台屬性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">銷售屬性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 5px 0">
          <el-col :span="6">商品圖片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Sku',
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqSkuList,
  reqRemoveSku,
} from '@/api/product/sku'
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type.ts'
import { ElMessage } from 'element-plus'

let page = ref<number>(1)
let size = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<SkuData>({})

onMounted(() => {
  getHasSku()
})

const getHasSku = async (pager = 1) => {
  page.value = pager
  let result: SkuResponseData = await reqSkuList(page.value, size.value)
  if (result.code === 200) {
    skuArr.value = result.data.records
    total.value = result.data.total
  }
}

const handleSizeChange = () => {
  getHasSku()
}

const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    let result: any = await reqCancelSale(row.id!)
    if (result.code === 200) {
      row.isSale = 0
      await getHasSku()
      ElMessage({
        type: 'success',
        message: '下架成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '下架失敗',
      })
    }
  } else {
    let result: any = await reqSaleSku(row.id!)
    if (result.code === 200) {
      row.isSale = 1
      await getHasSku()
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '上架失敗',
      })
    }
  }
}

const editSku = () => {
  ElMessage({
    type: 'success',
    message: '目前開發中',
  })
}

const findSku = async (row: SkuData) => {
  drawer.value = true
  let result: SkuInfoData = await reqSkuInfo(row.id!)
  if (result.code === 200) {
    skuInfo.value = result.data
  }
}

const rmvSku = async (row: SkuData) => {
  let result: any = await reqRemoveSku(row.id!)
  if (result.code === 200) {
    await getHasSku(skuArr.value.length > 1 ? page.value : page.value - 1)
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '刪除失敗',
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  margin: 0;
  line-height: 200px;
  color: #475669;
  text-align: center;
  opacity: 0.75;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style scoped lang="scss"></style>
