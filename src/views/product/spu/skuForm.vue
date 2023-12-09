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
        <el-form-item label="手機一級">
          <el-select placeholder="請選擇">
            <el-option>11</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="銷售屬性">
      <el-form inline>
        <el-form-item label="顏色">
          <el-select placeholder="請選擇">
            <el-option>11</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="圖片名稱">
      <el-table border>
        <el-table-column type="selection" width="80" align="center" />
        <el-table-column label="圖片" />
        <el-table-column label="名稱" />
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
let $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', {
    flag: 0,
    params: 'update',
  })
}
</script>

<style scoped lang="scss"></style>
