import { createContext, useReducer, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll } from '../services/userService'
import { NotificationContext } from './NotificationContextProvider'
import { AuthContext } from './AuthContextProvider'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  console.log('user', user)
  const { handleNotification } = useContext(NotificationContext)
  const [users, usersDispatch] = useReducer(userReducer, [])

  const setUsers = (users) => {
    usersDispatch({ type: 'SET_USERS', payload: users })
  }

  const fetchUsers = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await getAll(user.token)
      return users
    },
    enabled: !!user.token,
    retry: false,
  })

  useEffect(() => {
    if (fetchUsers.data && fetchUsers.status === 'success') {
      setUsers(fetchUsers.data)
    }
  }, [fetchUsers.data, fetchUsers.status, handleNotification])

  useEffect(() => {
    if (fetchUsers.error) {
      handleNotification({
        message: fetchUsers.error.response?.data?.error || 'Failed to fetch users',
        type: 'error',
      })
    }
  }, [fetchUsers.error, handleNotification])

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        fetchUsers: fetchUsers.refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext }
