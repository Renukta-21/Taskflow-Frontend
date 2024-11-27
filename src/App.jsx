import { useState } from 'react'
import LoginForm from './LoginForm'
import MainUI from './MainUI'
import './index.css'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className='flex w-full  min-h-screen'>
      {!user ? (<LoginForm user={user} setUser={setUser}/>): <MainUI user={user}/>}
    </div>
  )
}

export default App