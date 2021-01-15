import http from '../utils/http'

export function addressAll() {
    return http({
        url: 'api/v1/admin/address/all',
        method: 'get'
    })
}

export function addressList(params) {
    return http({
        url: 'api/v1/admin/address/list',
        method: 'get',
        params
    })
}

export function addressCreate(data) {
    return http({
        url: 'api/v1/admin/address',
        method: 'post',
        data
    })
}

export function addressEdit(data) {
    return http({
        url: 'api/v1/admin/address',
        method: 'put',
        data
    })
}

export function addressChangeDefault(id) {
    return http({
        url: 'api/v1/admin/address/' + id,
        method: 'put'
    })
}

export function addressDelete(id) {
    return http({
        url: 'api/v1/admin/address/' + id,
        method: 'delete'
    })
}