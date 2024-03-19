import logo from './assets/logo.svg'
import './App.css'
import './style.css'

import ElectricProvider from './components/ElectricProvider'
import Chat from './Chat'

export default function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <ElectricProvider>
          <Chat />
        </ElectricProvider>
      </header>
    </div>
  )
}
