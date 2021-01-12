import http from '@/utils/http'

export function goodsOptionDataAll() {
    return http({
        url: 'api/v1/admin/goods/optiondata/all',
        method: 'get'
    })
}
export function goodsOptionDataList(params) {
    return http({
        url: 'api/v1/admin/goods/optiondata/list',
        method: 'get',
        params
    })
}

export function goodsOptionDataAdd(data) {
    return http({
        url: 'api/v1/admin/goods/optiondata',
        method: 'post',
        data
    })
}

export function goodsOptionDataEdit(data) {
    return http({
        url: 'api/v1/admin/goods/optiondata',
        method: 'put',
        data
    })
}

export function goodsOptionDataDelete(id) {
    return http({
        url: 'api/v1/admin/goods/optiondata/' + id,
        method: 'delete'
    })
}

