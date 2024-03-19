import {createContext, useContext, useState} from 'react'
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom'

import logo from './assets/logo.svg'
import {authenticate, type User} from './lib/auth'
import './App.css'
import './style.css'

import ElectricProvider from './components/ElectricProvider'
import Chat from './Chat'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<Login />}></Route>
          <Route index element={<Navigate to="/chat" replace />}></Route>
          <Route
            path='/chat'
            element={
              <RequireAuth>
                <ElectricProvider>
                  <Chat />
                </ElectricProvider>
              </RequireAuth>
            }
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

const Layout = () => {
  return (
    <div className='App'>
      <AuthStatus />
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Outlet />
      </header>
    </div>
  )
}

// https://github.com/remix-run/react-router/tree/dev/examples/auth

interface AuthContextType {
  user: User | null
  signin: (name: string, password: string) => Promise<void>
  signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>(null!)

function AuthProvider({children}: {children: React.ReactNode}) {
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

function useAuth() {
  return useContext(AuthContext)
}

function AuthStatus() {
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

function RequireAuth({children}: {children?: JSX.Element}) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    // Save 'from' location
    return <Navigate to='/login' state={{from: location}} replace />
  }

  return children
}

function Login() {
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
