import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    await auth.signin(username, password)
    navigate(from, {replace: true})
  }

  return (
    <div>
      <p>Please log in</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name='username' type='text' />
        </label>{' '}
        <label>
          Password: <input name='password' type='password' />
        </label>{' '}
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
