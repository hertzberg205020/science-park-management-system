// src/store/login/authSlice.ts

import type { Permission } from '@/constants/permissions';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  permissions: Permission[]; // 改為儲存權限陣列而非選單項目
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token') || null,
  permissions: [], // 初始化為空陣列
};

/**
 * authSlice 負責管理使用者的身分驗證狀態
 *
 * 重構說明：
 * 1. 從儲存 menuList 改為儲存 permissions 陣列
 * 2. permissions 陣列包含使用者擁有的所有權限字串
 * 3. 這種設計讓權限檢查更加直接和高效
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      // 儲存 token 到 redux state
      state.token = action.payload;
      // 儲存 token 到 sessionStorage
      sessionStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      // 清除 redux state 中的 token
      state.token = '';
      // 清除 sessionStorage 中的 token
      sessionStorage.removeItem('token');
      // 同時清除權限
      state.permissions = [];
    },
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      // 設定使用者權限
      state.permissions = action.payload;
    },
    clearPermissions: (state) => {
      // 清除使用者權限
      state.permissions = [];
    },
  },
});

export const { setToken, clearToken, setPermissions, clearPermissions } = authSlice.actions;
export default authSlice.reducer;
