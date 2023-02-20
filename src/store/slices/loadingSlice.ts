import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadStart: (state: any) => {
            state.loading = true;
        },
        loadEnd: (state: any) => {
            state.loading = false;
        }
    }
})

export const {loadStart, loadEnd} = loadingSlice.actions;
export default loadingSlice.reducer;