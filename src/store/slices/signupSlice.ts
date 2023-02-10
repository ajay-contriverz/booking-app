import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://192.168.0.173:8080/api"

export const initialState = {
    loading: false,
    error: null,
    auth: null,
    success: false,
}

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.auth = null;
      state.success = false;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
      state.error = null;
      state.success = true;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.auth = null;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { signupRequest, signupSuccess, signupFailure } = signupSlice.actions;

export const signupFun = (data: any) => async (dispatch: any) => {
  dispatch(signupRequest());

  try {
    const response = await axios.post(`${apiUrl}/signup`, data);
    console.log(response)
    if (response.status == 200) {
      if(!response.data.success){
        dispatch(signupFailure(response.data.message));
      }
      dispatch(signupSuccess(response.data.auth));
    } else {
      dispatch(signupFailure(response.data.error));
    }
  } catch (error: any) {
    dispatch(signupFailure(error.message));
  }
};

export default signupSlice.reducer;
