import {Outlet} from 'react-router-dom'

import AuthStatus from './AuthStatus'
import logo from '../assets/logo.svg'

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

export default Layout
