import { useState } from 'react'
import loginService from './services/loginService'

function LoginForm() {
  const [userFields, setUserFields] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!userFields.username || !userFields.password ) {
      setError('Todos los campos son obligatorios');
      return
    }
    try {
      const user = await loginService.login(userFields)
      setUserFields({
        username: '',
        password: ''
      })
      setError(null)
    } catch (error) {
      setError(error.message)
    }

  }
  return (
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
  )
}

export default LoginForm