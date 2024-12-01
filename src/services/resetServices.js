import axios from 'axios'
import tokenService from './tokenService'

const baseURL = '/api/reset'
const resetDB = async () => {
  try {
    const response = await axios.post(baseURL,null, {
        headers:{
            Authorization: tokenService.getToken()
        }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default { resetDB }
