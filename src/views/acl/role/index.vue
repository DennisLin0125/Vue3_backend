<template>
  <el-card>
    <el-form inline class="header-class">
      <el-form-item label="職位搜索">
        <el-input placeholder="請輸入關鍵字" v-model="keyword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!keyword" @click="search">
          搜索
        </el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="Plus">添加角色</el-button>
    <el-table border style="margin: 10px 0" :data="allRole">
      <el-table-column label="#" type="index" align="center" width="80" />
      <el-table-column prop="id" label="id" align="center" width="80" />
      <el-table-column
        label="角色名稱"
        align="center"
        width="200"
        show-overflow-tooltip="..."
        prop="roleName"
      />
      <el-table-column
        label="創建時間"
        align="center"
        width="200"
        show-overflow-tooltip="..."
        prop="createTime"
      />
      <el-table-column
        label="更新時間"
        align="center"
        width="200"
        show-overflow-tooltip="..."
        prop="updateTime"
      />
      <el-table-column label="操作" width="width" align="center">
        <template v-slot="{ row, $index }">
          <el-button type="primary" icon="User">分配權限</el-button>
          <el-button type="info" icon="Edit">編輯</el-button>
          <el-button type="danger" icon="Delete">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分頁器-->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[3, 5, 10]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasRole"
    />
  </el-card>
</template>

<script lang="ts">
export default {
  name: 'Role',
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqAllRoleList } from '@/api/acl/role'
import type { RoleResponseData, Records } from '@/api/acl/role/type.ts'
import useLayoutSettingStore from '@/store/modules/setting.ts'

let page = ref<number>(1)
let size = ref<number>(3)
let total = ref<number>(10)
let keyword = ref<string>('')
let allRole = ref<Records>([])
let layoutSettingStore = useLayoutSettingStore()

onMounted(() => {
  getHasRole()
})

const getHasRole = async (pager = 1) => {
  page.value = pager
  let res: RoleResponseData = await reqAllRoleList(
    page.value,
    size.value,
    keyword.value,
  )
  if (res.code === 200) {
    allRole.value = res.data.records
    total.value = res.data.total
  }
}

const handleSizeChange = () => {
  getHasRole()
}

const search = () => {
  getHasRole()
  keyword.value = ''
}

const reset = () => {
  layoutSettingStore.reflash = !layoutSettingStore.reflash
}
</script>

<style scoped lang="scss">
.header-class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
</style>
