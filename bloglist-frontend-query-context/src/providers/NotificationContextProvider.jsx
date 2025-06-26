import { createContext, useReducer, useCallback } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const handleNotification = useCallback(({ message, type }) => {
    console.log('handleNotification', message, type)
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
  }, [])

  const removeNotification = useCallback(() => {
    notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
  }, [])

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch, handleNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Export context for use in other files
export { NotificationContext }
