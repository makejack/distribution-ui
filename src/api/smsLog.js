import http from '../utils/http'

export function smsList(params) {
    return http({
        url: 'api/v1/admin/log/sms/list',
        method: 'get',
        params
    })
}