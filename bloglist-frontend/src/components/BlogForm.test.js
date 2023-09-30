import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import storage from '../services/storage'
import BlogForm from './BlogForm'

const sampleBlog = {
  title: 'The Technium',
  author: 'Kevin Kelly',
  url: 'https://feedpress.me/thetechnium',
  user: { username: 'test' },
}

describe('when rendering <BlogForm /> component', () => {
  let container
  let user
  let createBlog

  beforeEach(() => {
    // create user session by storing user data
    storage.add('loggedInUserBlogApp', JSON.stringify(sampleBlog.user))
    createBlog = jest.fn()
    container = render(
      <BlogForm
        callBackOnCreate={createBlog}
      />
    ).container
    screen.debug()
    user = userEvent.setup()
  })

  // excercise 5.16
  test('createBlog() event handler is called with correct data', async () => {
    // enter data for new blog
    await user.type(container.querySelector('#title'), sampleBlog.title)
    await user.type(container.querySelector('#author'), sampleBlog.author)
    await user.type(container.querySelector('#url'), sampleBlog.url)
    // submit data
    await user.click(screen.getByText('submit'))
    // check that createBlog() is called once
    expect(createBlog.mock.calls).toHaveLength(1)
    // check that expected data is sent to createBlog()
    const dataReceived = createBlog.mock.lastCall[0]
    expect(dataReceived.title === sampleBlog.title)
    expect(dataReceived.author === sampleBlog.author)
    expect(dataReceived.url === sampleBlog.url)
  })

})
