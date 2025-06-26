import { createSlice } from '@reduxjs/toolkit';
import { login } from '../services/authService';
import localStorageService from '../services/localStorageService';
import { setNotification } from './uiSlice';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      const { id, username, name, token } = action.payload;
      return { id, username, name, token };
    },
    clearUser: (state) => {
      return null;
    },
  },
});

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await login(username, password);
      dispatch(setUser(response.data));
      localStorageService.setUser(response.data);
      dispatch(setNotification({ message: 'Login successful', type: 'success' }));
    } catch (error) {
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
    }
  };
};

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
