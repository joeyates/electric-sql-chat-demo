import {Navigate, useLocation} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

const RequireAuth = ({children}: {children?: JSX.Element}) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    // Save 'from' location
    return <Navigate to='/login' state={{from: location}} replace />
  }

  return children
}

export default RequireAuth
