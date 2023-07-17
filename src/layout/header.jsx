import { defineComponent, reactive, onUnmounted, onMounted, watch, toRefs, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { ArrowDown } from '@element-plus/icons-vue'
import Dark from '@/components/dark'
import { useRouter } from 'vue-router'

const Sidebar = defineComponent({
  name: 'Sidebar',
  components: {
    Dark
  },
  setup() {
    const variables = reactive({})
    const theme = ref(true)
    const isDark = useDark({
      // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
      storageKey: 'useDarkKEY',
      // 暗黑class名字
      valueDark: 'dark',
      // 高亮class名字
      valueLight: 'light'
    })
    const toggleDark = useToggle(isDark)
    const handleCommand = () => {}

    return {
      ...toRefs(variables),
      theme,
      toggleDark,
      handleCommand
    }
  },
  render() {
    const router = useRouter()
    return (
      <div class="flex  h-100 row-between">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to={{ path: '/editor' }}>homepage</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="flex row-between">
          <Dark class="m-r-10" />
          <el-dropdown
            on-command={this.handleCommand}
            split-button
            type="primary"
            on-click={this.handleCommand}
            v-slots={{
              dropdown: () => {
                return (
                  <el-dropdown-menu>
                    <el-dropdown-item command="a" onClick={() => router.push('/login')}>
                      退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                )
              }
            }}
          >
            user
          </el-dropdown>
        </div>
      </div>
    )
  }
})
export default Sidebar
