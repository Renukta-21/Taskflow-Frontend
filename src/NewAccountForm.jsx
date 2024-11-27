import React, { useState } from 'react'

function NewAccountForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
const [error, setError] = useState(null)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        
    }
return (
    <div className=" flex w-full justify-center items-center">
      <div className="w-2/4 h-[500px] bg-blue-200 rounded-3xl">
        <h1 className="font-bold text-center py-6 text-2xl">Task flow App</h1>
        <h2 className="font-bold text-center mt-10">Sign up</h2>
        <form
          action=""
          className="max-w-[300px] mx-auto mt-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="usernameField">Username</label>
          <input
            type="text"
            id="usernameField"
            className="w-full mb-5 px-5 py-2"
            onChange={(e) => setUsername(e.target.value)}/>
          <br />
          <label htmlFor="passwordField">Password </label>
          <input
            type="text"
            id="passwordField"
            className="w-full mb-5 px-5 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="emailField">Email </label>
          <input
            type="text"
            id="emailField"
            className="w-full mb-5 px-5 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button className="w-full bg-green-500 py-3 ">Create Account</button>
        </form>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}
      </div>
    </div>
  )
}

export default NewAccountForm