import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@smallwei/avue/lib/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/plugins/plugin'
import '@/plugins/renderer'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Avue from '@smallwei/avue'
import { registerComponents } from '@/plugins/components.js'
const app = createApp(App)
app.use(Avue, {
  size: '',
  tableSize: '',
  formSize: ''
})
registerComponents(app)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
// app.use(Avue)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
