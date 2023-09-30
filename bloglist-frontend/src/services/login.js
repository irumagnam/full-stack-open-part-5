import axios from 'axios'
import localStorage from './storage'
const baseUrl = '/api/login'
const APP_USER_DATA = 'loggedInUserBlogApp'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  const userData = response.data
  localStorage.add(
    APP_USER_DATA,
    JSON.stringify(userData)
  )
  return userData
}

const logout = () => {
  localStorage.remove(APP_USER_DATA)
}

const getUser = () => {
  const userJSON = localStorage.get(APP_USER_DATA)
  return userJSON ? JSON.parse(userJSON) : null
}

export default {
  login,
  logout,
  getUser,
}