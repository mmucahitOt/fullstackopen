import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    title: null,
  },
  reducers: {
    setTitle: (state, action) => {
      const { title } = action.payload
      return { ...state, title }
    },
    clearTitle: (state) => {
      return { ...state, title: null }
    },
  },
})

export const { setTitle, clearTitle } = uiSlice.actions

export const selectTitle = (state) => state.ui.title

export default uiSlice.reducer
