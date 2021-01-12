import http from '../utils/http'

export function employeeList(params) {
    return http({
        url: 'api/v1/admin/employee/list',
        method: 'get',
        params
    })
}

export function employeeAdd(data) {
    return http({
        url: 'api/v1/admin/employee',
        method: 'post',
        data
    })
}

export function EmployeeEdit(data) {
    return http({
        url: 'api/v1/admin/employee',
        method: 'put',
        data
    })
}

export function employeeDelete(id) {
    return http({
        url: 'api/v1/admin/employee/' + id,
        method: 'delete'
    })
}