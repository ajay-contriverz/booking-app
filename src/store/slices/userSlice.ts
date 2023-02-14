import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: false,
    agency: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        webLoggedIn: (state) => {
            state.user = true;
        },
        agencyLoggedIn: (state) => {
            state.agency = true;
        },
        webLoggedOut: (state) => {
            state.user = false;
        },
        agencyLoggedOut: (state) => {
            state.agency = false;
        }
    }
})

export const {webLoggedIn, agencyLoggedIn, webLoggedOut, agencyLoggedOut} = userSlice.actions;
export default userSlice.reducer;