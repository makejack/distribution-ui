import http from '@/utils/http'

export const login = (data) => {
    return http({
        url: 'api/v1/admin/auth/Login',
        method: 'post',
        data
    })
}