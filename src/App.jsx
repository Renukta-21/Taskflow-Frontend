import { useState } from 'react'
import LoginForm from './LoginForm'
import MainUI from './MainUI'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [firstLogin, setFirstLogin] = useState(null)
  const [userFirstLogin, setUserFirstLogin] = useState(null)

  return (
    <div className='flex w-full  min-h-screen'>
      {!user ? (<LoginForm user={user}
        setUser={setUser}
        userFirstLogin={userFirstLogin}
        setUserFirstLogin={setUserFirstLogin} />
      ) : <MainUI user={user} />}
    </div>
  )
}

export default App