import { configureStore } from '@reduxjs/toolkit';
import authSlice from './login/authSlice';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import tenementSlice from './tenement/tenementSlice';

export const store = configureStore({
  reducer: {
    authSlice,
    tenementSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
