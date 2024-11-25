import axios from "axios";

const baseURL = `/api/login`
const login = async(userCredentials) => {
    try {
        const response = await axios.post(baseURL, userCredentials)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export default {login}