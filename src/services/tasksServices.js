import axios from 'axios'
import tokenService from './tokenService'

const baseURL = '/api/tasks'
const getAll = async () => {
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: tokenService.getToken(),
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default { getAll }