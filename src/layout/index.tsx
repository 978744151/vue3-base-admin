import { defineComponent, ref, onMounted, onUnmounted } from 'vue' //必须有
import { useRouter } from 'vue-router'
import Side from '@/layout/side'
import Header from '@/layout/header'
import './module.scss'
import { checkToken } from '@/api/login'
export default defineComponent({
  components: {
    Side
  },
  setup() {
    const handleMenuClick = () => {}
    const refreshTime = ref(0)
    const refreshToken = () => {
      refreshTime.value = setInterval(() => {
        checkToken(false)
      }, 60000)
    }
    onMounted(() => {
      refreshToken()
    })
    onUnmounted(() => {
      clearInterval(refreshTime.value)
    })
    return {
      handleMenuClick
    }
  },
  render() {
    return (
      <el-container>
        <el-aside width="220px">
          <Side />
        </el-aside>
        <el-container>
          <el-header>
            <Header />
          </el-header>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    )
  }
})
