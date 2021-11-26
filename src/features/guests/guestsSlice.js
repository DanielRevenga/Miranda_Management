import { createSlice } from "@reduxjs/toolkit";

const guestsSlice = createSlice({
    name: "guests",
    initialState: [],
    reducers: {
        addGuest: (state, action) => {

        },
        updateGuest: (state, action) => {

        },
        deleteGuest: (state, action) => {

        },
    }
});

export const selectGuests = (state) => state.guests;

export const {
    addGuest,
    updateGuest,
    deleteGuest
} = guestsSlice.actions;

export default guestsSlice.reducer;