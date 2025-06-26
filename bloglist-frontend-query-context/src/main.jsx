import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { NotificationContextProvider } from './providers/NotificationContextProvider'
import { TitleContextProvider } from './providers/TitleContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <TitleContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </TitleContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
