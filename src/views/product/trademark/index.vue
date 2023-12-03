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
          <template v-slot="{ row }">
            <img :src="row.logoUrl" style="width: 80px; height: 80px" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作" width="width">
          <template v-slot="{ row }">
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="updateTrademark(row)"
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
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名稱" label-width="100px" prop="tmName">
          <el-input
            placeholder="請輸入品牌名稱"
            v-model="trademarkParams.tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
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
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
} from '@/api/product/trademark'
import type {
  TradeMarkResponseData,
  Records,
  TradeMark,
} from '@/api/product/trademark/type.ts'

import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

let page = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let record = ref<Records>([])
// 控制對話框顯示與隱藏
let dialogFormVisible = ref<boolean>(false)
// 定義收集新增品牌數據
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 獲取form的組件實例
let formRef = ref()
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
  trademarkParams.id = 0
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''

  nextTick(() => {
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')
  })
}

const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate('logoUrl')
    formRef.value.clearValidate('tmName')
  })

  dialogFormVisible.value = true
  // ES6語法
  Object.assign(trademarkParams, row)
  // trademarkParams.id=row.id
  // trademarkParams.tmName=row.tmName
  // trademarkParams.logoUrl=row.logoUrl
}

const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = async () => {
  await formRef.value.validate()

  let result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    await getHasTrademark(trademarkParams.id ? page.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失敗' : '添加品牌失敗',
    })
    dialogFormVisible.value = false
  }
}

const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名稱位數需大於等於2'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('品牌logo不能為空'))
  } else {
    callback()
  }
}

const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validatorLogoUrl,
    },
  ],
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
  trademarkParams.logoUrl = response.data
  // 清除校驗錯誤訊息
  formRef.value.clearValidate('logoUrl')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
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
