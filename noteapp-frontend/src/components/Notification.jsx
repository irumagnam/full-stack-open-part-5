import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`message ${message.type}`}>
      {message.text}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.exact({
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })
}

export default Notification