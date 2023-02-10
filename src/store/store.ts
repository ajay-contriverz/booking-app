import { Action, configureStore } from '@reduxjs/toolkit'
import signupReducer from './slices/signupSlice'
import thunkMiddleware from 'redux-thunk';

interface RootState {
  signUp: {
    loading: boolean;
    error: string | null;
    auth: string | null;
    success: boolean;
  };
}

export const store = configureStore({
  reducer: {
    signUp: signupReducer
  },
  middleware: [thunkMiddleware]
})

export type RootAction = Action<string> & RootState;
export type AppDispatch = typeof store.dispatch