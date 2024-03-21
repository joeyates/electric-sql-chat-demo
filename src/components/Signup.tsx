import React from 'react'
import {useNavigate} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const user = await auth.register(username, password)
    if (!user) {
      return
    }
    navigate('/login')
  }

  return (
    <div>
      <p>Create an account</p>

      <form className='Signup-form' onSubmit={handleSubmit}>
        <label>
          Username: <input className='Signup-input' name='username' type='text' />
        </label>{' '}
        <label>
          Password: <input className='Signup-input' name='password' type='password' />
        </label>{' '}
        <button className='Signup-submit' type='submit'>Sign me up!</button>
      </form>

      <div className='Signup-have-account'>
        Already have an account?
        <button className='Signup-login' onClick={() => navigate('/login')}>Log in</button>
      </div>
    </div>
  )
}

export default Signup
