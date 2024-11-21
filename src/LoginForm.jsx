import loginService from './services/loginService'

function LoginForm() {
  const handleLogin = async(e)=>{
    e.preventDefault()
    console.log(await loginService.login({username:'daniel', password:"daniel"}), 'saasas')
    
  } 
  return (
    <div>
        <h2>Login</h2>
        <form action="" onSubmit={handleLogin}>
            <label htmlFor="usernameField">Username</label>
            <input type="text" id="usernameField"/>
            <br /><br />
            <label htmlFor="passwordField">Password</label>
            <input type="text" id="passwordField"/>
            <br />
          <button>Login</button>
        </form>
    </div>
  )
}

export default LoginForm