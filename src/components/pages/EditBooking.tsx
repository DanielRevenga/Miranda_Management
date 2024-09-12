import { ChangeEvent, MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { editBooking, selectBookings } from "../../features/bookings/bookingsSlice";
import { ButtonGreen } from "../../styles/components/Button";
import { Icon } from "../../styles/components/Icon";
import { MainContainer } from "../../styles/components/MainContainer";
import { Booking } from "../../interfaces/interfaces";

const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    // height: 50vw;
    justify-content: space-between;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    background-color: ${props => props.theme.main_color_1};
    border-radius: 24px;
    padding: 30px;

    
`;

interface FormControlProps {
    display?: any;
    justify?: any;
    alignI?: any;
    w?: string;
    mr?: any;
}

const FormControl = styled.div< FormControlProps >`
    position: relative;
    display: ${props => props.display};
    justify-content: ${props => props.justify};
    align-items: ${props => props.alignI};
    // border: 1px solid red;
    flex: 1 1 33%;
    padding: 10px;

    label{
        width: 100%;
        font-size: 1.2em;
    }
    
    input{
        width: ${props => props.w ? (""+props.w+"%") : "100%"};
        margin-right: ${props => props.mr};
        height: 45px;
        border: none;       
        outline: none;
        box-shadow: 0 0 0 0 !important;
        background-color: ${props => props.theme.main_color_2};
        padding: 10px;
        border-radius: 8px;
        margin-bottom: ${props => props.alignI || "20px"};
        padding-left: 60px;
        color: #fff;

        &:focus{
            outline: 0 0 0 0  !important;
            box-shadow: 0 0 0 0 !important;
        }     
    }
`;

const IconForm = styled(Icon)`
    position: absolute;

    div{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`;

export default function EditBooking() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const pathParts = path.split("/");
    const booking_id = pathParts[pathParts.length-1];
    const bookingsState = useSelector(selectBookings);
    const bookings = bookingsState.bookingsList; 
    // console.log(bookings);
    const [booking, setBooking] = useState<any>(
        bookings.find((booking:Booking) => booking._id === (booking_id)));
    // console.log("EDIT BOOKING");
    // console.log(booking);
    // console.log(booking["first_name"]);

    // const nameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const name = e.target.value;
    //     let newBooking = {...booking};
    //     newBooking["first_name"] = name;
    //     setBooking(newBooking);
    // }

    // const lastNameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const lastName = e.target.value;
    //     let newBooking = {...booking};
    //     newBooking["last_name"] = lastName;
    //     setBooking(newBooking);
    // }

    const orderDateChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const orderDate = e.target.value;
        let newBooking = {...booking};
        newBooking["order_date"] = orderDate;
        setBooking(newBooking);
    }

    const checkInChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const checkIn = e.target.value;
        let newBooking = {...booking};
        newBooking["check_in"] = checkIn;
        setBooking(newBooking);
    }

    const checkOutChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const checkOut = e.target.value;
        let newBooking = {...booking};
        newBooking["check_out"] = checkOut;
        setBooking(newBooking);
    }

    // const roomTypeChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const roomType = e.target.value;
    //     let newBooking:Booking = {...booking};
    //     newBooking["room_type_type"] = roomType;
    //     newBooking["room_type_number"] = "";
    //     setBooking(newBooking);
    // }

    const handleSubmit = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (booking["first_name"] && booking["last_name"] && booking["check_in"] && booking["check_out"]
                && booking["order_date"]){

            navigate("/bookings");
            dispatch(editBooking(booking));
        }
             
    }
    
    return (
        <MainContainer>
            <Card>
                {/* FIRST NAME */}
                {/* <FormControl>
                    <label htmlFor="userName">First Name</label>
                    <IconForm>
                        <div><i className="fas fa-file-alt"></i></div>
                    </IconForm>
                    
                    {booking["first_name"] 
                        ? 
                        <input id="userName" name="userName" type="text" onChange={nameChangeHandler} value={booking["first_name"]} /> 
                        : 
                        <input id="userName" name="userName" type="text" onChange={nameChangeHandler} /> 
                    }                                           
                </FormControl> */}
                {/* LAST NAME */}
                {/* <FormControl>
                    <label htmlFor="userLastName">Last Name</label>
                    <IconForm>
                        <div><i className="fas fa-file-alt"></i></div>
                    </IconForm>
                    {booking["last_name"] 
                        ? 
                        <input id="userName" name="userName" type="text" onChange={lastNameChangeHandler} value={booking["last_name"]} /> 
                        : 
                        <input id="userName" name="userName" type="text" onChange={lastNameChangeHandler} /> 
                    }                             
                </FormControl> */}
                {/* ORDER DATE */}
                {/* <FormControl>
                    <label htmlFor="orderDate">Order Date</label>
                    <IconForm>
                        <div><i className="fas fa-calendar-alt"></i></div>
                    </IconForm>
                    {booking["order_date"] 
                        ? 
                        <input id="userName" name="userName" type="date" onChange={orderDateChangehandler} value={booking["order_date"]} /> 
                        : 
                        <input id="userName" name="userName" type="date" onChange={orderDateChangehandler} /> 
                    }                             
                </FormControl> */}
                {/* CHECK IN */}
                <FormControl>
                    <label htmlFor="checkIn">Check In</label>
                    <IconForm>
                        <div><i className="fas fa-calendar-check"></i></div>
                    </IconForm>
                    {booking["check_in"] 
                        ? 
                        <input id="userName" name="userName" type="date" onChange={checkInChangehandler} value={booking["check_in"]} /> 
                        : 
                        <input id="userName" name="userName" type="date" onChange={checkInChangehandler} /> 
                    }                             
                </FormControl>
                {/* CHECK OUT */}
                <FormControl>
                    <label htmlFor="checkOut">Check Out</label>
                    <IconForm>
                        <div><i className="fas fa-calendar-times"></i></div>
                    </IconForm>
                    {booking["check_out"] 
                        ? 
                        <input id="userName" name="userName" type="date" onChange={checkOutChangehandler} value={booking["check_out"]} /> 
                        : 
                        <input id="userName" name="userName" type="date" onChange={checkOutChangehandler} /> 
                    }                             
                </FormControl>
                {/* ROOM TYPE */}
                
                {/* <FormControl>
                    <label htmlFor="roomType">Room Type</label>
                    <IconForm>
                        <div><i className="fas fa-tags"></i></div>
                    </IconForm>
                    {booking["room_type_type"] 
                        ? 
                        <input id="userName" name="userName" type="text" onChange={roomTypeChangehandler} 
                            value={booking["room_type_type"] + " - " + booking["room_type_number"]} /> 
                        : 
                        <input id="userName" name="userName" type="text" onChange={roomTypeChangehandler} /> 
                    }                             
                </FormControl> */}

                <ButtonGreen type="submit" onClick={handleSubmit}>EDIT</ButtonGreen>
            </Card>
        </MainContainer>
    );
}