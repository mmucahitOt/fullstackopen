
import { useNotificationValue, useNotificationDispatch } from '../hooks/useNotification'

const Notification = () => {
  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  setTimeout(() => {
    notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
  }, 5 * 1000)

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
