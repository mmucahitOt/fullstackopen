import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: null,
    title: null,
  },
  reducers: {
    setNotification: (state, action) => {
      const { message, type } = action.payload;
      return { ...state, notification: { message, type } };
    },
    setTitle: (state, action) => {
      const { title } = action.payload;
      return { ...state, title };
    },
    clearNotification: (state) => {
      return { ...state, notification: null };
    },
    clearTitle: (state) => {
      return { ...state, title: null };
    },
  },
});

export const { setNotification, setTitle, clearNotification, clearTitle } = uiSlice.actions;

export const selectNotification = (state) => state.ui.notification;
export const selectTitle = (state) => state.ui.title;

export default uiSlice.reducer;
