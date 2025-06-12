import type { MenuItemInRow } from '@/types/MenuItemInRow';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  menuList: MenuItemInRow[];
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token') || null,
  menuList: [],
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
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
    setMenuList: (state, action: PayloadAction<MenuItemInRow[]>) => {
      state.menuList = action.payload;
    },
  },
});

export const { setToken, clearToken, setMenuList } = authSlice.actions;
export default authSlice.reducer;
