import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    error: false,
    success: false
}

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        addRequest: (state)  =>{
            state.loading = true;
            state.error = false;
            state.success = false;
        },
        addError: (state) => {
            state.loading = false;
            state.error = true;
            state.success = false;
        },
        addSuccess: (state) => {
            state.loading = false;
            state.error = false;
            state.success = true;
        }
    }
})

export const {addRequest, addError, addSuccess} = hotelSlice.actions;
export default hotelSlice.reducer;