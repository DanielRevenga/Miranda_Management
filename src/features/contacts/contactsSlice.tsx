import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Contact, ContactsState } from "../../interfaces/interfaces";
import { RootState } from "../../store";

import { contacts_data } from '../../data/contacts_data';
import axios, { AxiosRequestHeaders } from "axios";

function loadInitialStateContactsList() {
    let contacts: Contact[] = [];
    let id = 1;
    for (let contact of contacts_data){
        contacts.push({
            ...contact,
            _id: id.toString()
        });
        id++;
    }
    return contacts;
}

export const getContacts: any = createAsyncThunk(
    "dasboard/contacts",
    async (dispatch, state) => {
        const headers: AxiosRequestHeaders =  {
            'Content-Type': 'application/json'  
        }

        return await axios.get(`https://mirandaback2.azurewebsites.net/dashboard/contacts`, headers);
        // return await axios.get("http://localhost:5000/dashboard/contacts", headers);
    }
)

const initialState: ContactsState = {
    contactsList: [],
    lastFetch: "",
    status: "null"
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, action) => {
            // action.payload.id = state.contactsList.at(-1).id + 1;
            // action.payload.id = state.contactsList[state.contactsList.length - 1].id + 1;
            state.contactsList.push(action.payload);
        },
        editContact: (state, action) => {
            const editIndex = state.contactsList.findIndex(room => room._id === action.payload.id);
            state.contactsList.splice(editIndex, 1, action.payload);
        },
        deleteContact: (state, action) => {
            const deleteIndex = state.contactsList.findIndex(room => room._id === action.payload.id);
            state.contactsList.splice(deleteIndex, 1);
        },
        sortContacts: (state, action) => {
            state.contactsList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.fulfilled, (state, { payload }) => {
            state.status = "success";
            state.contactsList = payload.data;
        })
        .addCase(getContacts.pending, (state, { payload }) => {
            state.status = "pending";
        })
        .addCase(getContacts.rejected, (state, { payload }) => {
            state.status = "failed";
        })
    }
});

export const selectContacts = (state: RootState) => state.contacts;

export const {
    addContact,
    editContact,
    deleteContact,
    sortContacts
} = contactsSlice.actions;

export default contactsSlice.reducer;