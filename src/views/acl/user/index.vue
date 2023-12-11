<template>
  <el-card style="height: 75px">
    <el-form inline class="form">
      <el-form-item label="用戶名:">
        <el-input placeholder="請輸入用戶名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" @click="addUser">添加用戶</el-button>
    <el-button type="danger">批量刪除</el-button>
    <el-table border style="margin: 10px 0" :data="userArr">
      <el-table-column type="selection" width="80" align="center" />
      <el-table-column label="#" type="index" width="80" align="center" />
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column
        prop="username"
        label="用戶名字"
        align="center"
        width="100"
        show-overflow-tooltip="..."
      />
      <el-table-column
        prop="name"
        label="用戶名稱"
        align="center"
        width="200"
        show-overflow-tooltip="..."
      />
      <el-table-column
        prop="roleName"
        label="用戶角色"
        align="center"
        width="200"
        show-overflow-tooltip="..."
      />
      <el-table-column
        prop="createTime"
        label="創建時間"
        align="center"
        width="200"
      />
      <el-table-column
        prop="updateTime"
        label="更新時間"
        align="center"
        width="200"
      />
      <el-table-column label="操作" width="300" align="center" fixed="right">
        <template v-slot="{ row, $index }">
          <el-button type="primary" icon="User" size="small">
            分配角色
          </el-button>
          <el-button
            type="info"
            icon="Edit"
            size="small"
            @click="updateUser(row)"
          >
            編輯
          </el-button>
          <el-button type="danger" icon="Delete" size="small">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[3, 5, 10]"
      background
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasUser"
    />
  </el-card>
  <!--  抽屜-->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>添加用戶</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用戶姓名">
          <el-input placeholder="請輸入名字" />
        </el-form-item>
        <el-form-item label="用戶暱稱">
          <el-input placeholder="請輸入暱稱" />
        </el-form-item>
        <el-form-item label="用戶密碼">
          <el-input placeholder="請輸入密碼" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button>取消</el-button>
        <el-button type="primary">確定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
export default {
  name: 'User',
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqUserInfo } from '@/api/acl/user'
import type { UserResponseData, Records, User } from '@/api/acl/user/type.ts'

let page = ref<number>(1)
let size = ref<number>(5)
let total = ref<number>(10)
let keyword = ref<string>('')
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)

onMounted(() => {
  getHasUser()
})

const getHasUser = async (pager = 1) => {
  page.value = pager
  let result: UserResponseData = await reqUserInfo(
    page.value,
    size.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

const handleSizeChange = () => {
  getHasUser()
}

const addUser = () => {
  drawer.value = true
}

const updateUser = (row: User) => {
  drawer.value = true
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
