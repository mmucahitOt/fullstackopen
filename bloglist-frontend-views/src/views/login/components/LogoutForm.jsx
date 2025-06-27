import localStorageService from '../../../services/localStorageService'
import { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthContextProvider'

const LogOutForm = () => {
  const { removeUser } = useContext(AuthContext)
  const handleLogout = async () => {
    localStorageService.removeUser()
    removeUser()
  }
  return <button onClick={handleLogout}>logout</button>
}

export default LogOutForm
