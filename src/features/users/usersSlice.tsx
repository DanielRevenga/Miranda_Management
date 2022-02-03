import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestHeaders } from "axios";
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

export const getUsers: any = createAsyncThunk(
    "dasboard/users",
    async (dispatch, state) => {
        const headers: AxiosRequestHeaders =  {
            'Content-Type': 'application/json'  
        }

        return await axios.get(`http://(process.env.AZURE_HOST_NAME:5000/dashboard/users`, headers);
        // return await axios.get("http://localhost:5000/dashboard/users", headers);
    }
)

const initialState: UsersState = {
    usersList: [],
    lastFetch: "",
    status: "null"
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            // action.payload.id = state.usersList.at(-1).id + 1;
            action.payload.id = state.usersList[state.usersList.length - 1]._id + 1;
            state.usersList.push(action.payload);
        },
        editUser: (state, action) => {
            const editIndex = state.usersList.findIndex(room => room._id === action.payload.id);
            state.usersList.splice(editIndex, 1, action.payload);
        },
        deleteUser: (state, action) => {
            const deleteIndex = state.usersList.findIndex(room => room._id === action.payload.id);
            state.usersList.splice(deleteIndex, 1);
        },
        sortUsers: (state, action) => {
            state.usersList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            state.status = "success";
            state.usersList = payload.data;
        })
        .addCase(getUsers.pending, (state, { payload }) => {
            state.status = "pending";
        })
        .addCase(getUsers.rejected, (state, { payload }) => {
            state.status = "failed";
        })
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