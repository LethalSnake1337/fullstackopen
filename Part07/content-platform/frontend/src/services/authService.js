import axios from 'axios'

const BASE_URL = '/api/auth'

const authenticate = async (login, password) => {
  const response = await axios.post(BASE_URL, { login, password })
  return response.data
}

export default {
  authenticate
}
