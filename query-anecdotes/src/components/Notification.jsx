import PropTypes from 'prop-types'

const Notification = ({ notification, setNotification, timeoutDuration = 5 }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  setTimeout(() => {
    setNotification('')
  }, timeoutDuration * 1000)

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired,
  timeoutDuration: PropTypes.number
}

export default Notification
