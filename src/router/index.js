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
      path: '/goods',
      name: 'Goods',
      component: () => import(/* webpackChunkName: "goods" */ '../views/Goods.vue')
    }, {
      path: '/goods/info',
      name: 'GoodsInfo',
      component: () => import(/* webpackChunkName: "goodsinfo" */ '../views/GoodsInfo.vue')
    }, {
      path: '/goods/option',
      name: 'GoodsOption',
      component: () => import(/* webpackChunkName: "goodsoption" */ '../views/GoodsOption.vue')
    }, {
      path: '/goods/option/data/:id',
      name: 'GoodsOptionData',
      component: () => import(/* webpackChunkName: "goodsoptiondata" */ '../views/GoodsOptionData.vue')
    }, {
      path: '/order',
      name: "Order",
      component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
    }, {
      path: '/order/:id',
      name: 'OrderInfo',
      component: () => import(/* webpackChunkName: "orderinfo" */ '../views/OrderInfo.vue')
    }, {
      path: '/shipment',
      name: 'Shipment',
      component: () => import(/* webpackChunkName: "shipment" */ '../views/Shipment.vue')
    }, {
      path: '/shipment/:id',
      name: 'ShipmentInfo',
      component: () => import(/* webpackChunkName: "shipmentinfo" */ '../views/ShipmentInfo.vue')
    }, {
      path: '/billing',
      name: 'BillingList',
      component: () => import(/* webpackChunkName: "billinglist" */ '../views/BillingList.vue')
    }, {
      path: '/refund',
      name: 'RefundList',
      component: () => import(/* webkpackChunkName: "refundlist" */ '../views/RefundList.vue')
    }, {
      path: '/refund/:id',
      name: 'Refund',
      component: () => import(/* webpackChunkName: "refund" */ '../views/Refund.vue')
    }, {
      path: '/customer',
      name: 'Customer',
      component: () => import(/* webpackChunkName: "customer" */ '../views/Customer.vue')
    }, {
      path: '/customer/:id',
      name: 'CustomerInfo',
      component: () => import(/* webpackChunkName: "customerinfo" */ '../views/CustomerInfo.vue')
    }, {
      path: '/withdrawal',
      name: 'WithdrawalHistory',
      component: () => import(/* webpackChunkName: "withdrawalhistory" */ '../views/WithdrawalHistory.vue')
    }, {
      path: '/withdrawal/apply',
      name: "WithdrawalApplyList",
      component: () => import(/* webkpackChunkName: "withdrawalapplylist" */ '../views/WithdrawalApplyList.vue')
    }, {
      path: '/commission',
      name: 'Commission',
      component: () => import(/* webpackChunkName: "commission" */ '../views/Commission.vue')
    }, {
      path: '/partner/apply',
      name: 'PartnerApply',
      component: () => import(/* webpackChunkName: "partner" */ '../views/PartnerApply.vue')
    }, {
      path: '/partner/apply/info',
      name: 'PartnerApplyInfo',
      component: () => import(/* webpackChunkName: "aartnerapplyinfo" */ '../views/PartnerApplyInfo.vue')
    }, {
      path: '/user/changepwd',
      name: 'ChnagePwd',
      component: () => import(/* webpackChunkName: "changepwd" */ '../views/ChangePwd.vue')
    }, {
      path: '/log',
      name: 'LogList',
      component: () => import(/* webpackChunkName: "loglist" */ '../views/LogList.vue')
    }, {
      path: '/log/info/:id',
      name: 'Log',
      component: () => import(/* webpackChunkName: "log" */ '../views/Log.vue')
    }, {
      path: '/log/error',
      name: 'ErrorList',
      component: () => import(/* webpackChunkName: "errorlist" */ '../views/ErrorList.vue')
    }, {
      path: '/log/error/:id',
      name: 'Error',
      component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
    }, {
      path: '/log/sms',
      name: 'SmsList',
      component: () => import(/* webpackChunkName: "smslist" */ '../views/SmsList.vue')
    }, {
      path: '/employee',
      name: 'EmployeeList',
      component: () => import(/* webpackChunkName: "employee" */ '../views/Employee.vue')
    }, {
      path: '/address',
      name: 'AddressList',
      component: () => import(/* webkpackChunkName: "addresslist" */ '../views/AddressList.vue')
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }, {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
