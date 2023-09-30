import { useState } from 'react'
import session from '../services/login'

const Blog = ({ blog, callBackOnUpdate, callBackOnDelete }) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false)

  return (
    <div className='blog'>
      <div className='standard'>
        <label>title:</label> {blog.title}
        <label>author:</label> {blog.author}
        <button onClick={() => setShowMoreDetails(!showMoreDetails)}>
          details
        </button>
        <button onClick={() => callBackOnUpdate({ ...blog, likes: blog.likes + 1 })}>
          like
        </button>
        {
          (blog.user.username === session.getUser().username) &&
          <button onClick={() => callBackOnDelete(blog)}>
            delete
          </button>
        }
      </div>
      {
        (showMoreDetails) &&
        <div className='extended'>
          <label>url:</label>
          <a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
          <label>likes:</label> {blog.likes}
          <label>created_by:</label> {blog.user.name}
        </div>
      }
    </div>
  )
}


export default Blog