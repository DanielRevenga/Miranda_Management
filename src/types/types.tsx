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
    email: string ;
    check_in: string ;
    check_out: string ;
    room_type_type: string;
    room_type_number: string;
    order_date: string;
    discount: number ;
    special_request: string;
}

export interface User {
    img: string;
    name: string;
    position: string;
    id: number;
    email: string;
    phone: number;
    start_date: string;
    end_date: string;
    description: string;
    state: string;
}

export interface UsersState {
    usersList: Array<User>,
    lastFetch: string
}

export interface BookingsState {
    bookingsList: Booking[],
    lastFetch: string
}