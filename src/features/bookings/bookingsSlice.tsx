import { createSlice, current } from "@reduxjs/toolkit";

import { bookings_data } from "../../data/bookings_data";
import { Booking, BookingsState } from "../../interfaces/interfaces";
import { RootState } from "../../store";
// import { RootState } from "../../store/RootState";

function loadInitialBookingList(): Booking[] {
    let bookings: Booking[] = [];
    for (let booking of bookings_data){
        bookings.push({
            ...booking,
            room_type_number: booking.room_type_number.toString(),
            email: "",
            discount: 0
        })
    }
    return bookings;
}

const initialState: BookingsState = {
    bookingsList: loadInitialBookingList(),
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
            // if (state && state.bookingsList && state !== undefined && state.bookingsList !== undefined){
                action.payload.id = state.bookingsList[state.bookingsList.length - 1].id + 1;
                state.bookingsList.push(action.payload);
            // }
            
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
            state.bookingsList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    }
});

export const selectBookings = (state: RootState) => state.bookings;

export const {
    addBooking,
    editBooking,
    deleteBooking,
    sortBookings
} = bookingsSlice.actions;

export default bookingsSlice.reducer;