import {useNavigate} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

const AuthStatus = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  if (!auth.user) {
    return <p>You are not logged in.</p>
  }

  return (
    <p>
      User: {auth.user.name}{' '}
      <button
        onClick={async () => {
          await auth.signout()
          navigate('/')
        }}
      >
        Sign out
      </button>
    </p>
  )
}

export default AuthStatus
