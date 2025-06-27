import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './providers/NotificationContextProvider'
import { TitleContextProvider } from './providers/TitleContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './providers/AuthContextProvider'
import { Routes, Route } from 'react-router-dom'
import UserDetail from './views/userDetail/UserDetail'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './providers/UserContextProvider'
import { BlogContextProvider } from './providers/BlogContextProvider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <TitleContextProvider>
          <AuthContextProvider>
            <UserContextProvider>
              <BlogContextProvider>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="users/:id" element={<UserDetail />} />
                </Routes>
              </BlogContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </TitleContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </Router>
)
