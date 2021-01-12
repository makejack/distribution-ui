import http from '../utils/http'

export function withdrawalHistory(params) {
    return http({
        url: 'api/v1/admin/withdrawal/history',
        method: 'get',
        params
    })
}

export function withdrawalList(params) {
    return http({
        url: 'api/v1/admin/withdrawal/list',
        method: 'get',
        params
    })
}