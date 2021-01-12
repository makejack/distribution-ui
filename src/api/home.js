import http from '../utils/http'

export function dataStatistics() {
    return http({
        url: 'api/v1/admin/home',
        method: 'get'
    })
}


export function getSales(params) {
    return http({
        url: 'api/v1/admin/home/sales',
        method: 'get',
        params
    })
}


export function getTeamSales(params) {
    return http({
        url: 'api/v1/admin/home/teamsales',
        method: 'get',
        params
    })
}