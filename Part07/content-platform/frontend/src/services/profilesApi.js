import axios from 'axios'

const BASE_URL = '/api/accounts'

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export default {
  getAll
}
