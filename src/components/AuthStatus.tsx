import {useNavigate} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import './AuthStatus.css'

const AuthStatus = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth.user) {
    return (
      <div className='AuthStatus'>
        <p>You are not logged in.</p>
      </div>
    )
  }

  return (
    <div className='AuthStatus'>
      <span>{auth.user.name}</span>{' '}
      <button
        onClick={async () => {
          await auth.signout()
          navigate('/')
        }}
      >
        Sign out
      </button>
    </div>
  )
}

export default AuthStatus
