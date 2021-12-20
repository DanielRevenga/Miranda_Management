import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../../types/types";

function loadInitialState() {

}


const usersSlice = createSlice({
    name: "users",
    initialState: {
        usersList: [],
        lastFetch: ""
    } as UsersState,
    reducers: {
        addUser: (state, action) => {
            action.payload.id = state.usersList.at(-1).id + 1;
            state.users.usersList.push(action.payload);
        },
        editUser: (state, action) => {
            const editIndex = state.users.usersList.findIndex(room => room.id === action.payload.id);
            state.users.usersList.splice(editIndex, 1, action.payload);
        },
        deleteUser: (state, action) => {
            const deleteIndex = state.users.usersList.findIndex(room => room.id === action.payload.id);
            state.users.usersList.splice(deleteIndex, 1);
        },
        sortUsers: (state, action) => {
            state.users.usersList.sort((a, b) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    }
});

export const selectUsers = state => state.users;

export const {
    addUser,
    editUser,
    deleteUser,
    sortUsers
} = usersSlice.actions;

export default usersSlice.reducer;