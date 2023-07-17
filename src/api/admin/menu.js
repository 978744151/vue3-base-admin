import request from '@/plugins/axios.js'
const api = ''
export function getMenu(id) {
  return request({
    url: api + '/admin/menu',
    params: { parentId: id },
    method: 'get'
  })
}

export function fetchMenuTree(lazy, parentId) {
  return request({
    url: api + '/admin/menu/tree',
    method: 'get',
    params: { lazy: lazy, parentId: parentId }
  })
}

export function addObj(obj) {
  return request({
    url: api + '/admin/menu',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: api + '/admin/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: api + '/admin/menu/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: api + '/admin/menu',
    method: 'put',
    data: obj
  })
}

export function clearMenuCache() {
  return request({
    url: api + '/admin/menu/cache',
    method: 'delete'
  })
}

