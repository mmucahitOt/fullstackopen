import { useCallback, useEffect, useState, useContext } from 'react'
import LoginForm from './components/LoginForm'
import { TitleContext } from '../../providers/TitleContextProvider'
import { AuthContext } from '../../providers/AuthContextProvider'

const LoginView = () => {
  const { handleTitle } = useContext(TitleContext)
  const { loginUser } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    handleTitle('login in to application')
  }, [])

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault()
      loginUser.mutate({ username, password })
    },
    [username, password, loginUser]
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
