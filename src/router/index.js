import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tree',
    name: 'Tree',
    component: () => import('../components/Tree.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../components/Table.vue')
  },
  {
    path: '/vxe',
    name: 'Vxe',
    component: () => import('../components/VxeTable.vue')
  },
  {
    path: '/mind',
    name: 'Mind',
    component: () => import('../views/mind/index.vue')
  },
  {
    path: '/export2excel',
    name: 'Export2Excel',
    component: () => import(/* webpackChunkName: "export2excel" */ '../views/funs/Export2Excel.vue')
  },
  {
    path: '/multipleSheetexport2excel',
    name: 'MultipleSheetExport2Excel',
    component: () => import(/* webpackChunkName: "multipleSheetexport2excel" */ '../views/funs/MultipleSheetExport2Excel.vue')
  },
  {
    path: '/dom2excel',
    name: 'Dom2Excel',
    component: () => import(/* webpackChunkName: "dom2excel" */ '../views/funs/Dom2Excel.vue')
  },
  {
    path: '/orgtree',
    name: 'OrgTree',
    component: () => import(/* webpackChunkName: "orgtree" */ '../views/funs/OrgTree.vue')
  },
  {
    path: '/gquilleditor',
    name: 'GlobalQuillEditor',
    component: () => import(/* webpackChunkName: "gquilleditor" */ '../views/funs/GlobalQuillEditor.vue')
  },
  {
    path: '/lquilleditor',
    name: 'LocalQuillEditor',
    component: () => import(/* webpackChunkName: "lquilleditor" */ '../views/funs/LocalQuillEditor.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/helloWorld',
    name: 'HelloWorld',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HelloWorld.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
