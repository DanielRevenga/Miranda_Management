import { configureStore } from "@reduxjs/toolkit";

import bookingsReducer from "./features/bookings/bookingsSlice";
import roomsReducer from "./features/rooms/roomsSlice";
import usersReducer from "./features/users/usersSlice";
import contactsReducer from "./features/contacts/contactsSlice";

const store = configureStore({
    reducer: {
        bookings : bookingsReducer,
        rooms: roomsReducer,
        users: usersReducer,
        contacts: contactsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;