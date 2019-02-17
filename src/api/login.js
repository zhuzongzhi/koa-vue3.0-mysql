import request from '@/utils/request'

export function login(userName, password) {
    return request({
        url: '/user/signIn',
        method: 'post',
        data: {
          userName,
          password
        }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
