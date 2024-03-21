export type User = {
  id: string
  name: string
}

export type AuthenticationResponse = {
  jwt: string
  user: User
}

export type RegistrationResponse = {
  user: User
}
