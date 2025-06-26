import { useCallback, useEffect, useState, useContext } from 'react'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../slices/userSlice'
import { setTitle } from '../../slices/uiSlice'
import { NotificationContext } from '../../providers/NotificationContextProvider'

const LoginView = () => {
  const { handleNotification } = useContext(NotificationContext)

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(setTitle('login in to application'))
  }, [dispatch])

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
