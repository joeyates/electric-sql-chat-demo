const AUTHENTICATION_ENDPOINT = import.meta.env.ELECTRIC_AUTHENTICATION_ENDPOINT
const LOGIN_URL = `${AUTHENTICATION_ENDPOINT}/api/authenticate`
const JWT_SESSION_KEY = '__electric_jwt'
const USERNAME_SESSION_KEY = '__electric_username'

export const authToken = () => {
  return window.sessionStorage.getItem(JWT_SESSION_KEY)
}

type User = {
  name: string
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
  const {data} = await response.json()
  const jwt = data.jwt
  window.sessionStorage.setItem(JWT_SESSION_KEY, jwt)
  window.sessionStorage.setItem(USERNAME_SESSION_KEY, data.user.username)
  return {name: data.user.username}
}

export {authenticate, type User}
