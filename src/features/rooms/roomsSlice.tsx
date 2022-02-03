import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios, { AxiosRequestHeaders } from "axios";

import { rooms_data } from "../../data/rooms_data";
import { RoomsState, Room } from "../../interfaces/interfaces";
import { RootState } from "../../store";

function loadInitialRoomList(): Room[] {
    let rooms: Room[] = [];
    for (let room of rooms_data){
        rooms.push({
            ...room,
            name: "",
            rate: 0,
            discount: 0
        })
    }
    return rooms;
}

export const getRooms: any = createAsyncThunk(
    "dasboard/rooms",
    async (dispatch, state) => {
        const headers: AxiosRequestHeaders =  {
            'Content-Type': 'application/json'  
        }

        return await axios.get(`http://mirandaback2.azurewebsites.net/dashboard/rooms`, headers);
        // return await axios.get("http://localhost:5000/dashboard/rooms", headers);
    }
)

const initialState: RoomsState = {
    roomsList: [],
    lastFetch: "",
    status: "null"
}

const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoom: (state, action) => {
            // action.payload.id = state.roomsList.at(-1).id + 1;
            action.payload.id = state.roomsList[state.roomsList.length - 1]._id + 1;
            state.roomsList.push(action.payload);
        },
        editRoom: (state, action) => {
            const editIndex = state.roomsList.findIndex(room => room._id === action.payload.id);
            state.roomsList.splice(editIndex, 1, action.payload);
        },
        deleteRoom: (state, action) => {
            const deleteIndex = state.roomsList.findIndex(room => room._id === action.payload.id);
            state.roomsList.splice(deleteIndex, 1);
        },
        sortRooms: (state, action) => {
            state.roomsList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRooms.fulfilled, (state, { payload }) => {
            state.status = "success";
            state.roomsList = payload.data;
        })
        .addCase(getRooms.pending, (state, { payload }) => {
            state.status = "pending";
        })
        .addCase(getRooms.rejected, (state, { payload }) => {
            state.status = "failed";
        })
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