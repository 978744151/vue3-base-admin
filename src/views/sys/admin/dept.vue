<template>
  <div class="avue-crud">
    <avue-crud
      ref="crud"
      v-model="form"
      :option="option"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @refresh-change="getList()"
      :data="data"
    >
      <template #sortOrder="{ row }">
        <div>
          {{ row.weight }}
        </div>
      </template>
    </avue-crud>
  </div>
</template>
<script setup lang="ts">
// import TableForm from './menu-form'
import { delObj, fetchTree, addObj, getObj, putObj } from '@/api/admin/dept'
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
//获取this
const option = ref({})
const data = ref([])
const form = ref({ type: '' })
option.value = {
  index: false,
  border: true,
  delBtnText: '删除数据',
  delBtnIcon: 'el-icon-user',
  defaultExpandAll: true,
  column: [
    {
      label: '上级',
      prop: 'parentId',
      type: 'tree',
      dicData: computed(() => data.value),
      display: true,
      props: {
        value: 'id',
        label: 'name'
      },
      hide: true,
      rules: [{ required: true.valueOf, message: '' }]
    },
    {
      label: '部门名称',
      prop: 'name',
      type: 'input',
      display: true,
      rules: [{ required: true.valueOf, message: '' }]
    },
    {
      label: '排序',
      prop: 'sortOrder',
      type: 'input-number',
      display: true,

      rules: [{ required: true.valueOf, message: '' }],
      value: 0
    },
    {
      label: '创建时间',
      prop: 'createTime',
      display: true,
      rules: [{ required: true.valueOf, message: '' }]
    }
  ]
  // props: {
  //   label: 'name',
  //   value: 'id'
  // }
}
function rowSave(row: any, done: Function, loading: Boolean) {
  done(row)
  row.menuId = ''
  addObj(row).then(() => {
    getList()
  })
}
function rowDel(row: any, done: Function, loading: Boolean) {
  ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delObj(row.id).then(() => {
        getList()
        ElMessage({
          type: 'success',
          message: 'Delete completed'
        })
      })
    })
    .catch(() => {})
}
const rowUpdate = (row: any, index: Number, done: Function, loading: Boolean) => {
  done()
  console.log(row, done, loading)
  row.deptId = row.id
  putObj(row).then(() => {
    getList()
  })
}
const getList = async () => {
  const response = await fetchTree({})
  data.value = response?.data.data
}
onMounted(async () => {
  getList()
})
</script>
