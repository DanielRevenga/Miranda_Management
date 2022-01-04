import { createSlice } from "@reduxjs/toolkit";
import { users_data } from "../../data/users_data";
import { User, UsersState } from "../../interfaces/interfaces";
import { RootState } from "../../store";

function loadInitialUserList(): User[] {
    let users: User[] = [];
    for (let user of users_data){
        users.push({
            ...user,
            phone: parseInt(user.phone)
        })
    }
    return users;
}

const initialState: UsersState = {
    usersList: [],
    lastFetch: ""
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    // initialState: {
    //     usersList: [],
    //     lastFetch: ""
    // } as UsersState,
    reducers: {
        addUser: (state, action) => {
            // action.payload.id = state.usersList.at(-1).id + 1;
            action.payload.id = state.usersList[state.usersList.length - 1].id + 1;
            state.usersList.push(action.payload);
        },
        editUser: (state, action) => {
            const editIndex = state.usersList.findIndex(room => room.id === action.payload.id);
            state.usersList.splice(editIndex, 1, action.payload);
        },
        deleteUser: (state, action) => {
            const deleteIndex = state.usersList.findIndex(room => room.id === action.payload.id);
            state.usersList.splice(deleteIndex, 1);
        },
        sortUsers: (state, action) => {
            state.usersList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    }
});

export const selectUsers = (state: RootState) => state.users;

export const {
    addUser,
    editUser,
    deleteUser,
    sortUsers
} = usersSlice.actions;

export default usersSlice.reducer;