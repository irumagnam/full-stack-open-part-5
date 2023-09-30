const Input = ({ label, id, name, type, value, onChange }) => {
  return (
    <div className='row'>
      <label htmlFor={name} className='cell'>
        { label || `${name}:` }
      </label>
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        className='cell'
        onChange={onChange}
      />
    </div>
  )
}

export default Input