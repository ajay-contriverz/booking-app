import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    auth: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        removeAuth: (state) => {
            state.auth = [];
        }
    }
})

export const {setAuth, removeAuth} = authSlice.actions;
export default authSlice.reducer;