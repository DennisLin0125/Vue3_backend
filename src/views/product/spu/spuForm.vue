<template>
  <el-form label-width="100">
    <el-form-item label="SPU名稱">
      <el-input placeholder="請輸入SPU名稱" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="請選擇品牌">
        <el-option>1</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="請輸入描述" rows="4" />
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
let $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', 0)
}
</script>

<style scoped lang="scss"></style>
