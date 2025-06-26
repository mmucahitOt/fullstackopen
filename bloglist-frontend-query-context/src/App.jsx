import { useContext } from 'react'
import LoginView from './views/login/LoginView'
import Notification from './components/Notification'
import BlogView from './views/blog/BlogView'
import LogoutForm from './views/login/components/LogoutForm'
import Text from './components/Text'
import { TitleContext } from './providers/TitleContextProvider'
import { BlogContextProvider } from './providers/BlogContextProvider'
import { UserContext } from './providers/UserContextProvider'

const App = () => {
  const { user } = useContext(UserContext)
  const { title } = useContext(TitleContext)

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
