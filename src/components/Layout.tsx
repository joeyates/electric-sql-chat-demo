import {Outlet} from 'react-router-dom'

import AuthStatus from './AuthStatus'
import './Layout.css'
import logo from '../assets/logo.svg'

const Layout = () => {
  return (
    <div className='Layout'>
      <AuthStatus />
      <header className='Layout-header'>
        <img src={logo} className='Layout-logo' alt='logo' />
      </header>
      <Outlet />
    </div>
  )
}

export default Layout
