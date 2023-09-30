import axios from 'axios'
import session from './login'
const baseUrl = '/api/notes'

const headerConfig = () => {
  const user = session.getUser()
  return {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }
}

const getAll = () => {
  return axios.get(baseUrl, headerConfig())
}

const create = (note) => {
  return axios.post(baseUrl, note, headerConfig())
}

const update = (note) => {
  return axios.put(`${baseUrl}/${note.id}`, note, headerConfig())
}

const remove = (note) => {
  return axios.delete(`${baseUrl}/${note.id}`, headerConfig())
}

export default {
  getAll,
  create,
  update,
  remove,
}