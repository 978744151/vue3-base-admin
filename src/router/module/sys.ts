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
// import menu from '@/views/sys'
// All TSX files under the views folder automatically generate mapping relationship
const modules = import.meta.glob('/src/views/**/**.vue')
const components: { [key: string]: Component } = utils.mapping(modules)

export default [
  {
    path: '/sys/admin/menu',
    name: 'menu',
    component: components['sys-admin-menu'],
    meta: {
      title: 'menu',
      activeMenu: 'menu',
      showSide: true,
      auth: []
    }
  },
  {
    path: '/sys/admin/user',
    name: 'user',
    component: components['sys-admin-user'],
    meta: {
      title: 'user',
      activeMenu: 'user',
      showSide: true,
      auth: []
    }
  },
  {
    path: '/sys/admin/role',
    name: 'role',
    component: components['sys-admin-role'],
    meta: {
      title: 'role',
      activeMenu: 'role',
      showSide: true,
      auth: []
    }
  },
  {
    path: '/sys/admin/dept',
    name: 'dept',
    component: components['sys-admin-dept'],
    meta: {
      title: 'dept',
      activeMenu: 'dept',
      showSide: true,
      auth: []
    }
  },
  {
    path: '/sys/admin/dict',
    name: 'dict',
    component: components['sys-admin-dict'],
    meta: {
      title: 'dict',
      activeMenu: 'dict',
      showSide: true,
      auth: []
    }
  }
]
