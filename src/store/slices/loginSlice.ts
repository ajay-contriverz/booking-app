import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    error: null,
    auth: null,
    success: false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginRequest: (state: any) => {
            state.loading = true;
            state.error = null;
            state.auth = null;
            state.success = false;
        },
        loginSuccess: (state: any, action: any) => {
            state.loading = false;
            state.error = null;
            state.auth = action.payload;
            state.success = true;
        },
        loginError: (state: any, action: any) => {
            state.loading = false;
            state.error = action.payload;
            state.auth = null;
            state.success = false;
        },
    }
});

export const { loginRequest, loginSuccess, loginError } = loginSlice.actions;
export default loginSlice.reducer;