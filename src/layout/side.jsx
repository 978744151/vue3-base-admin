import { defineComponent, reactive, onMounted, watch, toRefs, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu.ts'
import sideItem from './sideItem.vue'
const Sidebar = defineComponent({
  name: 'Sidebar',
  components: {
    sideItem
  },
  setup() {
    const router = useRouter()
    const variables = reactive({
      isCollapse: false,
      theme: true,
      menuList: []
    })
    const menuStore = useMenuStore()
    const handleNext = (val) => {
      router.push(val)
    }
    onMounted(() => {
      variables.menuList = menuStore.getMenus
    })
    return {
      ...toRefs(variables),
      handleNext
    }
  },
  render() {
    console.log(this.menuList)
    return (
      <div>
        <div style="width:200px;height:80px" class="flex center h-in fy-title">
          <el-image
            style=" height: 50px"
            src="http://data-service-dev-internal.cnsaas.com/_nuxt/img/logo.4379149.png"
            alt=""
          />
        </div>
        <el-menu default-active="2" class="el-menu-vertical-demo" collapse={this.isCollapse}>
          <sideItem menu={this.menuList} />
        </el-menu>
      </div>
    )
  }
})
export default Sidebar
