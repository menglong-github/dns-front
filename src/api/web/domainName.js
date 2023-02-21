import request from '@/utils/request'
import { getWebToken } from '../../utils/auth'

// 获取域名列表
export function listDomainName(query) {
  return request({
    url: '/web/domain/name',
    method: 'get',
    params: query,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 添加域名
export function addDomainName(data) {
  return request({
    url: '/web/domain/name',
    method: 'post',
    data: data,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 更新DNSSEC
export function updateDnssec(data) {
  return request({
    url: '/web/domain/name/dnssec',
    method: 'put',
    data: data,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 获取域名Zone列表
export function listDomainNameSimpleZone(query) {
  return request({
    url: '/web/domain/name/zone',
    method: 'get',
    params: query,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 获取域名Zone geo列表
export function listDomainNameZoneGeo() {
  return request({
    url: '/web/domain/name/zone/geo',
    method: 'get',
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 获取域名Zone列表
export function getDomainNameZoneInfo(query) {
  return request({
    url: '/web/domain/name/zone/info',
    method: 'get',
    params: query,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 编辑域名Zone
export function updateDomainNameZone(data) {
  return request({
    url: '/web/domain/name/zone',
    method: 'put',
    data: data,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 删除域名Zone
export function deleteDomainNameZone(data) {
  return request({
    url: '/web/domain/name/zone',
    method: 'delete',
    data: data,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}


// 添加域名Zone
export function addDomainNameZone(data) {
  return request({
    url: '/web/domain/name/zone',
    method: 'post',
    data: data,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}

// 删除域名
export function deleteDomainName(data) {
  return request({
    url: '/web/domain/name',
    method: 'delete',
    data: data,
    headers: {
      isToken: false,
      Authorization: getWebToken()
    }
  })
}





