import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "render here notification...",
    timeoutDuration: 5000,
  },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.timeoutDuration = action.payload.timeoutDuration * 1000;
    },
    clearNotification: (state) => {
      state.message = "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
