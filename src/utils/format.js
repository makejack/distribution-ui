import moment from 'moment'
import {
    orderStatus,
    paymentMethod,
    paymentType,
    shippingStatus,
    roles,
    partnerApplyTypes,
    commissionStatus,
    employeeRoles,
    refundStatus
} from './constant'

export function formatPaymentType(value) {
    return getConstantText(value, paymentType)
}

export function formatPaymentMethod(value) {
    return getConstantText(value, paymentMethod)
}

export function formatOrderStatus(value) {
    return getConstantText(value, orderStatus)
}

export function formatShippingStatus(value) {
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

export function formatRefundStatus(value) {
    return getConstantText(value, refundStatus)
}

export function formatDatetime(value) {
    if (value)
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
}

export function formatDate(value) {
    if (value)
        return moment(value).format('YYYY-MM-DD')
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