import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "render here notification...",
  reducers: {
    setNotification: (_, action) => action.payload,
    clearNotification: () => "",
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
