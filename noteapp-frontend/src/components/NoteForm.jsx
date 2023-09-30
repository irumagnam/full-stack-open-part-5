import { useState } from 'react'
import Input from './Input'

const NoteForm = ({ callBackOnCreate }) => {
  const newNote = {
    content: '',
    important: true
  }
  const [note, setNote] = useState(newNote)

  const createNote = (event) => {
    event.preventDefault()
    callBackOnCreate(note)
    setNote(newNote)
  }

  return <form>
    <div>
      <Input
        name='content'
        value={note.content}
        onChange={(e) => setNote({ ...note, content:e.target.value })}
      />
      <button id='save-button' onClick={createNote}>save</button>
    </div>
  </form>
}

export default NoteForm