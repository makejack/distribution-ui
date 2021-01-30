import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    }, {
      path: '/user/changepwd',
      name: 'ChnagePwd',
      component: () => import(/* webpackChunkName: "changepwd" */ '../views/ChangePwd.vue')
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }, {
    path: '/forget',
    name: 'Forget',
    component: () => import(/* webpackChunkName: "forget" */ '../views/Forget.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
