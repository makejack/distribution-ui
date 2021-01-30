import http from '@/utils/http'
import { promiseRequest } from '../utils'

export function goodsList(params) {
    return http({
        url: 'api/v1/admin/goods/list',
        method: 'get',
        params
    })
}

export function goodsGet(id) {
    if (id)
       return promiseRequest(
            http({
                url: 'api/v1/admin/goods/' + id,
                method: 'get'
            }))
}

export function goodsAdd(data) {
    return http({
        url: 'api/v1/admin/goods',
        method: 'post',
        data
    })
}

export function goodsEdit({ id, data }) {
    return http({
        url: 'api/v1/admin/goods/' + id,
        method: 'put',
        data
    })
}

export function goodsDelete(id) {
    return http({
        url: 'api/v1/admin/goods/' + id,
        method: 'delete'
    })
}


