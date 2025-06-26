import { useState, useEffect, useContext } from 'react'
import localStorageService from './services/localStorageService'
import LoginView from './views/login/LoginView'
import Notification from './components/Notification'
import BlogView from './views/blog/BlogView'
import LogoutForm from './views/login/components/LogoutForm'
import Text from './components/Text'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './slices/userSlice'
import { setUser } from './slices/userSlice'
import { TitleContext } from './providers/TitleContextProvider'
import { BlogContextProvider } from './providers/BlogContextProvider'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { title } = useContext(TitleContext)

  useEffect(() => {
    const user = localStorageService.getUser()
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div>
      <h3>{title}</h3>
      <Notification />

      {user && <Text style={{ marginBottom: '10px' }} text={user.username + ' logged in'} />}
      {user && <LogoutForm />}

      {!user && <LoginView />}
      {user && (
        <BlogContextProvider>
          <BlogView />
        </BlogContextProvider>
      )}
    </div>
  )
}

export default App
