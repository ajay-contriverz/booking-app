import { Action, configureStore } from '@reduxjs/toolkit'
import signupReducer from './slices/signupSlice'
import loginReducer from './slices/loginSlice';
import thunkMiddleware from 'redux-thunk';
import userReducer from './slices/userSlice';

interface RootState {
  signUp: {
    loading: boolean;
    error: string | null;
    auth: string | null;
    success: boolean;
  },
  login: {
    loading: boolean;
    error: string | null;
    auth: string | null;
    success: boolean;
  }
  user: {
    user: boolean,
    agency: boolean
  }
}

export const store = configureStore({
  reducer: {
    signUp: signupReducer,
    login: loginReducer,
    user: userReducer
  },
  middleware: [thunkMiddleware]
})

export type RootAction = Action<string> & RootState;
export type AppDispatch = typeof store.dispatch