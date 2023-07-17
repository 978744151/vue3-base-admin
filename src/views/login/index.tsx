import { defineComponent, ref, onMounted, onUnmounted, render } from 'vue' //必须有
import userLogin from './userLogin.vue'
// import codeLogin from './codelogin'
// import userRegister from '@/page/login/userRegister'
import { useCommonStore } from '@/stores/common.ts'
import './login.scss'
export default defineComponent({
  components: {
    userLogin
  },
  render() {
    const commonStore = useCommonStore()
    const website = commonStore.website
    return (
      <div class="login-container">
        <div class="login-weaper animated bounceInDown">
          <div class="login-left animate__animated animate__fadeInLeft">
            <el-image
              style="height: 50px"
              src="http://data-service-dev-internal.cnsaas.com/_nuxt/img/logo.4379149.png"
              alt=""
            />
            <p class="title">{website.title}</p>
            <p>
              ©{website.year} {website.version}
            </p>
          </div>
          <div class="login-border animate__animated animate__fadeInRight">
            <div class="login-main">
              <userLogin></userLogin>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

// import userLogin from './userLogin.vue'
// // import codeLogin from './codelogin'
// // import userRegister from '@/page/login/userRegister'
// import { useCommonStore } from '@/stores/common.ts'
// const commonStore = useCommonStore()
// const website = commonStore.website
