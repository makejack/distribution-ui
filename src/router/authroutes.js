// 0 管理员
// 1 账务
// 2 开发
// 3 仓库管理员
// 4 商品管理员

import Layout from '../layout'

const authRoutes = [{
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
        {
            path: '/goods',
            name: 'Goods',
            component: () => import(/* webpackChunkName: "goods" */ '../views/Goods.vue'),
            meta: {
                roles: [0, 4]
            }
        }, {
            path: '/goods/info',
            name: 'GoodsInfo',
            component: () => import(/* webpackChunkName: "goodsinfo" */ '../views/GoodsInfo.vue'),
            meta: {
                roles: [0, 4]
            }
        }, {
            path: '/goods/option',
            name: 'GoodsOption',
            component: () => import(/* webpackChunkName: "goodsoption" */ '../views/GoodsOption.vue'),
            meta: {
                roles: [0, 4]
            }
        }, {
            path: '/goods/option/data/:id',
            name: 'GoodsOptionData',
            component: () => import(/* webpackChunkName: "goodsoptiondata" */ '../views/GoodsOptionData.vue'),
            meta: {
                roles: [0, 4]
            }
        }, {
            path: '/order',
            name: "Order",
            component: () => import(/* webpackChunkName: "order" */ '../views/Order/index.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/order/:id/info',
            name: 'OrderInfo',
            component: () => import(/* webpackChunkName: "orderinfo" */ '../views/Order/Info.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/order/add',
            name: 'AddOrder',
            component: () => import(/* webpackChunkName: "addorder" */ '../views/Order/Add.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/shipment',
            name: 'Shipment',
            component: () => import(/* webpackChunkName: "shipment" */ '../views/Shipment.vue'),
            meta: {
                roles: [0, 1, 3]
            }
        }, {
            path: '/shipment/:id',
            name: 'ShipmentInfo',
            component: () => import(/* webpackChunkName: "shipmentinfo" */ '../views/ShipmentInfo.vue'),
            meta: {
                roles: [0, 1, 3]
            }
        }, {
            path: '/billing',
            name: 'BillingList',
            component: () => import(/* webpackChunkName: "billinglist" */ '../views/BillingList.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/refund',
            name: 'RefundList',
            component: () => import(/* webkpackChunkName: "refundlist" */ '../views/RefundList.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/refund/:id',
            name: 'Refund',
            component: () => import(/* webpackChunkName: "refund" */ '../views/Refund.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/customer',
            name: 'Customer',
            component: () => import(/* webpackChunkName: "customer" */ '../views/Customer.vue'),
            meta: {
                roles: [0]
            }
        }, {
            path: '/customer/:id',
            name: 'CustomerInfo',
            component: () => import(/* webpackChunkName: "customerinfo" */ '../views/CustomerInfo.vue'),
            meta: {
                roles: [0]
            }
        }, {
            path: '/withdrawal',
            name: 'WithdrawalHistory',
            component: () => import(/* webpackChunkName: "withdrawalhistory" */ '../views/WithdrawalHistory.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/withdrawal/apply',
            name: "WithdrawalApplyList",
            component: () => import(/* webkpackChunkName: "withdrawalapplylist" */ '../views/WithdrawalApplyList.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/commission',
            name: 'Commission',
            component: () => import(/* webpackChunkName: "commission" */ '../views/Commission.vue'),
            meta: {
                roles: [0, 1]
            }
        }, {
            path: '/partner/apply',
            name: 'PartnerApply',
            component: () => import(/* webpackChunkName: "partner" */ '../views/PartnerApply.vue'),
            meta: {
                roles: [0, 4]
            }
        }, {
            path: '/partner/apply/info',
            name: 'PartnerApplyInfo',
            component: () => import(/* webpackChunkName: "partnerapplyinfo" */ '../views/PartnerApplyInfo.vue'),
            meta: {
                roles: [0, 4]
            }
        }, {
            path: '/liteapp',
            name: 'LiteApp',
            component: () => import(/* webpackChunkName: "liteapp" */ '../views/LiteApp/index.vue'),
            meta: {
                roles: [0, 4]
            }
        }, {
            path: '/log',
            name: 'LogList',
            component: () => import(/* webpackChunkName: "loglist" */ '../views/LogList.vue'),
            meta: {
                roles: [0, 2]
            }
        }, {
            path: '/log/info/:id',
            name: 'Log',
            component: () => import(/* webpackChunkName: "log" */ '../views/Log.vue'),
            meta: {
                roles: [0, 2]
            }
        }, {
            path: '/log/error',
            name: 'ErrorList',
            component: () => import(/* webpackChunkName: "errorlist" */ '../views/ErrorList.vue'),
            meta: {
                roles: [0, 2]
            }
        }, {
            path: '/log/error/:id',
            name: 'Error',
            component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue'),
            meta: {
                roles: [0, 2]
            }
        }, {
            path: '/log/sms',
            name: 'SmsList',
            component: () => import(/* webpackChunkName: "smslist" */ '../views/SmsList.vue'),
            meta: {
                roles: [0, 2]
            }
        }, {
            path: '/employee',
            name: 'EmployeeList',
            component: () => import(/* webpackChunkName: "employee" */ '../views/Employee.vue'),
            meta: {
                roles: [0]
            }
        }, {
            path: '/address',
            name: 'AddressList',
            component: () => import(/* webkpackChunkName: "addresslist" */ '../views/AddressList.vue'),
            meta: {
                roles: [0]
            }
        }]
}, {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
}
]

function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.some(r => r == role);
    } else {
        return true;
    }
}

function GenerateRoutes(role) {
    return authRoutes.filter(r => {
        if (hasPermission(role, r)) {
            if (r.children && r.children.length > 0) {
                r.children = r.children.filter(c => {
                    if (hasPermission(role, c)) {
                        return c
                    }
                    return false
                });
                return r
            } else {
                return r
            }
        }
        return false;
    });
}

export {
    GenerateRoutes
}

