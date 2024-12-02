import { useEffect, useState } from 'react'
import loginService from './services/loginService'
import tokenService from './services/tokenService'
import NewAccountForm from './NewAccountForm'
import userServices from './services/userServices'

function LoginForm({ setUser, setUserFirstLogin, userFirstLogin }) {
  const [hasAccount, setHasAccount] = useState(true)
  const [userFields, setUserFields] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('userLogged')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      tokenService.setToken(parsedUser.token)
      setUser(parsedUser)
    }
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      setUserFirstLogin(JSON.parse(firstLogin))
    }
  }, [])

  const [error, setError] = useState(null)
  const handleCreateAccount = () => {
    setHasAccount(!hasAccount)
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    if (!userFields.username || !userFields.password) {
      alert('Todos los campos son obligatorios')
      return
    }
    try {
      const user = await loginService.login(userFields)
      setUserFields({
        username: '',
        password: '',
      })
      localStorage.setItem('userLogged', JSON.stringify(user))
      tokenService.setToken(user.token)
      const fetchedUser = await userServices.getUser();
      localStorage.setItem('firstLogin', JSON.stringify(fetchedUser))
      setUserFirstLogin(fetchedUser);
      setUser(user)
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    hasAccount ? (<div className=" flex w-full justify-center items-center">
      <div className="w-2/4 h-[500px] bg-blue-200 rounded-3xl">
        <h1 className="font-bold text-center py-6 text-2xl">Task flow App</h1>
        <h2 className="font-bold text-center mt-10">Login</h2>
        <form
          action=""
          onSubmit={handleLogin}
          className="max-w-[300px] mx-auto mt-2"
        >
          <label htmlFor="usernameField">Username</label>
          <input
            type="text"
            id="usernameField"
            className="w-full mb-5 px-5 py-2"
            value={userFields.username}
            onChange={(e) =>
              setUserFields((prevFields) => ({
                ...prevFields,
                username: e.target.value,
              }))
            }
          />
          <br />
          <label htmlFor="passwordField">Password </label>
          <input
            type="text"
            id="passwordField"
            className="w-full mb-5 px-5 py-2"
            value={userFields.password}
            onChange={(e) =>
              setUserFields((prevFields) => ({
                ...prevFields,
                password: e.target.value,
              }))
            }
          />
          <br />
          <button className="w-full bg-green-500 py-3 ">Login</button>
        </form>
        <div className="w-full flex">
          <button
            onClick={handleCreateAccount}
            className="underline mx-auto my-2">
            New? Create an account
          </button>
        </div>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}
      </div>
    </div>) : <NewAccountForm hasAccount={hasAccount} setHasAccount={setHasAccount} userFirstLogin={userFirstLogin} />
  )
}

export default LoginForm
