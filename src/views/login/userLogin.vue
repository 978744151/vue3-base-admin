<script setup lang="ts">
import { randomLenNum } from '@/utils'
import { useCommonStore } from '@/stores/common.ts'
import { useMenuStore } from '@/stores/menu.ts'
import { clearMenuCache, delObj, fetchMenuTree } from '@/api/admin/menu'
import { setStore } from '@/utils/store'
import { useRouter } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const router = useRouter()
const loading = false
const loginForm = reactive({
  username: 'admin',
  password: '123456',
  code: '',
  randomStr: ''
})
const code = ref({
  src: '/code',
  value: '',
  len: 4,
  type: 'image'
})
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^([a-z\u4e00-\u9fa5\d]*?)$/,
      message: '请输入小写字母',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
const commonStore = useCommonStore()
const menuStore = useMenuStore()
const website = commonStore.website
const ruleFormRef = ref<FormInstance>()
const passwordType = ref('password')
const refreshCode = () => {
  loginForm.code = ''
  loginForm.randomStr = randomLenNum(code.value.len, true)
  code.value.type === 'text'
    ? (code.value.value = randomLenNum(code.value.len))
    : (code.value.src = `${website.codeUrl}?randomStr=${loginForm.randomStr}`)
}
const showPassword = () => {
  passwordType.value === '' ? (passwordType.value = 'password') : (passwordType.value = '')
}
const handleLogin = async () => {
  const commonStore = useCommonStore()
  ruleFormRef.value.validate(async (valid: any) => {
    if (valid) {
      commonStore
        .funLoginByUsername(loginForm)
        .then(async () => {
          try {
            await menuStore.setMenu()
            router.push('/')
          } catch (e) {
            console.log('e', e)
          }
        })
        .catch(() => {
          refreshCode()
        })
    }
  })
}
onMounted(() => {
  if (website.validateCode) {
    refreshCode()
  }
})
</script>
<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="ruleFormRef"
    :model="loginForm"
    v-loading="loading"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="请输入用户名"
        clearable
      >
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="请输入密码"
        clearable
      >
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" v-if="website.validateCode">
      <el-row :span="24">
        <el-col :span="16">
          <el-input
            @keyup.enter.native="handleLogin"
            :maxlength="code.len"
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="请输入验证码"
          >
            <i slot="prefix" class="icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{
              code.value
            }}</span>
            <img :src="code.src" class="login-code-img" @click="refreshCode" v-else />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin" class="login-submit">登录 </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 30px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  text-indent: 5px;
  text-align: center;
}
</style>
