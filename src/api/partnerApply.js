import http from '../utils/http'

export function applyList(params) {
    return http({
        url: 'api/v1/admin/partner/apply/list',
        method: 'get',
        params
    })
}

export function applyGet(id) {
    return http({
        url: '/api/v1/admin/partner/apply/' + id,
        method: 'get'
    })
}

export function applyAdd(data) {
    return http({
        url: '/api/v1/admin/partner/apply',
        method: 'post',
        data
    })
}

export function applyEdit(data) {
    return http({
        url: '/api/v1/admin/partner/apply',
        method: 'put',
        data
    })
}

export function applyDelete(id) {
    return http({
        url: '/api/v1/admin/partner/apply/' + id,
        method: 'delete',
    })
}