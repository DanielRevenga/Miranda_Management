export interface Room {
    id: number;
    number: number;
    room_type: string;
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
    id: number;
    first_name: string ;
    last_name: string;
    order_date: string;
    check_in: string ;
    check_out: string ;
    special_request: string;
    room_type_type: string;
    room_type_number: string;
    email: string ;
    discount: number ;
}

export interface User {
    image: string;
    full_name: string;
    id: number;
    email: string;
    phone: number;
    start_date: string;
    end_date: string;
    description: string;
    status: string;
    job: string;
}

export interface Contact{
    id: String;
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
}

export interface BookingsState {
    bookingsList: Booking[];
    lastFetch: string;
}

export interface RoomsState {
    roomsList: Room[];
    lastFetch: string;
}

export interface ContactsState {
    contactsList: Contact[];
    lastFetch: string;
}