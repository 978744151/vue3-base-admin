

import request from '@/plugins/axios.js'

const api = ''
export function setWorkFlowData(data) {
  return request({
    url: '/',
    method: 'post',
    data
  })
}
export function getWorkFlowData(query) {
  return request({
    url: '/data.json',
    method: 'get',
    params: query
  })
}
export function getRoles(query) {
  return request({
    url: '/roles.json',
    method: 'get',
    params: query
  })
}
/**
 * 获取部门
 * @param {*} data 
 * @returns 
 */
export function getDepartments(query) {
  return request({
    url: '/departments.json',
    method: 'get',
    params: query
  })
}




/**
 * 获取职员
 * @param {*} data 
 * @returns 
 */
export function getEmployees(query) {
  return request({
    url: '/employees.json',
    method: 'get',
    params: query
  })
}

/**
 * 获取条件字段
 * @param {*} data 
 * @returns 
 */
export function getConditions(query) {
  return request({
    url: '/conditions.json',
    method: 'get',
    params: query
  })
}


