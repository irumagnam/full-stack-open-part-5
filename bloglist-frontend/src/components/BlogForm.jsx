import { useState } from 'react'
import Input from '../components/Input'

const BlogForm = ({ callBackOnCreate }) => {
  const newBlog = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(newBlog)

  const addBlog = (event) => {
    event.preventDefault()
    callBackOnCreate(blog)
    setBlog(newBlog)
  }

  return <form onSubmit={addBlog}>
    <div className='table'>
      <Input
        name='title'
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title:e.target.value })}
      />
      <Input
        name='author'
        value={blog.author}
        onChange={(e) => setBlog({ ...blog, author:e.target.value })}
      />
      <Input
        name='url'
        value={blog.url}
        onChange={(e) => setBlog({ ...blog, url:e.target.value })}
      />
      <div className='footer-row'>
        <button id="submit-button" type='submit'>submit</button>
      </div>
    </div>
  </form>
}

export default BlogForm