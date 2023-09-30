const Note = ({ note, callBackOnUpdate, callBackOnDelete }) => {
  const toggleImportance = () => {
    callBackOnUpdate({
      ...note,
      important: !note.important
    })
  }

  return (
    <div className="row note">
      <div className="cell">{note.content}</div>
      <div className="cell">
        <button onClick={toggleImportance}>
          {note.important
            ? 'make not important'
            : 'make important'
          }
        </button>
        <button onClick={() => callBackOnDelete(note)}>delete</button>
      </div>
    </div>
  )
}

export default Note