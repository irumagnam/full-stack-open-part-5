import axios from 'axios'
import session from './login'
const baseUrl = '/api/blogs'

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

const createBlog = (blog) => {
  return axios.post(baseUrl, blog, headerConfig())
}

const updateBlog = (blog) => {
  return axios.put(`${baseUrl}/${blog.id}`, blog, headerConfig())
}

const removeBlog = (blog) => {
  return axios.delete(`${baseUrl}/${blog.id}`, headerConfig())
}

export default {
  getAll,
  createBlog,
  removeBlog,
  updateBlog,
}