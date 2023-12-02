<template>
  <div>
    <el-card class="box-card">
      <!--    頂部添加按鈕-->
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <!--  table組件,用於展示數據-->
      <el-table :data="record" border style="width: 100%; margin: 10px 0">
        <el-table-column type="index" label="序號" width="80" align="center" />
        <el-table-column prop="tmName" label="品牌名稱" width="width" />
        <el-table-column prop="name" label="品牌LOGO" width="width">
          <template v-slot="{ row, $inde }">
            <img :src="row.logoUrl" style="width: 80px; height: 80px" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作" width="width">
          <template v-slot="{ row, $inde }">
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="updateTrademark"
            ></el-button>
            <el-button type="danger" icon="Delete" size="small"></el-button>
          </template>
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
        @current-change="getHasTrademark"
        background
        page-count="7"
      />
    </el-card>

    <!--  對話框-->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <el-form-item label="名稱" label-width="80px">
          <el-input placeholder="請輸入品牌名稱" />
        </el-form-item>
        <el-form-item label="LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--      具名插槽-->
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">確定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Trademark',
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  TradeMarkResponseData,
  Records,
} from '@/api/product/trademark/type.ts'

let page = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let record = ref<Records>([])
// 控制對話框顯示與隱藏
let dialogFormVisible = ref<boolean>(false)
const getHasTrademark = async (pager = 1) => {
  page.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    page.value,
    limit.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    record.value = result.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})

const handleSizeChange = () => {
  getHasTrademark()
}

const addTrademark = () => {
  dialogFormVisible.value = true
}

const updateTrademark = () => {
  dialogFormVisible.value = true
}

const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = () => {
  dialogFormVisible.value = false
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  display: block;
  width: 178px;
  height: 178px;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
