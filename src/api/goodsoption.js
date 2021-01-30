import http from '@/utils/http'
import { promiseRequest } from '../utils'

export function goodsOptionAll() {
    return promiseRequest(
        http({
            url: 'api/v1/admin/goods/option/all',
            method: 'get',
        }))
}

export function goodsOptionList(params) {
    return http({
        url: 'api/v1/admin/goods/option/list',
        method: 'get',
        params
    })
}

export function goodsOptionAdd(data) {
    return http({
        url: 'api/v1/admin/goods/option',
        method: 'post',
        data
    })
}

export function goodsOptionEdit(data) {
    return http({
        url: 'api/v1/admin/goods/option',
        method: 'put',
        data
    })
}


export function goodsOptionDelete(params) {
    return http({
        url: 'api/v1/admin/goods/option/' + params,
        method: 'delete'
    })
}