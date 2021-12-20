import { createSlice, current } from "@reduxjs/toolkit";

function loadInitialState() {

}

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        contactsList: [],
        lastFetch: ""
    },
    reducers: {
        addContact: (state, action) => {
            action.payload.id = state.contacts.contactsList.at(-1).id + 1;
            state.contacts.contactsList.push(action.payload);
        },
        editContact: (state, action) => {
            const editIndex = state.contacts.contactsList.findIndex(room => room.id === action.payload.id);
            state.contacts.contactsList.splice(editIndex, 1, action.payload);
        },
        deleteContact: (state, action) => {
            const deleteIndex = state.contacts.contactsList.findIndex(room => room.id === action.payload.id);
            state.contacts.contactsList.splice(deleteIndex, 1);
        },
        sortContacts: (state, action) => {
            state.contacts.contactsList.sort((a, b) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
        }
    }
});

export const selectContacts = state => state.contacts;

export const {
    addContact,
    editContact,
    deleteContact,
    sortContacts
} = contactsSlice.actions;

export default contactsSlice.reducer;