import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { NotificationContextProvider } from './providers/NotificationContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </NotificationContextProvider>
)
