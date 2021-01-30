import http from '../utils/http'
import { promiseRequest } from '../utils'

export function resetPwd(data) {
    return promiseRequest(
        http({
            url: 'api/v1/admin/forget',
            method: 'post',
            data
        }))
}

export function verifyCode(params) {
    return promiseRequest(
        http({
            url: 'api/v1/admin/forget/verifycode',
            method: 'get',
            params
        }))
}