import http from '../utils/http'

export function refundList(params) {
    return http({
        url: 'api/v1/admin/refund/list',
        method: 'get',
        params
    })
}

export function refundGet(id) {
    return http({
        url: 'api/v1/admin/refund/' + id,
        method: 'get'
    })
}

export function refundApplyConfirm(data) {
    return http({
        url: 'api/v1/admin/refund/apply',
        method: 'post',
        data
    })
}

export function refundApplyRefuse(data) {
    return http({
        url: 'api/v1/admin/refund/refuse',
        method: 'post',
        data
    })
}

export function refundConfirm(id) {
    return http({
        url: 'api/v1/admin/refund/' + id,
        method: 'post'
    })
}