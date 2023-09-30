import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Footer from './components/Footer'
import noteService from './services/notes'
import session from './services/login'
import Header from './components/Header'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(session.getUser())

  useEffect(() => {
    if (user !== null) {
      noteService
        .getAll()
        .then(response => setNotes(response.data))
        .catch(handleException)
    }
  }, [user])

  const addNote = (note) => {
    console.log('adding note', note)
    noteService
      .create(note)
      .then(response => {
        setNotes(notes.concat(response.data))
        noteFormRef.current.showOrHide()
      })
      .catch(handleException)
  }

  const updateNote = note => {
    console.log('updating note', note)
    noteService
      .update({ ...note, user: note.user.id })
      .then(response => {
        setNotes(notes.map(n =>
          n.id !== note.id ? n : note
        ))
      })
      .catch(handleException)
  }

  const removeNote = (note) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return
    }
    console.log('deleting note', note)
    noteService
      .remove(note)
      .then(response => {
        setNotes(notes.filter(n => n.id !== note.id))
        const text = `${note.content} is removed`
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

  const noteFormRef = useRef()
  return (
    <div>
      <Header logout={logout} />
      <Notification message={message} />
      <LoginForm onSuccess={setUser} onFailure={handleException} />
      {user &&
      <>
        <Togglable buttonLabel='create note' ref={noteFormRef}>
          <NoteForm callBackOnCreate={addNote} />
        </Togglable>
        <NoteList
          notes={notes}
          callBackOnUpdate={updateNote}
          callBackOnDelete={removeNote}
        />
      </>
      }
      <Footer />
    </div>
  )
}

export default App