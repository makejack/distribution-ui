import http from '../utils/http'
import { promiseRequest } from '../utils'

export function liteappGet() {
    return promiseRequest(
        http({
            url: 'api/v1/admin/liteapp',
            method: 'get'
        })
    )
}

export function liteappSave(data) {
    return promiseRequest(
        http({
            url: 'api/v1/admin/liteapp',
            method: 'post',
            data
        })
    )
}