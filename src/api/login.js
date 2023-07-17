const scope = "server";
import request from '@/plugins/axios.js'
import website from "@/plugins/website";
import { getStore, setStore } from '@/utils/store'
import { useCommonStore } from '@/stores/common.ts'
export const loginByUsername = (username, password, code, randomStr) => {
  const grant_type = "password";
  let dataObj = { username: username, password: password };
  let basicAuth = "Basic " + window.btoa(website.formLoginClient);
  setStore({
    name: "basicAuth",
    content: basicAuth,
    type: "session",
  });
  return request({
    url: "/auth/oauth2/token",
    headers: {
      isToken: false,
      Authorization: basicAuth,
      methodType: true,
    },
    method: "post",
    params: { randomStr, code, grant_type, scope },
    data: dataObj,
  });
};

export const loginByMobile = (mobile, code) => {
  const grant_type = "app";

  let basicAuth = "Basic " + window.btoa(website.smsLoginClient);

  // 保存当前选中的 basic 认证信息
  setStore({
    name: "basicAuth",
    content: basicAuth,
    type: "session",
  });

  return request({
    url: "/auth/oauth2/token",
    headers: {
      isToken: false,
      Authorization: basicAuth,
    },
    method: "post",
    params: { mobile: mobile, code: code, grant_type, scope },
  });
};

export const refreshToken = (refresh_token) => {
  const grant_type = "refresh_token";
  // 获取当前选中的 basic 认证信息
  let basicAuth = getStore({ name: "basicAuth" });

  return request({
    url: "/auth/oauth2/token",
    headers: {
      isToken: false,
      Authorization: basicAuth,
    },
    method: "post",
    params: { refresh_token, grant_type, scope },
  });
};

export const getUserInfo = () => {
  return request({
    url: "/admin/user/info",
    method: "get",
  });
};

export const logout = () => {
  return request({
    url: "/auth/token/logout",
    method: "delete",
  });
};

/**
 * 校验令牌，若有效期小于半小时自动续期
 * @param refreshLock
 */
export const checkToken = (refreshLock, $store) => {
  const commonStore = useCommonStore()

  const token = commonStore.state.access_token;
  // 获取当前选中的 basic 认证信息
  let basicAuth = getStore({ name: "basicAuth" });

  request({
    url: "/api/auth/token/check_token",
    headers: {
      isToken: false,
      Authorization: basicAuth,
    },
    method: "get",
    params: { token },
  })
    .then((response) => {
      const expire = response && response.data && response.data.exp;
      if (expire) {
        const expiredPeriod = expire * 1000 - new Date().getTime();
        console.log("当前token过期时间", expiredPeriod, "毫秒");
        //小于半小时自动续约
        if (expiredPeriod <= website.remainingTime) {
          if (!refreshLock) {
            refreshLock = true;
            commonStore.RefreshToken().then(res => {
              // clearInterval(this.refreshTime);
            })
            refreshLock = false;
          }
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * 注册用户
 */
export const registerUser = (userInfo) => {
  return request({
    url: "/admin/register/user",
    method: "post",
    data: userInfo,
  });
};
