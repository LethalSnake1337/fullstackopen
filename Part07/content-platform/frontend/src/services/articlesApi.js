import axios from 'axios'

const BASE_URL = '/api/articles'
let bearerToken = null

const setup = (token) => {
  bearerToken = token
}

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const create = async (payload) => {
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` }
  }
  const response = await axios.post(BASE_URL, payload, config)
  return response.data
}

const update = async (id, payload) => {
  const response = await axios.put(`${BASE_URL}/${id}`, payload)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` }
  }
  await axios.delete(`${BASE_URL}/${id}`, config)
}

const addRemark = async (id, remark) => {
  const response = await axios.post(`${BASE_URL}/${id}/feedback`, { remark })
  return response.data
}

export default {
  setup,
  getAll,
  create,
  update,
  remove,
  addRemark
}
