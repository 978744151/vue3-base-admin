import { defineComponent, reactive, onMounted, watch, toRefs, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const Dark = defineComponent({
  name: 'dark',
  setup() {
    const variables = reactive({})
    const theme = ref(false)
    console.log(theme)
    const isDark = useDark({
      // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
      storageKey: 'useDarkKEY',
      // 暗黑class名字
      valueDark: 'dark',
      // 高亮class名字
      valueLight: 'light'
    })
    const toggleDark = useToggle(isDark)
    return {
      ...toRefs(variables),
      theme,
      toggleDark
    }
  },
  render() {
    return (
      <div>
        <span on-click={this.toggleDark()}></span>
        <el-switch
          inline-prompt
          v-model={this.theme}
          active-icon={Sunny}
          inactive-icon={Moon}
        ></el-switch>
      </div>
    )
  }
})
export default Dark
