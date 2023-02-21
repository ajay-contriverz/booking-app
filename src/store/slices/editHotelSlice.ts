import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    edit: false,
    editData: {}
}

const editHotelSlice = createSlice({
    name: "editHotel",
    initialState,
    reducers: {
        editOpen: (state, actions) => {
            state.edit = true;
            state.editData = actions.payload
        },
        editClose: (state) => {
            state.edit = false;
            state.editData = {}
        }
    }
})

export const {editOpen, editClose} = editHotelSlice.actions;
export default editHotelSlice.reducer;