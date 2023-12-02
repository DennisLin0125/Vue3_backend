<template>
  <el-card class="box-card">
    <!--    頂部添加按鈕-->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!--  table組件,用於展示數據-->
    <el-table border style="width: 100%; margin: 10px 0">
      <el-table-column type="index" label="序號" width="80" align="center" />
      <el-table-column prop="date" label="品牌名稱" width="width" />
      <el-table-column prop="name" label="品牌LOGO" width="width">
        123
      </el-table-column>
      <el-table-column prop="address" label="品牌操作" width="width">
        <el-button type="warning" icon="Edit"></el-button>
        <el-button type="danger" icon="Delete"></el-button>
      </el-table-column>
    </el-table>
    <!--    分頁器-->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Trademark',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

let page = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(20)
</script>

<style scoped lang="scss"></style>
