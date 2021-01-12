import http from '../utils/http'

export function uploadImg(data) {
    return http({
        url: 'api/v1/media',
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
        method: 'post',
        data
    })
}