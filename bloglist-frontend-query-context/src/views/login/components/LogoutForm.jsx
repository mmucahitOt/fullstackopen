import localStorageService from '../../../services/localStorageService'
import { useContext } from 'react'
import { UserContext } from '../../../providers/UserContextProvider'

const LogOutForm = () => {
  const { removeUser } = useContext(UserContext)
  const handleLogout = async () => {
    localStorageService.removeUser()
    removeUser()
  }
  return <button onClick={handleLogout}>logout</button>
}

export default LogOutForm
