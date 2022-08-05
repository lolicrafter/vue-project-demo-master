import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon-font/iconfont.css'

import Vue2OrgTree from 'vue2-org-tree'
import 'vue2-org-tree/dist/style.css'
import VueTreeList from 'vue-tree-list'
// import rightMenu from 'vue-right-click-menu'
import rightMenu from './utils/rightMenu'
import dayjs from 'dayjs' // 引入日期工具库
import pipeMethod from './utils/pipe' // 引入全局管道模块
import './styles/common.less' // 引入全局样式文件

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
// 全局挂载 VueQuillEditor
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.prototype.$DayTime = dayjs

Vue.use(VXETable)

for (const key in pipeMethod) {
  // 全局管道
  Vue.filter(key, pipeMethod[key])
}
Vue.use(VueTreeList)
Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.use(Vue2OrgTree)
Vue.use(VueQuillEditor)
Vue.use(rightMenu)
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
