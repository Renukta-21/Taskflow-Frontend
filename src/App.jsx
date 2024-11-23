import React, { useState } from 'react'
import LoginForm from './LoginForm'
import MainUI from './MainUI'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      {!user ? (<LoginForm user={user} setUser={setUser}/>): <MainUI user={user}/>}
    </div>
  )
}

export default App