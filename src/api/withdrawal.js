import http from '../utils/http'

export function withdrawalHistory(params) {
    return http({
        url: 'api/v1/admin/withdrawal/history',
        method: 'get',
        params
    })
}

export function withdrawalApplyList(params) {
    return http({
        url: 'api/v1/admin/withdrawal/applylist',
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

export function withdrawalAgree(id) {
    return http({
        url: 'api/v1/admin/withdrawal/agree/' + id,
        method: 'post'
    })
}


export function withdrawalCancel(data) {
    return http({
        url: 'api/v1/admin/withdrawal/cancel',
        method: 'post',
        data
    })
}