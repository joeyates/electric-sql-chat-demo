import React, {useState} from 'react'

import {authenticate, type User} from '../lib/auth'
import AuthContext from '../contexts/AuthContext'

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)

  const signin = async (username: string, password: string) => {
    const user: User | null = await authenticate(username, password)
    setUser(user)
  }

  const signout = async () => {
    setUser(null)
  }

  const value = {user, signin, signout}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
