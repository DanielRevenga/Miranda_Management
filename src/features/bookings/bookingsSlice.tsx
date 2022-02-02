import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios, { AxiosRequestHeaders } from "axios";

import { bookings_data } from "../../data/bookings_data";
import { Booking, BookingsState } from "../../interfaces/interfaces";
import { RootState } from "../../store";
// import { RootState } from "../../store/RootState";

const loadInitialBookingList = (): Booking[]=> {
    
    const bookings = getBookings();
    console.log(bookings);
    return bookings;
}

export const getBookings: any = createAsyncThunk(
    "dasboard/bookings",
    async (dispatch, state) => {
        const headers: AxiosRequestHeaders =  {
            'Content-Type': 'application/json'  
        }

        return await axios.get("http://localhost:5000/dashboard/bookings", headers);
    }
)

const initialState: BookingsState = {
    bookingsList: [],
    lastFetch: "",
    status: "null"
}

const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        addBooking: (state, action) => {
            // if (state && state.bookingsList && state !== undefined && state.bookingsList !== undefined){
                // action.payload.id = state.bookingsList[state.bookingsList.length - 1]._id + 1;
                state.bookingsList.push(action.payload);
            // }
            
        },
        editBooking: (state, action) => {
            const editIndex = state.bookingsList.findIndex(booking => booking._id === action.payload.id);
            state.bookingsList.splice(editIndex, 1, action.payload);
        },
        deleteBooking: (state, action) => {
            const deleteIndex = state.bookingsList.findIndex(booking => booking._id === action.payload.id);
            state.bookingsList.splice(deleteIndex, 1);
        },
        sortBookings: (state, action) => {
            state.bookingsList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBookings.fulfilled, (state, { payload }) => {
            state.status = "success";
            state.bookingsList = payload.data;
        })
        .addCase(getBookings.pending, (state, { payload }) => {
            state.status = "pending";
        })
        .addCase(getBookings.rejected, (state, { payload }) => {
            state.status = "failed";
        })
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