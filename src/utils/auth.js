import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const WebTokenKey = "Web-Token"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getWebToken() {
  return Cookies.get(WebTokenKey)
}

export function setWebToken(token) {
  return Cookies.set(WebTokenKey, token)
}

export function removeWebToken() {
  return Cookies.remove(WebTokenKey)
}
