import { createContext, useReducer, useContext, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { login } from '../services/authService'
import { useMutation } from '@tanstack/react-query'
import { NotificationContext } from './NotificationContextProvider'
import localStorageService from '../services/localStorageService'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        id: action.payload.id,
        username: action.payload.username,
        name: action.payload.name,
        token: action.payload.token,
      }
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  const { handleNotification } = useContext(NotificationContext)

  const setUser = (user) => {
    userDispatch({ type: 'SET_USER', payload: user })
  }

  const removeUser = () => {
    userDispatch({ type: 'REMOVE_USER' })
  }

  const loginUser = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await login(username, password)
      return response.data
    },
    onSuccess: (data) => {
      setUser(data)
      localStorageService.setUser(data)
      handleNotification({ message: 'Login successful', type: 'success' })
    },
    onError: (error) => {
      handleNotification({ message: error.response.data.error, type: 'error' })
    },
    retry: false,
  })

  useEffect(() => {
    const user = localStorageService.getUser()
    if (user) {
      setUser(user)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, removeUser, loginUser }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext }
