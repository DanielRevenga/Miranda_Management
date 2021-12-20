import { createSlice, current } from "@reduxjs/toolkit";

import { rooms_data } from "../../data/rooms_data";
import { RoomsState } from "../../interfaces/interfaces";
import { RootState } from "../../store";

function loadInitialState() {
    return rooms_data;
}

const initialState: RoomsState = {
    roomsList: [],
    lastFetch: ""
}

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    // initialState: {
    //     roomsList: loadInitialState(),
    //     lastFetch: ""
    // },
    reducers: {
        addRoom: (state, action) => {
            // action.payload.id = state.roomsList.at(-1).id + 1;
            action.payload.id = state.roomsList[state.roomsList.length - 1].id + 1;
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
            state.roomsList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    }
});

export const selectRooms = (state: RootState) => state.rooms;

export const {
    addRoom,
    editRoom,
    deleteRoom,
    sortRooms
} = roomsSlice.actions;

export default roomsSlice.reducer;