import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import storage from '../services/storage'

const sampleBlog = {
  title: 'The Technium',
  author: 'Kevin Kelly',
  url: 'https://feedpress.me/thetechnium',
  user: { username: 'test' },
}

describe('when rendering <Blog /> component', () => {
  let container
  let user
  let updateLikes

  beforeEach(() => {
    // create user session by storing user data
    storage.add('loggedInUserBlogApp', JSON.stringify(sampleBlog.user))
    updateLikes = jest.fn()
    container = render(
      <Blog
        blog={sampleBlog}
        callBackOnUpdate={updateLikes}
      />
    ).container
    screen.debug()
    user = userEvent.setup()
  })

  // excercise 5.13
  test('only title and author is shown initially', async () => {
    // chec 'main' div element exists
    expect(container.querySelector('.blog')).toBeInTheDocument()
    // check 'standard details' div element exists
    expect(container.querySelector('.standard')).toBeInTheDocument()
    // check 'title' and 'author' data is rendered
    screen.getByText(sampleBlog.title, { exact: false })
    screen.getByText(sampleBlog.author, { exact: false })
    // check 'url' and 'likes' data is not rendered by default
    expect(container.querySelector('.extended')).toBeFalsy()
  })

  // excercise 5.14
  test('url and likes are shown after button click', async () => {
    // click 'details' button to show additional details
    const detailButton = screen.getByText('details')
    await user.click(detailButton)
    // now 'url' and 'likes' data should be rendered
    expect(container.querySelector('.extended')).toBeInTheDocument()
  })

  // excercise 5.15
  test('event handler for like button is called twice for 2 clicks', async () => {
    // declare a mock function for handling like
    // click 'like' button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    // check that the update function is called twice
    expect(updateLikes.mock.calls).toHaveLength(2)
  })

})
