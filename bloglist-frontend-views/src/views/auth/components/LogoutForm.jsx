import localStorageService from '../../../services/localStorageService'
import { useContext } from 'react'
import { AuthContext } from '../../../providers/AuthContextProvider'
import { useNavigate } from 'react-router-dom'

const LogOutForm = () => {
  const navigate = useNavigate()
  const { removeUser } = useContext(AuthContext)
  const handleLogout = async () => {
    localStorageService.removeUser()
    removeUser()
    navigate('/')
  }
  return (
    <button onClick={handleLogout} className="btn btn-primary">
      logout
    </button>
  )
}

export default LogOutForm
