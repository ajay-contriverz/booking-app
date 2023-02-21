import { Action, configureStore } from '@reduxjs/toolkit'
import signupReducer from './slices/signupSlice'
import loginReducer from './slices/loginSlice';
import thunkMiddleware from 'redux-thunk';
import userReducer from './slices/userSlice';
import hotelReducer from './slices/hotelSlice';
import loadingReducer from './slices/loadingSlice';
import editHotelReducer from './slices/editHotelSlice';
import authReducer from './slices/authSlice';

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
  },
  user: {
    user: boolean,
    agency: boolean
  },
  hotel: {
    loading: false,
    error: false,
    success: false
  },
  loading: {
    loading: false,
  },
  editHotel: {
    edit: false,
    editData: {}
  },
  auth: {
    auth: ""
  }
}

export const store = configureStore({
  reducer: {
    signUp: signupReducer,
    login: loginReducer,
    user: userReducer,
    hotel: hotelReducer,
    loading: loadingReducer,
    editHotel: editHotelReducer,
    auth: authReducer
  },
  middleware: [thunkMiddleware]
})

export type RootAction = Action<string> & RootState;
export type AppDispatch = typeof store.dispatch