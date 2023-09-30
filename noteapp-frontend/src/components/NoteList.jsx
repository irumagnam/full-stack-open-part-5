import { useState } from 'react'
import Note from './Note'

const NoteList = ({ notes, callBackOnUpdate, callBackOnDelete }) => {
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return <div className="table b-1">
    <div className="header-row">
      <div className="cell">
        Showing {showAll ? 'all' : 'important'} notes
      </div>
      <div className="cell">
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
    </div>
    {notesToShow.map(note =>
      <Note
        key={note.id}
        note={note}
        callBackOnUpdate={callBackOnUpdate}
        callBackOnDelete={callBackOnDelete}
      />
    )}
  </div>
}

export default NoteList