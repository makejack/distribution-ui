import http from '../utils/http'

export function trackingNumberQuery(id) {
    return http({
        url: '/api/v1/shipping/' + id,
        method: 'get'
    })
}

export function returnQuery(id) {
    return http({
        url: 'api/v1/shipping/return/' + id,
        method: 'get'
    })
}