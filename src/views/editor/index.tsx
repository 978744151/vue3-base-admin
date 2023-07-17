import { defineComponent, ref } from 'vue' //必须有
import { useRouter } from 'vue-router'
import Editor from '@/components/editor/index.vue'
export default defineComponent({
  setup() {
    const router = useRouter()
    const a = 1
    const handleMenuClick = () => {
      router.push({ path: `/editor` })
    }
    return {
      handleMenuClick
    }
  },
  render() {
    return (
      <div style="height:100%">
        <Editor></Editor>
      </div>
    )
  }
})
