export interface Room {
    _id: string;
    number: number;
    room_type_type: string;
    room_type_number: number;
    amenities: string;
    price: number;
    offer_price: number;
    status: string;
    img: string;
    name: string;
    rate: number;
    discount: number;
}

export interface Booking {
    _id: string;
    user_id: string;
    room_id: string;
    status: string;
    order_date: string;
    check_in: string ;
    check_out: string ;
    special_request: string;
}

export interface User {
    _id: string;
    image: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    start_date: string;
    end_date: string;
    description: string;
    status: string;
    job: string;
}

export interface Contact{
    _id: String;
    first_name: String;
    last_name: String;
    email: String;
    phone: String;
    image: String;
    subject: String;
    comment: String;  
}

export interface AuthState{
    auth: boolean;
}

export interface UsersState {
    usersList: User[];
    lastFetch: string;
    status: string;
}

export interface BookingsState {
    bookingsList: Booking[];
    lastFetch: string;
    status: string;
}

export interface RoomsState {
    roomsList: Room[];
    lastFetch: string;
    status: string;
}

export interface ContactsState {
    contactsList: Contact[];
    lastFetch: string;
    status: string;
}