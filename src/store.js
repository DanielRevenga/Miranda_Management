import { configureStore } from "@reduxjs/toolkit";

import guestsSliceReducer from "./features/guests/guestsSlice";

export default configureStore({
    reducer: {
        guests : guestsSliceReducer,
    }
});