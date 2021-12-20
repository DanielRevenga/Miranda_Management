import { configureStore } from "@reduxjs/toolkit";

import bookingsReducer from "./features/bookings/bookingsSlice";
import roomsReducer from "./features/rooms/roomsSlice";

const store = configureStore({
    reducer: {
        bookings : bookingsReducer,
        rooms: roomsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;