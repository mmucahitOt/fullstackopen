import { useContext } from 'react'
import LoginView from './views/login/LoginView'
import Notification from './components/Notification'
import BlogView from './views/blog/BlogView'
import LogoutForm from './views/login/components/LogoutForm'
import Text from './components/Text'
import { TitleContext } from './providers/TitleContextProvider'
import { AuthContext } from './providers/AuthContextProvider'
import UserView from './views/user/UserView'

const App = () => {
  const { user } = useContext(AuthContext)
  const { title } = useContext(TitleContext)

  return (
    <div>
      <h3>{title}</h3>
      <Notification />

      {user && <Text style={{ marginBottom: '10px' }} text={user.username + ' logged in'} />}
      {user && <LogoutForm />}

      {!user && <LoginView />}
      {user && <BlogView />}

      <h3>Users</h3>
      {user && <UserView />}
    </div>
  )
}

export default App
