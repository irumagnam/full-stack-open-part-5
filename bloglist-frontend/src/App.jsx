import { useState, useEffect, useRef } from 'react'
import session from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(session.getUser())
  const [message, setMessage] = useState(null)

  // load blogs for curent user
  useEffect(() => {
    if (user) { // fetch blogs only if user is logged-in
      blogService
        .getAll()
        .then(response => setBlogs(response.data))
        .catch(handleException)
    }
  }, [user])

  // sort blogs by 'likes'
  const sortedBlogs = blogs.sort((b1, b2) => 
    b2.likes > b1.likes ? 1 : b2.likes < b1.likes ? -1 : 0)

  const addBlog = (blog) => {
    console.log('adding new blog', blog)
    blogService
      .createBlog(blog)
      .then(response => {
        blogFormRef.current.toggleVisibility()
        setBlogs(blogs.concat(response.data))
        const text = `a new blog ${blog.title} by ${blog.author} is added`
        displayMessage({ type: 'info', text })
      })
      .catch(handleException)
  }

  const updateBlog = (blog) => {
    console.log('updating blog', blog)
    blogService
      .updateBlog({ ...blog, user: blog.user.id })
      .then(response => {
        setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
        const text = `blog ${blog.title} by ${blog.author} has been updated`
        //displayMessage({ type: 'info', text })
      })
      .catch(handleException)
  }

  const removeBlog = (blog) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return
    }
    console.log('deleting blog', blog)
    blogService
      .removeBlog(blog)
      .then(response => {
        setBlogs(blogs.filter(b => b.id !== blog.id))
        const text = `blog ${blog.title} by ${blog.author} is removed`
        displayMessage({ type: 'info', text })
      })
      .catch(handleException)
  }

  const handleException = (exception) => {
    const errorText = exception.response.data.error
    // logout the user if token has expired
    if (errorText === 'token expired') {
      logout()
    }
    // display the error message
    displayMessage({ type: 'error', text: errorText })
  }

  const displayMessage = (message, timePeriod = 5000) => {
    // display message in Notification area
    setMessage(message)
    // hide the message after given time period in ms
    setTimeout(() => setMessage(null), timePeriod)
  }

  const logout = () => {
    setUser(null)
    session.logout()
  }

  const blogFormRef = useRef()

  return <div>
    <div className='title'>Blogs</div>
    <Notification message={message} />
    {user === null &&
      <LoginForm
        onSuccess={setUser}
        onFailure={handleException}
      />
    }
    {user &&
      <div>
        <span><b>{user.name}</b> logged in</span>
        <button id='logout-button' onClick={logout}>logout</button>
        <Togglable buttonLabel='create blog' ref={blogFormRef}>
          <BlogForm callBackOnCreate={addBlog} />
        </Togglable>
        <div id='bloglist' className='b-1'>
          {sortedBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              callBackOnUpdate={updateBlog}
              callBackOnDelete={removeBlog}
            />
          )}
        </div>
      </div>
    }
  </div>
}

export default App