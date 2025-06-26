import { useCallback, useEffect, useState, useContext } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../slices/userSlice'
import { NotificationContext } from '../../providers/NotificationContextProvider'
import { TitleContext } from '../../providers/TitleContextProvider'

const LoginView = () => {
  const { handleNotification } = useContext(NotificationContext)
  const { handleTitle } = useContext(TitleContext)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    handleTitle('login in to application')
  }, [])

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault()
      dispatch(loginUser({ username, password }, handleNotification))
    },
    [username, password, dispatch, handleNotification]
  )

  return (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  )
}

export default LoginView
