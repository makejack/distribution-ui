import http from '../utils/http'

export function orderList(params) {
    return http({
        url: 'api/v1/admin/order/list',
        method: 'get',
        params
    })
}

export function orderGet(id) {
    return http({
        url: 'api/v1/admin/order/' + id,
        method: 'get'
    })
}

export function orderEdit(data) {
    return http({
        url: 'api/v1/admin/order',
        method: 'put',
        data
    })
}

export function orderDelete(id) {
    return http({
        url: 'api/v1/admin/order/' + id,
        method: 'delete'
    })
}
