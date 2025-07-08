import { useEffect, useState, useContext } from 'react'
import { NotificationContext } from '../provider/notification-context-provider'

const Notification = () => {
  const [visible, setVisible] = useState(true)
  const { notification } = useContext(NotificationContext)

  console.log(notification)

  useEffect(() => {
    if (notification) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    }
  }, [notification])

  if (!visible || !notification) {
    return null
  }

  return (
    <div
      style={{
        color: notification.type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      {notification.message}
    </div>
  )
}

export default Notification
