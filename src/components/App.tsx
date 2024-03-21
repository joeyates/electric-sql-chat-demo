import {Routes, Route, Navigate} from 'react-router-dom'

import Chat from './Chat'
import Layout from './Layout'
import Login from './Login'
import RequireAuth from './RequireAuth'
import Signup from './Signup'
import AuthProvider from '../providers/AuthProvider'
import ElectricProvider from '../providers/ElectricProvider'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route index element={<Navigate to='/chat' replace />}></Route>
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
