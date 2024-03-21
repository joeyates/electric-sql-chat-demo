import type {AuthenticationResponse, User} from '../../authenticator/authentication.d'

const AUTHENTICATION_ENDPOINT = import.meta.env.ELECTRIC_AUTHENTICATION_ENDPOINT
const LOGIN_URL = `${AUTHENTICATION_ENDPOINT}/api/authenticate`
const JWT_SESSION_KEY = '__electric_jwt'
const USERNAME_SESSION_KEY = '__electric_username'

export const authToken = () => {
  return window.sessionStorage.getItem(JWT_SESSION_KEY)
}

const authenticate = async (
  username: string,
  password: string
): Promise<User | null> => {
  const body = JSON.stringify({username, password})
  const request = new Request(LOGIN_URL, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body
  })
  const response = await fetch(request)
  if (!response.ok) {
    return null
  }
  const {data}: {data: AuthenticationResponse} = await response.json()
  const jwt = data.jwt
  const user = data.user
  window.sessionStorage.setItem(JWT_SESSION_KEY, jwt)
  window.sessionStorage.setItem(USERNAME_SESSION_KEY, user.name)
  return user
}

const register = async (
  username: string,
  password: string
): Promise<User | null> => {
  const body = JSON.stringify({username, password})
  const request = new Request(`${AUTHENTICATION_ENDPOINT}/api/register`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body
  })
  const response = await fetch(request)
  if (!response.ok) {
    return null
  }
  return authenticate(username, password)
}

export {authenticate, register}
