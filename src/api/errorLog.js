import http from '../utils/http'

export function errorList(params) {
    return http({
        url: 'api/v1/admin/log/error/list',
        method: 'get',
        params
    })
}

export function errorGet(id) {
    return http({
        url: 'api/v1/admin/log/error/' + id,
        method: 'get'
    })
}