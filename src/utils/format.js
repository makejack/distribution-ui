
import { orderStatus, paymentMethod, paymentType, shippingStatus, roles, partnerApplyTypes, commissionStatus, employeeRoles } from './constant'

export function formatPaymentType(value) {
    // var type = paymentType.find(item => {
    //     item.id == paymentType
    // });
    // if (type) {
    //     return type.text
    // }
    return getConstantText(value, paymentType)
}

export function formatPaymentMethod(value) {
    // switch (paymentMethod) {
    //     case 0:
    //         return "微信支付";
    // }
    return getConstantText(value, paymentMethod)
}

export function formatOrderStatus(value) {
    // switch (orderStatus) {
    //     case 0:
    //         return "已取消";
    //     case 1:
    //         return "待付款";
    //     case 2:
    //         return "支付失败";
    //     case 3:
    //         return "已付款";
    //     case 200:
    //         return "完成";
    // }
    return getConstantText(value, orderStatus)
}

export function formatShippingStatus(value) {
    // switch (shippingStatus) {
    //     case 0:
    //         return "暂存";
    //     case 1:
    //         return "完成";
    //     case 100:
    //         return "等待发货";
    //     case 101:
    //         return "已出货";
    // }

    return getConstantText(value, shippingStatus)
}

export function formatRole(value) {
    return getConstantText(value, roles);
}

export function formatPartnerApplyTypes(value) {
    return getConstantText(value, partnerApplyTypes)
}

export function formatCommissionStatus(value) {
    return getConstantText(value, commissionStatus)
}

export function formatTemployeeRole(value) {
    return getConstantText(value, employeeRoles)
}

function getConstantText(id, values) {
    var type = values.find(item => {
        return item.id === id
    });
    if (type) {
        return type.text
    }
    return ''
}