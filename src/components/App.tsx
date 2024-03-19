import {Routes, Route, Navigate} from 'react-router-dom'

import Chat from './Chat'
import Layout from './Layout'
import Login from './Login'
import RequireAuth from './RequireAuth'
import AuthProvider from '../providers/AuthProvider'
import ElectricProvider from '../providers/ElectricProvider'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login' element={<Login />}></Route>
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