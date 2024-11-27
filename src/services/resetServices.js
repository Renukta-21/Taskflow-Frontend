import axios from "axios";
import tokenService from "./tokenService";

const baseURL = '/api/reset'
const resetDB = async()=>{
    const response = await axios.post(baseURL, {
        headers:{
            Authorization: tokenService.getToken() 
        }
    })
    return response
}

export default {resetDB}