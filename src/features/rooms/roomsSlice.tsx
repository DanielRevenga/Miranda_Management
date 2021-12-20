import { createSlice, current } from "@reduxjs/toolkit";

import { rooms_data } from "../../data/rooms_data";

function loadInitialState() {
    return rooms_data;
}

const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        roomsList: loadInitialState(),
        lastFetch: ""
    },
    reducers: {
        addRoom: (state, action) => {
            action.payload.id = state.roomsList.at(-1).id + 1;
            state.roomsList.push(action.payload);
        },
        editRoom: (state, action) => {
            const editIndex = state.roomsList.findIndex(room => room.id === action.payload.id);
            state.roomsList.splice(editIndex, 1, action.payload);
        },
        deleteRoom: (state, action) => {
            const deleteIndex = state.roomsList.findIndex(room => room.id === action.payload.id);
            state.roomsList.splice(deleteIndex, 1);
        },
        sortRooms: (state, action) => {
            state.roomsList.sort((a, b) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    }
});

export const selectRooms = state => state.rooms;

export const {
    addRoom,
    editRoom,
    deleteRoom,
    sortRooms
} = roomsSlice.actions;

export default roomsSlice.reducer;