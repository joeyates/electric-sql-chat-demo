import React, {useState} from 'react'
import type {User} from '../../authenticator/authentication.d'

import AuthContext from '../contexts/AuthContext'
import {authenticate, register as doRegistration} from '../lib/auth'

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)

  const register = async (username: string, password: string): Promise<User | null> => {
    const user: User | null = await doRegistration(username, password)
    return user
  }

  const signin = async (username: string, password: string): Promise<User | null> => {
    const user: User | null = await authenticate(username, password)
    setUser(user)
    return user
  }

  const signout = async () => {
    setUser(null)
  }

  const value = {user, register, signin, signout}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
