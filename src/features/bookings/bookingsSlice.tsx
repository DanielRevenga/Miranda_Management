import { createSlice, current } from "@reduxjs/toolkit";

import { bookings_data } from "../../data/bookings_data";
import { BookingsState } from "../../types/types";
// import { RootState } from "../../store/RootState";

function loadInitialBookingList() {
    return bookings_data;
}

const initialState: BookingsState = {
    bookingsList: [],
    lastFetch: ""
}

const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    // initialState: {
    //     bookingsList: loadInitialBookingList(),
    //     lastFetch: ""
    // },
    reducers: {
        addBooking: (state, action) => {
            action.payload.id = state.bookingsList.at(-1).id + 1;
            state.bookingsList.push(action.payload);
        },
        editBooking: (state, action) => {
            const editIndex = state.bookingsList.findIndex(booking => booking.id === action.payload.id);
            state.bookingsList.splice(editIndex, 1, action.payload);
        },
        deleteBooking: (state, action) => {
            const deleteIndex = state.bookingsList.findIndex(booking => booking.id === action.payload.id);
            state.bookingsList.splice(deleteIndex, 1);
        },
        sortBookings: (state, action) => {
            state.bookingsList.sort((a, b) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    }
});

export const selectBookings = (state: BookingsState) => state.bookings;

export const {
    addBooking,
    editBooking,
    deleteBooking,
    sortBookings
} = bookingsSlice.actions;

export default bookingsSlice.reducer;