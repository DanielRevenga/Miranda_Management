import { createSlice, current } from "@reduxjs/toolkit";
import { Contact, ContactsState } from "../../interfaces/interfaces";
import { RootState } from "../../store";

import { contacts_data } from '../../data/contacts_data';

function loadInitialStateContactsList() {
    let contacts: Contact[] = [];
    let id = 1;
    for (let contact of contacts_data){
        contacts.push({
            ...contact,
            id: id.toString()
        });
        id++;
    }
    return contacts;
}


const initialState: ContactsState = {
    contactsList: loadInitialStateContactsList(),
    lastFetch: ""
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    // initialState: {
    //     contactsList: [],
    //     lastFetch: ""
    // },
    reducers: {
        addContact: (state, action) => {
            // action.payload.id = state.contactsList.at(-1).id + 1;
            // action.payload.id = state.contactsList[state.contactsList.length - 1].id + 1;
            state.contactsList.push(action.payload);
        },
        editContact: (state, action) => {
            const editIndex = state.contactsList.findIndex(room => room.id === action.payload.id);
            state.contactsList.splice(editIndex, 1, action.payload);
        },
        deleteContact: (state, action) => {
            const deleteIndex = state.contactsList.findIndex(room => room.id === action.payload.id);
            state.contactsList.splice(deleteIndex, 1);
        },
        sortContacts: (state, action) => {
            state.contactsList.sort((a:any, b:any) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
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