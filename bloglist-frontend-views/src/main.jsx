import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './providers/NotificationContextProvider'
import { TitleContextProvider } from './providers/TitleContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './providers/AuthContextProvider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <TitleContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </TitleContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
