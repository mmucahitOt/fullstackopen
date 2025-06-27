import { useContext } from 'react'
import LoginView from './views/login/LoginView'
import Notification from './components/Notification'
import BlogView from './views/blog/BlogView'
import LogoutForm from './views/login/components/LogoutForm'
import Text from './components/Text'
import { TitleContext } from './providers/TitleContextProvider'
import { AuthContext } from './providers/AuthContextProvider'
import UserView from './views/user/UserView'
import { Routes, Route } from 'react-router-dom'
import UserDetail from './views/userDetail/UserDetail'
import BlogDetail from './views/blogDetail/BlogDetail'

const AppPanel = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      {user && <BlogView />}

      <h3>Users</h3>
      {user && <UserView />}
    </div>
  )
}

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
      <Routes>
        <Route path="/" element={<AppPanel />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
