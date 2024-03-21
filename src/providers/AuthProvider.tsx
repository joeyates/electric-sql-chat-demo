import React, {useState} from 'react'
import type {User} from '../../authenticator/authentication.d'

import AuthContext from '../contexts/AuthContext'
import {authenticate} from '../lib/auth'

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)

  const signin = async (username: string, password: string): Promise<User | null> => {
    const user: User | null = await authenticate(username, password)
    setUser(user)
    return user
  }

  const signout = async () => {
    setUser(null)
  }

  const value = {user, signin, signout}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
