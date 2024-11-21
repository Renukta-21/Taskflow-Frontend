import axios from "axios";

const baseURL = `/api/users`
const login = async(userCredentials) => {
    const response = await fetch(baseURL, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },body:JSON.stringify(userCredentials)
    })

    const data = await response.json()
    return data
}

export default {login}