<template>
  <div>
    <div>
      <Category />
    </div>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加屬性</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column type="index" label="序號" width="80" align="center" />
        <el-table-column prop="aaa" label="屬性名稱" width="120" />
        <el-table-column prop="bbb" label="屬性值名稱" width="width">
          <template v-slot="{ row, $index }"></template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="{ row, $index }">
            <el-button type="warning" icon="Edit"></el-button>
            <el-button type="danger" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Attr',
}
</script>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
</script>

<style scoped lang="scss"></style>
