import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const headers = () => {
  return {
    headers: {
      Authorization: token
    } 
  }
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl, headers())
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject, headers())
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, headers())
  return request.then(response => response.data)
}

export default { 
  getAll, create, update, setToken
}