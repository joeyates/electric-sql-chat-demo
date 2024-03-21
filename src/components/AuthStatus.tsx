import {useNavigate} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import './AuthStatus.css'

const AuthStatus = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth.user) {
    return <p>You are not logged in.</p>
  }

  return (
    <div className='AuthStatus'>
      <span className='AuthStatus-user'>User: {auth.user.name}</span>{' '}
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
