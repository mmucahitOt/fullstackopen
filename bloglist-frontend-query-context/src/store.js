import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import uiReducer from './slices/uiSlice'
import blogReducer from './slices/blogSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    blog: blogReducer,
  },
})

export default store
