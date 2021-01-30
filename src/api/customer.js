import http from '../utils/http'
import { promiseRequest } from '../utils'

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

export function customerAll(params) {
    return promiseRequest(
        http({
            url: 'api/v1/admin/customer/all',
            method: 'get',
            params
        })
    )
}