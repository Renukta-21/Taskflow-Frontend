import { useEffect, useState } from 'react'
import loginService from './services/loginService'
import tokenService from './services/tokenService'

function LoginForm({setUser}) {
  const [userFields, setUserFields] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('userLogged') 
    if(storedUser){
      const parsedUser = JSON.parse(storedUser);
      tokenService.setToken(parsedUser.token); 
      setUser(parsedUser);
    }

  }, [])

  const [error, setError] = useState(null)
  
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!userFields.username || !userFields.password) {
      setError('Todos los campos son obligatorios');
      return
    }
    try {
      const user = await loginService.login(userFields)
      setUserFields({
        username: '',
        password: ''
      })
      localStorage.setItem('userLogged', JSON.stringify(user))
      tokenService.setToken(user.token)
      setUser(user)
      setError(null)
    } catch (error) {
      setError(error.message)
    }

  }
  return (
    <div>
      <div>
        <h2>Login</h2>
        <form action="" onSubmit={handleLogin}>
          <label htmlFor="usernameField">Username </label>
          <input type="text" id="usernameField"
            onChange={e => setUserFields(prevFields => ({ ...prevFields, username: e.target.value }))} />
          <br /><br />
          <label htmlFor="passwordField">Password </label>
          <input type="text" id="passwordField"
            onChange={e => setUserFields(prevFields => ({ ...prevFields, password: e.target.value }))} />
          <br />
          <button>Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  )
}

export default LoginForm