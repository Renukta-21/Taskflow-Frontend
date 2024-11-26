import axios from 'axios'
const baseURL = '/api/categories'

let token
const setToken = (actualToken) => {
  token = `Bearer ${actualToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: token,
      },
    })

    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const create = async (newTask) => {
  try {
    const response = await axios.post(baseURL, newTask, {
      headers: {
        Authorization: token,
      },

    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
export default { getAll, setToken, create }
