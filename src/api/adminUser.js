import http from '../utils/http'

export function changePwd(data) {
    return http({
        url: 'api/v1/admin/user',
        method: 'put',
        data
    })
}