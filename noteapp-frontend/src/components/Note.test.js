import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import NoteForm from './NoteForm'
import storage from '../services/storage'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    // create user session by storing user data
    storage.add('loggedInUserNoteApp', JSON.stringify({ username: 'test' }))
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('<NoteForm /> calls callBackOnCreate() and updates parent state', async () => {
    const callBackOnCreate = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NoteForm callBackOnCreate={callBackOnCreate} />)
    const input = container.querySelector('#note-input')
    const saveButton = screen.getByText('save')

    await user.type(input, 'this is so easy')
    await user.click(saveButton)
    expect(callBackOnCreate.mock.calls).toHaveLength(1)
    expect(callBackOnCreate.mock.lastCall[0].content).toBe('this is so easy')
  })
})