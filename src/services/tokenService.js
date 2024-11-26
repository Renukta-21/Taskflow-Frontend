let token
const setToken = (actualToken) => {
  token = `Bearer ${actualToken}`
}
const getToken = ()=> token

export default {setToken, getToken}