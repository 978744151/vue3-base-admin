/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import request from '@/plugins/axios.js'
const api = ''
export function fetchList(query) {
  return request({
    url: api + "/admin/dict/page",
    method: "get",
    params: query,
  });
}

export function fetchItemList(query) {
  return request({
    url: api + "/admin/dict/item/page",
    method: "get",
    params: query,
  });
}

export function addItemObj(obj) {
  return request({
    url: api + "/admin/dict/item",
    method: "post",
    data: obj,
  });
}

export function getItemObj(id) {
  return request({
    url: api + "/admin/dict/item/" + id,
    method: "get",
  });
}

export function delItemObj(id) {
  return request({
    url: api + "/admin/dict/item/" + id,
    method: "delete",
  });
}

export function putItemObj(obj) {
  return request({
    url: api + "/admin/dict/item",
    method: "put",
    data: obj,
  });
}

export function addObj(obj) {
  return request({
    url: api + "/admin/dict/",
    method: "post",
    data: obj,
  });
}

export function getObj(id) {
  return request({
    url: api + "/admin/dict/" + id,
    method: "get",
  });
}

export function delObj(row) {
  return request({
    url: api + "/admin/dict/" + row.id,
    method: "delete",
  });
}

export function putObj(obj) {
  return request({
    url: api + "/admin/dict/",
    method: "put",
    data: obj,
  });
}

export function remote(type) {
  return request({
    url: api + "/admin/dict/type/" + type,
    method: "get",
  });
}
export function remoteUrl(data) {
  const { dicUrl, dicMethod, dicQueryConfig } = data;
  console.log(dicMethod);
  let req = {};
  let query = {};
  if (dicMethod === "get") {
    req = {
      url: dicUrl,
      method: dicMethod,
    };
  } else {
    dicQueryConfig.forEach((q) => {
      if (q.key && q.value) query[q.key] = q.value;
    });
    req = {
      url: dicUrl,
      method: dicMethod,
      data: query,
    };
  }
  return request(req);
}
export function clearDictCache() {
  return request({
    url: api + "/admin/dict/cache",
    method: "delete",
  });
}
