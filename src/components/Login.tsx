import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import './Login.css'

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

    const user = await auth.signin(username, password)
    if (!user) {
      return
    }
    navigate(from, {replace: true})
  }

  return (
    <div>
      <p>Please log in</p>

      <form className='Login-form' onSubmit={handleSubmit}>
          <label>
            Username: <input className='Login-input' name='username' type='text' />
          </label>{' '}
          <label>
            Password: <input className='Login-input' name='password' type='password' />
          </label>{' '}
        <button className='Login-submit' type='submit'>Login</button>
      </form>

      <div className='Login-no-account'>
        Don't have an account?
        <button className='Login-signup' onClick={() => navigate('/signup')}>
          Sign up
        </button>
      </div>
    </div>
  )
}

export default Login
