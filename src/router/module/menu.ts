/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Component } from 'vue'
import utils from '@/utils'
import { getStore, removeStore, setStore } from '@/utils/store'

// import menu from '@/views/sys'
// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.vue')
const components: { [key: string]: Component } = utils.mapping(modules)
const menu = getStore({ name: 'menu' })
const forEachRoute = (element: any) => {
  const componentName = element.path?.replaceAll('/', '-')
  return {
    path: '/' + element.path,
    name: element.name,
    component: components[componentName],
    children: element.children,
    meta: {
      title: element.name,
      activeMenu: element.id,
      showSide: true,
      auth: []
    }
  }
}

const getChildren = (list: any = []) => {
  list.map((item: any, i: Number) => {
    if (item.children && item.type === '0') {
      const map: any = forEachRoute(item)
      item = Object.assign(item, map)
      getChildren(item.children)
    } else {
      const map: any = forEachRoute(item)
      item = Object.assign(item, map)
    }
  })
  return list
}
const menuList = getChildren([menu[0]] || [])
console.log(menuList)

export default menuList
