import { createContext, useReducer } from "react"
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

// Export context for use in other files
export { NotificationContext }
