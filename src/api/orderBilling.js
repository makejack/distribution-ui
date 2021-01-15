import http from '../utils/http'

export function orderBillingList(params) {
    return http({
        url: 'api/v1/admin/order/billing/list',
        method: 'get',
        params
    })
}

export function orderBillingConfirm(id) {
    return http({
        url: 'api/v1/admin/order/billing/' + id,
        method: 'put'
    })
}