import axios from 'axios'
import tokenService from './tokenService'
const baseURL = '/api/categories'

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

const create = async (newCategory) => {
  try {
    const response = await axios.post(baseURL, newCategory, {
      headers: {
        Authorization: tokenService.getToken(),
      },

    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
export default { getAll, create }
