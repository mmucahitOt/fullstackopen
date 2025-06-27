import { useContext } from 'react'
import Notification from './components/Notification'
import BlogsView from './views/blogs/BlogsView'
import { TitleContext } from './providers/TitleContextProvider'
import { AuthContext } from './providers/AuthContextProvider'
import UsersView from './views/users/UsersView'
import { Routes, Route } from 'react-router-dom'
import UserDetail from './views/userDetail/UserDetail'
import BlogDetail from './views/blogDetail/BlogDetail'
import { Link } from 'react-router-dom'
import Text from './components/Text'
import LogoutForm from './views/auth/components/LogoutForm'
import LoginView from './views/auth/LoginView'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        backgroundColor: 'lightgrey',
      }}
    >
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <Text style={{ marginBottom: '10px' }} text={user.username + ' logged in'} />
      <LogoutForm />
    </div>
  )
}
const App = () => {
  const { title } = useContext(TitleContext)
  const { user } = useContext(AuthContext)

  return (
    <div>
      <Notification />
      {user && <Dashboard />}
      <Text as="h3" style={{ marginBottom: '10px' }} text={'blog app'} />
      <h3>{title}</h3>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/blogs" element={<BlogsView />} />
        <Route path="users" element={<UsersView />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
