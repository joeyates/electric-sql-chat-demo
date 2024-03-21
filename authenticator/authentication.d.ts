export type User = {
  id: string
  name: string
}

export type AuthenticationResponse = {
  jwt: string
  user: User
}
