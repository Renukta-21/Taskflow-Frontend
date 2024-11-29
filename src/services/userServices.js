import axios from "axios"
import tokenService from "./tokenService"

const baseURL = '/api/users'
const create = async (userCredentials) => {
    try {
        const response = await axios.post(baseURL, userCredentials)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.error)
    }

}
const setFirstLogin = async (userObject) => {
    try {
        const response = await axios.put(`${baseURL}/tutorial`, userObject, {
            headers: {
                Authorization: tokenService.getToken()
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

const getUser=async()=>{
    try {
        const response = await axios.get(`${baseURL}/tutorial`)
    return response.data
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export default { create, setFirstLogin, getUser }