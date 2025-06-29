import { useContext } from 'react'
import Notification from './components/Notification'
import BlogsView from './views/blogs/BlogsView'
import { TitleContext } from './providers/TitleContextProvider'
import { AuthContext } from './providers/AuthContextProvider'
import UsersView from './views/users/UsersView'
import { Routes, Route, Link } from 'react-router-dom'
import UserDetail from './views/userDetail/UserDetail'
import BlogDetail from './views/blogDetail/BlogDetail'
import Text from './components/Text'
import LogoutForm from './views/auth/components/LogoutForm'
import LoginView from './views/auth/LoginView'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand navbar-light bg-light justify-content-center mb-4">
      <div className="navbar-nav d-flex flex-row gap-3 align-items-center w-100 justify-content-center">
        <Link className="nav-link" to="/blogs">
          Blogs
        </Link>
        <Link className="nav-link" to="/users">
          Users
        </Link>
        <span className="navbar-text mx-2">{user.username} logged in</span>
        <LogoutForm />
      </div>
    </nav>
  )
}

const App = () => {
  const { title } = useContext(TitleContext)
  const { user } = useContext(AuthContext)

  return (
    <div className="container">
      <Notification />
      {user && <Dashboard />}
      <h1 className="text-center my-4">blog app</h1>
      <h3 className="text-center mb-4">{title}</h3>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/blogs" element={<BlogsView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App
