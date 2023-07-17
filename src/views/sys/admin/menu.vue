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
      <template #icons="{ row }">
        <svg-icon v-if="row.icon" :icon-class="row.icon" />
      </template>

      <template #type="{ row }">
        <el-tag type="success" v-if="row.type === '0'">菜单</el-tag>
        <el-tag type="info" v-if="row.type === '1'">按钮</el-tag></template
      >
      <template #keepAlive="{ row }">
        <el-tag type="info" v-if="row.keepAlive === '0'">关闭</el-tag>
        <el-tag type="success" v-else>开启</el-tag>
      </template>
    </avue-crud>
  </div>
</template>
<script setup lang="ts">
// import TableForm from './menu-form'
import { addObj, fetchMenuTree, getObj, putObj, clearMenuCache, delObj } from '@/api/admin/menu'
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
import { iconList } from '@/utils/icon.js'
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
  column: [
    {
      label: '类型',
      prop: 'type',
      width: 200,
      display: true,
      hide: true,
      type: 'switch',
      span: 24,
      props: {
        activeText: '菜单',
        inactiveText: '按钮'
      },
      dicData: [
        {
          label: '菜单',
          value: '0'
        },
        {
          label: '按钮',
          value: '1'
        }
      ]
    },
    {
      label: '上级菜单',
      prop: 'parentId',
      width: 200,
      display: true,
      type: 'tree',
      dicData: computed(() => data.value),
      hide: true,
      props: {
        value: 'id'
      }
    },
    {
      label: '名称',
      prop: 'name',
      width: 200,
      display: true,
      rules: [{ required: true.valueOf, message: '' }]
    },
    {
      label: '组件路径',
      prop: 'path',
      display: computed(() => form.value.type !== '1'),
      rules: [{ required: true.valueOf, message: '' }]
    },
    {
      label: '图标',
      prop: 'icons',
      slot: true,
      display: false
    },
    {
      label: '图标',
      type: 'input-icon',
      prop: 'icon',
      iconList,
      hide: true,
      display: computed(() => form.value.type !== '1')
    },
    {
      label: '排序',
      prop: 'sortOrder',
      type: 'input-number',
      value: 0
    },

    {
      label: '类型',
      prop: 'type',
      slot: true,
      hide: true,
      display: false
    },
    {
      label: '路由缓冲',
      prop: 'keepAlive',
      slot: true,
      type: 'switch',
      display: computed(() => form.value.type !== '1')
    },
    {
      label: '权限标识',
      prop: 'permission',
      type: 'input',
      display: computed(() => form.value.type === '1'),
      rules: [{ required: true.valueOf, message: '' }]
    }
  ]
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
  row.menuId = row.id
  putObj(row).then(() => {
    getList()
  })
}
const getList = async () => {
  const response = await fetchMenuTree(false)
  data.value = response?.data.data
}
onMounted(async () => {
  getList()
})
</script>
