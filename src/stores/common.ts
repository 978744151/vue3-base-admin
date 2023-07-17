import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import website from '@/plugins/website'
import { encryption } from '@/utils'
import { getStore, removeStore, setStore } from '@/utils/store'
import router from '@/router'
import { getUserInfo, loginByUsername, loginByMobile, logout, refreshToken } from '@/api/login'
export const useCommonStore = defineStore('common', () => {
  const state = reactive({
    access_token:
      getStore({
        name: 'access_token'
      }) || '',
    refresh_token: '',
    isLock: false,
    lockPasswd: ''
  })
  const funLoginByUsername = (userInfo: any) => {
    const user = encryption({
      data: userInfo,
      key: 'fengyuntec123456',
      param: ['password']
    })
    return new Promise((resolve: any, reject) => {
      loginByUsername(user.username, user.password, user.code, user.randomStr)
        .then((response: any) => {
          console.log(response)
          const data = response.data
          state.access_token = data.access_token
          state.refresh_token = data.refresh_token
          setToken()
          resolve()
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  const setToken = () => {
    setStore({
      name: 'access_token',
      content: state.access_token,
      type: 'session'
    })
    setStore({
      name: 'refresh_token',
      content: state.refresh_token,
      type: 'session'
    })
  }
  const loginOut = () => {
    state.access_token = ''
    state.refresh_token = ''
    CLEAR_LOCK()
    setToken()
    router.push('/login')
  }
  // 刷新token
  const RefreshToken = () => {
    return new Promise((resolve: any, reject) => {
      refreshToken(state.refresh_token)
        .then((response: any) => {
          const data = response.data
          state.access_token = data.access_token
          state.refresh_token = data.refresh_token
          setToken()
          CLEAR_LOCK()
          resolve()
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  const CLEAR_LOCK = () => {
    state.isLock = false
    state.lockPasswd = ''
    removeStore({
      name: 'lockPasswd'
    })
    removeStore({
      name: 'isLock'
    })
  }
  return { website, state, funLoginByUsername, loginOut, RefreshToken, setToken }
})
