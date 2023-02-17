import request from '@/utils/request'
import { getWebToken } from '../../utils/auth'

// 查询参数列表
export function listDomainName(query) {

  return request({
    url: '/web/domain/name',
    method: 'get',
    params: query,
    headers: {
      isToken: false,
      Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmUiOjE2NzY2MDIyNTExNzIsInRva2VuIjoiYWJkZjBjOTJmYzY4NGM0OWI1NmQzMTUzMjdiMzI3NWMifQ.eRwW1UYFdmDJxxndBjb8o0IiT4Mtl4igp1j45Fk9UF4XmViTvBNZd822yFPRt-Iny6B_SVmppzAmWJF0VM3C0Q"
    }
  })
}
