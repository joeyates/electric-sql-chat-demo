import {createContext, useContext} from 'react'

import type {User} from '../../authenticator/authentication.d'

interface AuthContextType {
  user: User | null
  signin: (name: string, password: string) => Promise<User | null>
  signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>(null!)

const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
export {useAuth}
