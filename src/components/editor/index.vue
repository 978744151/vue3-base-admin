<template>
  <div class="jqp-amis-editor">
    <div class="jqp-amis-editor-header" ref="renderBox"></div>
    <AmisEditor
      :className="className"
      id="editorName"
      :value="schema"
      @change="onChange"
      theme="antd"
      @preview="hanldePreview"
      :preview="isPreview"
      :isMobile="isMobile"
      @onChange="hanldeChange"
    />
    <Shortcut />
  </div>
</template>
<script setup>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'
import 'amis/lib/themes/default.css'
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import 'amis-editor-core/lib/style.css'
import 'amis-ui/lib/themes/antd.css'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { createApp, onMounted, ref, h, nextTick } from 'vue' //必须有
import { render as renderAmis, render as renderSchema } from 'amis'
import { applyReactInVue, applyPureReactInVue } from 'veaury'
import { Editor, ShortcutKey } from 'amis-editor'
import { useRouter } from 'vue-router'

// import VueUniArea from '@/components/uecharts.vue'
// import uecharts from '@/components/uecharts.tsx'
// const AmisUe = applyPureReactInVue(uecharts)
const router = useRouter()
const AmisEditor = applyPureReactInVue(Editor)

const Shortcut = applyPureReactInVue(ShortcutKey)

const className = 'jqp-amis-editor-body'
const renderBox = ref('renderBox')
const render = ref('render')
const isPreview = ref(false)
const isMobile = ref(false)
const schema = ref({})
const headerSchema = ref({})

const onChange = () => {}
const hanldePreview = (e) => {
  isPreview.value = e
}
const hanldeChange = (e) => {
  schema.value = e
}
const setMobile = (e) => {
  isMobile.value = e
}

onMounted(async () => {
  headerSchema.value = {
    type: 'form',
    mode: 'inline',
    title: '',
    wrapWithPanel: false,
    body: [
      {
        type: 'plain',
        text: '风云低代码平台',
        className: 'page-name'
      },
      {
        type: 'switch',
        option: '预览',
        name: 'preview',
        onChange: function (v) {
          hanldePreview(v)
        }
      },
      {
        type: 'switch',
        option: '移动端',
        name: 'mobile',
        onChange: function (v) {
          setMobile(v)
        }
      },
      {
        type: 'button',
        label: '保存',
        level: 'primary',
        onClick: function () {
          onSave()
        }
      },
      {
        type: 'button',
        label: '退出',
        level: 'danger',
        onClick: function () {
          router.back()
        }
      }
    ]
  }
  const env = {
    confirm: (msg) => amisAlert(msg, '系统提示')
    // 其他配置实现...
  }

  ReactDOM.render(
    renderSchema(
      headerSchema.value,
      {
        theme: 'antd'
      },
      env
    ),
    renderBox.value
  )
})
</script>

<style lang="scss">
@import '@/assets/style.scss';
.about {
  height: 100%;
}

/* 解决 amis-editor icon 图标过大 */
.editor-right-panel .editorPanel-tabs .editorPanel-tabs-header > li > a .editor-tab-icon > svg {
  font-size: 16px !important;
  width: 16px;
  height: auto;
  margin-bottom: 0 !important;
  color: #151b26;
}
.jqp-amis-editor,
.jqp-amis-editor-body {
  height: calc(100% - 40px) !important;
  * {
    box-sizing: border-box;
  }
}
.jqp-amis-editor-header {
  padding: 10px;
  padding-bottom: 0px;
  border-bottom: 1px solid #ddd;
}
.page-name {
  font-size: 20px;
  font-weight: bold;
}
</style>
