import request from '@/utils/request'
import { getWebToken } from '../../utils/auth'

// 检查注册
export function checkRegister(data) {
  return request({
    url: '/web/user/register/check',
    method: 'post',
    data: data,
    headers: {
      isToken: false
    }
  })
}

// 注册
export function register(data) {
  return request({
    url: '/web/user/register',
    method: 'post',
    data: data,
    headers: {
      isToken: false
    }
  })
}

// 重置检查
export function checkReset(data) {
  return request({
    url: '/web/user/reset/check',
    method: 'post',
    data: data,
    headers: {
      isToken: false
    }
  })
}

// 重置
export function reset(data) {
  return request({
    url: '/web/user/reset',
    method: 'post',
    data: data,
    headers: {
      isToken: false
    }
  })
}

// 登录
export function login(data) {
  return request({
    url: '/web/user/login',
    method: 'post',
    data: data,
    headers: {
      isToken: false
    }
  })
}

// 认证
export function auth() {
  return request({
    url: '/web/user/auth',
    method: 'get',
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 注销登录
export function logout() {
  return request({
    url: '/web/user/logout',
    method: 'delete',
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}
