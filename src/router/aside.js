// 0 管理员
// 1 账务
// 2 开发
// 3 仓库管理员
// 4 商品管理员

const menu = [
    {
        title: '商品管理',
        icon: 'el-icon-goods',
        roles: [0, 4],
        children: [{
            title: '商品列表',
            path: '/goods',
            roles: [0, 4]
        }, {
            title: '商品选项',
            path: '/goods/option',
            roles: [0, 4]
        }]
    }, {
        title: '销售管理',
        icon: 'el-icon-shopping-cart-full',
        roles: [0, 1, 3],
        children: [{
            title: '人员',
            path: '/customer',
            roles: [0]
        }, {
            title: '订单',
            path: '/order',
            roles: [0, 1]
        }, {
            title: '装货',
            path: '/shipment',
            roles: [0, 1, 3]
        }, {
            title: '退款',
            path: '/refund',
            roles: [0, 1]
        }, {
            title: '票据',
            path: '/billing',
            roles: [0, 1]
        }]
    }, {
        title: '记录管理',
        icon: 'el-icon-tickets',
        roles: [0, 1],
        children: [{
            title: '提现申请',
            path: '/withdrawal/apply',
            roles: [0, 1]
        }, {
            title: '提现记录',
            path: '/withdrawal',
            roles: [0, 1]
        }, {
            title: '佣金',
            path: '/commission',
            roles: [0, 1]
        }]
    }, {
        title: '设置',
        icon: 'el-icon-setting',
        roles: [0, 4],
        children: [{
            title: '合伙人',
            path: '/partner/apply',
            roles: [0, 4]
        }, {
            title: '小程序',
            path: '/liteapp',
            roles: [0, 4]
        }]
    }, {
        title: '系统',
        icon: 'el-icon-set-up',
        roles: [0, 2],
        children: [{
            title: '员工管理',
            path: '/employee',
            roles: [0]
        }, {
            title: '地址管理',
            path: '/address',
            roles: [0]
        }, {
            title: '错误日志',
            path: '/log/error',
            roles: [0, 2]
        }, {
            title: '请求日志',
            path: '/log',
            roles: [0, 2]
        }, {
            title: '短信日志',
            path: '/log/sms',
            roles: [0, 2]
        }]
    }
]

function hasPermission(role, menu) {
    return menu.roles.some(r => r == role);
}

function GenerateMenu(role) {
    return menu.filter(m => {
        if (hasPermission(role, m)) {
            if (m.children && m.children.length > 0) {
                m.children = m.children.filter(c => {
                    if (hasPermission(role, c)) {
                        return c
                    }
                    return false
                });
                return m
            } else {
                return m
            }
        }
        return false;
    });
}

export {
    GenerateMenu
}