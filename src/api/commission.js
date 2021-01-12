import http from '../utils/http'

export function commissionHistory(params) {
    return http({
        url: 'api/v1/admin/commission/history',
        method: 'get',
        params
    })
}

export function commissionList(params) {
    return http({
        url: 'api/v1/admin/commission/list',
        method: 'get',
        params
    })
}