import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addBooking } from "../../features/bookings/bookingsSlice";
import { ButtonGreen } from "../../styles/components/Button";
import { Icon } from "../../styles/components/Icon";
import { MainContainer } from "../../styles/components/MainContainer";
import { Booking } from "../../types/types";

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
    w?:string;
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

export default function AddBooking() {

    const [booking, setBooking] = useState<Booking | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.target.value;
        if (booking !== null) {       
            let newBooking:Booking = {...booking};
            newBooking["first_name"] = name;
            setBooking(newBooking);           
        }
    }

    const lastNameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const lastName = e.target.value;
        if (booking !== null) {  
            let newBooking:Booking = {...booking};
            newBooking["last_name"] = lastName;
            setBooking(newBooking);
        }
    }

    const orderDateChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const orderDate = e.target.value;
        if (booking !== null) {  
            let newBooking:Booking = {...booking};
            newBooking["order_date"] = orderDate;
            setBooking(newBooking);
        }
    }

    const checkInChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const checkIn = e.target.value;
        if (booking !== null) {  
            let newBooking:Booking = {...booking};
            newBooking["check_in"] = checkIn;
            setBooking(newBooking);
        }
    }

    const checkOutChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const checkOut = e.target.value;
        if (booking !== null) {  
            let newBooking:Booking = {...booking};
            newBooking["check_out"] = checkOut;
            setBooking(newBooking);
        }
    }

    const roomTypeChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const roomType = e.target.value;
        if (booking !== null) {  
            let newBooking:Booking = {...booking};
            newBooking["room_type_type"] = roomType;
            newBooking["room_type_number"] = "34";
            setBooking(newBooking);
        }
    }

    const handleSubmit = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (booking !== null) {  
            if (booking["first_name"] && booking["last_name"] && booking["check_in"] 
                && booking["check_out"] && booking["order_date"]){
                    
                navigate("/bookings");
                dispatch(addBooking(booking));
            }
        }             
    }
    
    return (
        <MainContainer>
            <Card>
                {/* FIRST NAME */}
                <FormControl>
                    <label htmlFor="userName">First Name</label>
                    <IconForm>
                        <div><i className="fas fa-file-alt"></i></div>
                    </IconForm>
                    
                    <input id="userName" name="userName" type="text" onChange={e => nameChangeHandler(e)} />                           
                </FormControl>
                {/* LAST NAME */}
                <FormControl>
                    <label htmlFor="userLastName">Last Name</label>
                    <IconForm>
                        <div><i className="fas fa-file-alt"></i></div>
                    </IconForm>
                    <input id="userLastName" name="userLastName" type="text" onChange={lastNameChangeHandler} />                           
                </FormControl>
                {/* ORDER DATE */}
                <FormControl>
                    <label htmlFor="orderDate">Order Date</label>
                    <IconForm>
                        <div><i className="fas fa-calendar-alt"></i></div>
                    </IconForm>
                    <input id="orderDate" name="orderDate" type="date" onChange={orderDateChangehandler} />                           
                </FormControl>
                {/* CHECK IN */}
                <FormControl>
                    <label htmlFor="checkIn">Check In</label>
                    <IconForm>
                        <div><i className="fas fa-calendar-check"></i></div>
                    </IconForm>
                    <input id="checkIn" name="checkIn" type="date" onChange={checkInChangehandler} />                           
                </FormControl>
                {/* CHECK OUT */}
                <FormControl>
                    <label htmlFor="checkOut">Check Out</label>
                    <IconForm>
                        <div><i className="fas fa-calendar-times"></i></div>
                    </IconForm>
                    <input id="checkOut" name="checkOut" type="date" onChange={checkOutChangehandler} />                           
                </FormControl>
                {/* ROOM TYPE */}
                
                <FormControl>
                    <label htmlFor="roomType">Room Type</label>
                    <IconForm>
                        <div><i className="fas fa-tags"></i></div>
                    </IconForm>
                    <input id="roomType" name="roomType" type="text" onChange={roomTypeChangehandler} />                           
                </FormControl>

                <ButtonGreen type="submit" onClick={handleSubmit}>ADD</ButtonGreen>
            </Card>
        </MainContainer>
    );
}