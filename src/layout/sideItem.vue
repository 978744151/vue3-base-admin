<template>
  <div class="menu-wrapper">
    <template v-for="item in menu" :key="item.id">
      <el-menu-item
        v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
        :index="item['path']"
        @click="open(item)"
        :key="item[labelKey]"
      >
        <svg-icon :icon-class="item[iconKey]"></svg-icon>
        <span slot="title" :alt="item[pathKey]">{{ item[labelKey] }}</span>
      </el-menu-item>
      <el-sub-menu
        v-if="!validatenull(item[childrenKey]) && vaildRoles(item)"
        :index="item['path']"
        :key="item[labelKey]"
      >
        <template #title>
          <i :class="item[iconKey]"></i>
          <span slot="title" class="m-l-5" :class="{ 'el-menu--display': collapse && first }">{{
            item[labelKey]
          }}</span>
        </template>
        <template v-for="(child, cindex) in item[childrenKey]" :key="child.id">
          <el-menu-item
            @click="open(child)"
            v-if="validatenull(child[childrenKey])"
            :key="child[labelKey]"
          >
            <i :class="child[iconKey]"></i>
            <span slot="title m-l-5">{{ child[labelKey] }}</span>
          </el-menu-item>
          <sidebar-item
            v-else
            :menu="[child]"
            :key="cindex"
            :props="props"
            :screen="screen"
            :collapse="collapse"
          ></sidebar-item>
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import { validatenull } from '@/utils/validate'
const config = {
  label: 'label',
  path: 'path',
  icon: 'icon',
  children: 'children'
}
export default {
  name: 'sidebarItem',
  data() {
    return {
      config: config
    }
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    screen: {
      type: Number
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          path: 'path',
          icon: 'icon',
          children: 'children'
        }
      }
    },
    collapse: {
      type: Boolean
    }
  },
  created() {},
  mounted() {},
  computed: {
    // ...mapGetters(['roles']),
    labelKey() {
      return this.props.label || this.config.propsDefault.label
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route)
    }
  },
  methods: {
    vaildRoles(item) {
      item.meta = item.meta || {}
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true
    },
    validatenull(val) {
      return validatenull(val)
    },
    open(item) {
      console.log(item.path)
      this.$router.push('/' + item.path)
    }
  }
}
</script>
