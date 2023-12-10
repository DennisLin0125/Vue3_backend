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
          <el-button type="info" size="small" icon="Top" />
          <el-button type="primary" size="small" icon="Edit" />
          <el-button type="info" size="small" icon="Info-filled" />
          <el-button type="danger" size="small" icon="Delete" />
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
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Sku',
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSkuList } from '@/api/product/sku'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type.ts'

let page = ref<number>(1)
let size = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])

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
</script>

<style scoped lang="scss"></style>
