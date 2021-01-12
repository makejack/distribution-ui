import http from '../utils/http'

export function customerList(params) {
    return http({
        url: 'api/v1/admin/customer/list',
        method: 'get',
        params
    })
}

export function customerGet(id) {
    return http({
        url: 'api/v1/admin/customer/' + id,
        method: 'get'
    })
}