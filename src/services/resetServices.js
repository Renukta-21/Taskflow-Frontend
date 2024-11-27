import axios from "axios";

const baseURL = '/api/reset'
const resetDB = async()=>{
    const response = await axios.post(baseURL)
    return response
}

export default {resetDB}