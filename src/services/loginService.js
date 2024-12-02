import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

const baseURL = `${API_URL}/api/login`
const login = async(userCredentials) => {
    try {
        const response = await axios.post(baseURL, userCredentials)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export default {login}