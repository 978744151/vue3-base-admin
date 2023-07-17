import { defineComponent, ref } from 'vue' //必须有
import { useRouter } from 'vue-router'
import Layout from '@/layout'
export default defineComponent({
  components: {
    Layout
  },
  setup() {
    const router = useRouter()
    const a: Number = 123
    console.log(a)
    const handleMenuClick = () => {}
    return {
      handleMenuClick
    }
  },
  render() {
    return <div></div>
  }
})
