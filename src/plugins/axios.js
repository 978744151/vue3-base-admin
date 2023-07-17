import axios from "axios";
import { serialize } from "@/utils";
import NProgress from "nprogress"; // progress bar
import errorCode from "@/plugins/errorCode";
import { ElMessage, ElMessageBox } from "element-plus";
import "nprogress/nprogress.css";
import { getStore, setStore } from '@/utils/store'
import qs from "qs";
import { useCommonStore } from '@/stores/common.ts'
import { useRouter } from 'vue-router'
// import store from "@/store"; // progress bar style
axios.defaults.timeout = 30000;
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false,
});

// HTTPrequest拦截
axios.interceptors.request.use(
  (config) => {
    console.log(config)
    const commonStore = useCommonStore()
    const isToken = (config.headers || {}).isToken === false;
    const token = commonStore.state.access_token || getStore({ name: "access_token" });
    NProgress.start();
    config.url = '/api' + config.url
    if (token && !isToken) {
      config.headers["Authorization"] = "Bearer " + token; // token
    }
    if (config.headers.methodType) {
      config.transformRequest = (params) => {
        if (params) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        } else {
          return params;
        }
      };
    }
    // headers中配置serialize为true开启序列化
    if (config.methods === "post" && config.headers.serialize) {
      config.data = serialize(config.data);
      delete config.data.serialize;
    }

    // 处理get 请求的数组 springmvc 可以处理
    if (config.method === "get") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const instancs = axios.create({
  baseURL: '/api',
});
// HTTPresponse拦截
axios.interceptors.response.use(
  (res) => {
    NProgress.done();
    const status = Number(res.status) || 200;
    const errorCode = [1, 50023, 10001, 50021, 9999, 9];
    const commonStore = useCommonStore()
    const message = res.data.msg || errorCode[status] || errorCode["default"];
    // 后台定义 424 针对令牌过去的特殊响应码
    if (status === 424) {
      ElMessageBox.confirm("令牌状态已过期，请点击重新登录", "系统提示", {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // store.dispatch("LogOut").then(() => {
          //   // 刷新登录页面，避免多次弹框
          //   window.location.reload();
          // });
          console.log(commonStore)
          commonStore.loginOut()
        })
        .catch(() => { });
      return;
    }
    if (status === 401) {
      ElMessageBox.confirm("令牌状态已过期，请点击重新登录", "系统提示", {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          commonStore.loginOut()

        })
        .catch(() => { });
      return;
    }
    if (status !== 200 || errorCode.includes(res.data.code)) {
      ElMessage({
        message: message || res.data.data,
        type: "error",
      });
      NProgress.done();
      return Promise.reject(new Error(message));
    }

    return res;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);

export default axios;
