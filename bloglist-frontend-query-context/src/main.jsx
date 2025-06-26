import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './providers/NotificationContextProvider'
import { TitleContextProvider } from './providers/TitleContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './providers/UserContextProvider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <TitleContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </TitleContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
