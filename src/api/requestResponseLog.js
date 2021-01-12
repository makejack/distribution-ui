import http from '../utils/http'

export function logList(params) {
    return http({
        url: 'api/v1/admin/log/list',
        method: 'get',
        params
    })
}

export function logGet(id) {
    return http({
        url: 'api/v1/admin/log/' + id,
        method: 'get'
    })
}