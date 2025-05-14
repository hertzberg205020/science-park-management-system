import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: sessionStorage.getItem('token') || null,
  },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      // save token to redux state
      state.token = action.payload;
      // save token to sessionStorage
      sessionStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      // clear token from redux state
      state.token = '';
      // clear token from sessionStorage
      sessionStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
