import http from '../utils/http'

export function shipmentList(params) {
    return http({
        url: 'api/v1/admin/shipment/list',
        method: 'get',
        params
    })
}

export function shipmentGet(id) {
    return http({
        url: 'api/v1/admin/shipment/' + id,
        method: 'get'
    })
}

export function shipmentSetTrackingNumber(data) {
    return http({
        url: 'api/v1/admin/shipment/settrackingnumber',
        method: 'put',
        data
    })
}

export function shipmentDelete(id) {
    return http({
        url: 'api/v1/admin/shipment/' + id,
        method: 'delete'
    })
}