import mapping from './mapping'
import * as CryptoJS from "crypto-js";


export const serialize = (data) => {
  let list = [];
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join("&");
};

// 数据合并
export function mergeRecursive(source, target) {
  for (let index in target) {
    try {
      if (target[index].constructor === Object) {
        source[index] = mergeRecursive(source[index], target[index]);
      } else {
        source[index] = target[index];
      }
    } catch (e) {
      source[index] = target[index];
    }
  }
  return source;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return "";
  }
  let actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value === "" + value) {
      actions.push(datas[key].label);
      return true;
    }
  });
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join("");
}



export const closeTag = (that) => {
  store.commit("DEL_TAG", store.getters.tag);
  router.go(-1);
};

export const getObjType = (obj) => {
  var toString = Object.prototype.toString;
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = (data) => {
  var type = getObjType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close;
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object;
    var t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + " grayMode";
  } else {
    document.body.className = document.body.className.replace(" grayMode", "");
  }
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name;
};

/**
 *加密处理
 */
export const encryption = (params) => {
  let { data, type, param, key } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === "Base64") {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach((ele) => {
      var data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      var iv = key;
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
      });
      result[ele] = encrypted.toString();
    });
  }
  return result;
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback();
  }

  document.addEventListener("fullscreenchange", function () {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    listen();
  });
  document.addEventListener("msfullscreenchange", function () {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return (
    document.isFullScreen ||
    document.mozIsFullScreen ||
    document.webkitIsFullScreen
  );
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id);
          }
        }
      }
    }
  }
};

/**
 * 动态插入css
 */

export const loadStyle = (url) => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true;
  Object.keys(a).forEach((ele) => {
    const type = typeof a[ele];
    if (type === "string" && a[ele] !== b[ele]) result = false;
    else if (
      type === "object" &&
      JSON.stringify(a[ele]) !== JSON.stringify(b[ele])
    )
      result = false;
  });
  return result;
};
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = "";
  if (validatenull(dic)) return value;
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    let index = 0;
    index = findArray(dic, value);
    if (index != -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach((ele) => {
      index = findArray(dic, ele);
      if (index != -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
    }
  }
  return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4);
  if (date) random = random + Date.now();
  return random;
};

/**
 *
 * @param url 目标下载接口
 * @param query 查询参数
 * @param fileName 文件名称
 * @returns {*}
 */
export function downBlobFile(url, query, fileName, method = "get") {
  return request({
    url: url,
    method: method,
    responseType: "blob",
    params: query,
  }).then((response) => {
    // 处理返回的文件流
    const blob = response.data;
    if (blob && blob.size === 0) {
      this.$notify.error("内容为空，无法下载");
      return;
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(blob);
      document.body.removeChild(link);
    }, 0);
  });
}

/**
 * Task status
 * @id id
 * @desc tooltip
 * @color color
 * @icon icon
 * @isSpin is loading (Need to execute the code block to write if judgment)
 */
export const tasksState = (t) => ({
  SUBMITTED_SUCCESS: {
    id: 0,
    desc: `${t("project.workflow.submit_success")}`,
    color: "#A9A9A9",
    isSpin: false,
    classNames: "submitted_success",
  },
  RUNNING_EXECUTION: {
    id: 1,
    desc: `${t("project.workflow.executing")}`,
    color: "#0097e0",
    isSpin: true,
    classNames: "running_execution",
  },
  READY_PAUSE: {
    id: 2,
    desc: `${t("project.workflow.ready_to_pause")}`,
    color: "#07b1a3",
    isSpin: false,
    classNames: "ready_pause",
  },
  PAUSE: {
    id: 3,
    desc: `${t("project.workflow.pause")}`,
    color: "#057c72",
    isSpin: false,
    classNames: "pause",
  },
  READY_STOP: {
    id: 4,
    desc: `${t("project.workflow.ready_to_stop")}`,
    color: "#FE0402",
    isSpin: false,
    classNames: "ready_stop",
  },
  STOP: {
    id: 5,
    desc: `${t("project.workflow.stop")}`,
    color: "#e90101",
    isSpin: false,
    classNames: "stop",
  },
  FAILURE: {
    id: 6,
    desc: `${t("project.workflow.failed")}`,
    color: "#000000",
    isSpin: false,
    classNames: "failed",
  },
  SUCCESS: {
    id: 7,
    desc: `${t("project.workflow.success")}`,
    color: "#95DF96",
    isSpin: false,
    classNames: "success",
  },
  NEED_FAULT_TOLERANCE: {
    id: 8,
    desc: `${t("project.workflow.need_fault_tolerance")}`,
    color: "#FF8C00",
    isSpin: false,
    classNames: "need_fault_tolerance",
  },
  KILL: {
    id: 9,
    desc: `${t("project.workflow.kill")}`,
    color: "#a70202",
    isSpin: false,
    classNames: "kill",
  },
  WAITING_THREAD: {
    id: 10,
    desc: `${t("project.workflow.waiting_for_thread")}`,
    color: "#912eed",
    isSpin: false,
    classNames: "waiting_thread",
  },
  WAITING_DEPEND: {
    id: 11,
    desc: `${t("project.workflow.waiting_for_dependence")}`,
    color: "#5101be",
    isSpin: false,
    classNames: "waiting_depend",
  },
  DELAY_EXECUTION: {
    id: 12,
    desc: `${t("project.workflow.delay_execution")}`,
    color: "#5102ce",
    isSpin: false,
    classNames: "delay_execution",
  },
  FORCED_SUCCESS: {
    id: 13,
    desc: `${t("project.workflow.forced_success")}`,
    color: "#5102ce",
    isSpin: false,
    classNames: "forced_success",
  },
  SERIAL_WAIT: {
    id: 14,
    desc: `${t("project.workflow.serial_wait")}`,
    color: "#5102ce",
    isSpin: true,
    classNames: "serial_wait",
  },
  DISPATCH: {
    id: 15,
    desc: `${t("project.workflow.dispatch")}`,
    color: "#5101be",
    isSpin: false,
    classNames: "dispatch",
  },
  PENDING: {
    id: 18,
    desc: `${t("project.workflow.pending")}`,
    color: "#5101be",
    isSpin: false,
    classNames: "pending",
  },
});

export const truncateText = (text, n) => {
  const exp = /[\u4E00-\u9FA5]/;
  let res = "";
  let len = text.length;
  const chinese = text.match(new RegExp(exp, "g"));
  if (chinese) {
    len += chinese.length;
  }
  if (len > n) {
    let i = 0;
    let acc = 0;
    while (true) {
      const char = text[i];
      if (exp.test(char)) {
        acc += 2;
      } else {
        acc++;
      }
      if (acc > n) break;
      res += char;
      i++;
    }
    res += "...";
  } else {
    res = text;
  }
  return res;
};

/**
 * A simple uuid generator, support prefix and template pattern.
 *
 * @example
 *
 *  uuid('v-') // -> v-xxx
 *  uuid('v-ani-%{s}-translate')  // -> v-ani-xxx
 */
export function uuid(prefix) {
  const id = Math.floor(Math.random() * 10000).toString(36);
  return prefix
    ? ~prefix.indexOf("%{s}")
      ? prefix.replace(/%\{s\}/g, id)
      : prefix + id
    : id;
}

export function formatValidate(validate) {
  if (!validate) return {};
  if (Array.isArray(validate)) {
    validate.forEach((item) => {
      if (!item.message) delete item.message;
      return item;
    });
  }
  if (!validate.message) delete validate.message;
  return validate;
}

export const runningType = (t) => [
  {
    desc: `${t("project.workflow.start_process")}`,
    code: "START_PROCESS",
  },
  {
    desc: `${t("project.workflow.execute_from_the_current_node")}`,
    code: "START_CURRENT_TASK_PROCESS",
  },
  {
    desc: `${t("project.workflow.recover_tolerance_fault_process")}`,
    code: "RECOVER_TOLERANCE_FAULT_PROCESS",
  },
  {
    desc: `${t("project.workflow.resume_the_suspension_process")}`,
    code: "RECOVER_SUSPENDED_PROCESS",
  },
  {
    desc: `${t("project.workflow.execute_from_the_failed_nodes")}`,
    code: "START_FAILURE_TASK_PROCESS",
  },
  {
    desc: `${t("project.workflow.complement_data")}`,
    code: "COMPLEMENT_DATA",
  },
  {
    desc: `${t("project.workflow.scheduling_execution")}`,
    code: "SCHEDULER",
  },
  {
    desc: `${t("project.workflow.rerun")}`,
    code: "REPEAT_RUNNING",
  },
  {
    desc: `${t("project.workflow.pause")}`,
    code: "PAUSE",
  },
  {
    desc: `${t("project.workflow.stop")}`,
    code: "STOP",
  },
  {
    desc: `${t("project.workflow.recovery_waiting_thread")}`,
    code: "RECOVER_WAITING_THREAD",
  },
  {
    desc: `${t("project.workflow.recover_serial_wait")}`,
    code: "RECOVER_SERIAL_WAIT",
  },
];

export const warningTypeList = [
  {
    id: "NONE",
    code: "project.workflow.none_send",
  },
  {
    id: "SUCCESS",
    code: "project.workflow.success_send",
  },
  {
    id: "FAILURE",
    code: "project.workflow.failure_send",
  },
  {
    id: "ALL",
    code: "project.workflow.all_send",
  },
];

export const copy = (text) => {
  const inp = document.createElement("input");
  document.body.appendChild(inp);
  inp.value = text;
  inp.select();
  let result = false;
  try {
    result = document.execCommand("copy");
  } catch (err) { }
  inp.remove();
  return result;
};
export const removeUselessChildren = (list) => {
  if (!list.length) return;
  list.forEach((item) => {
    if (item.dirctory && item.children?.length === 0) item.disabled = true;
    if (!item.children) return;
    if (item.children.length === 0) {
      delete item.children;
      return;
    }
    removeUselessChildren(item.children);
  });
};

export const fileTypeArr = [
  "txt",
  "log",
  "sh",
  "bat",
  "conf",
  "cfg",
  "py",
  "java",
  "sql",
  "xml",
  "hql",
  "properties",
  "json",
  "yml",
  "yaml",
  "ini",
  "js",
];
// 数组数据转换
export const filterList = (list) => {
  return list.map((e) => {
    delete e?.$cellEdit;
    delete e?.$index;
    return e;
  });
};

export const exportFun = () => {
  return {
    filterList,
  };
};

const utils = {
  mapping,
}

export default utils
