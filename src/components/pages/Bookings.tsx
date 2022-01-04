import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { MainContainer } from "../../styles/components/MainContainer";
// import { bookings_data } from "../../data/bookings_data";
import update from "immutability-helper";
import { BookingCard } from "../BookingCard";
import { useSelector } from "react-redux";
import { selectBookings } from "../../features/bookings/bookingsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SelectGreen, SelectGreenOutlined } from "../../styles/components/Select";
import { Booking } from "../../interfaces/interfaces";

// const StyledRooms = styled.div`
//     background-color: ${props => props.theme.main_color_2};
//     height: 1000px;
//     color: ${props => props.theme.grey_light_stg};
//     width: 2000px;
//     margin-left: 20vw;
//     margin-top: 12vh;
//     padding: 25px;       
// `;

const StyledTable = styled.table`
    width: 100%;
    border-radius: 8px;
    border-collapse: collapse;
    background-color: ${props => props.theme.main_color_1};
    border-spacing: 0px;
    color: #E8F2EF;

    thead{
        font-weight: bold;
        border-bottom: 2px solid ${props => props.theme.grey_std};

        td{
            padding-top: 15px;
        }
    }

    tbody{
        td{
            border-bottom: 1px solid ${props => props.theme.grey_std};
        }
    }

    td{
        padding 5px;
        cursor: move;

        &:first-child{
            padding-left: 25px;
            width: 20%;
        }
        &:last-child{
            padding-right: 20px;
        }
        i{
            cursor: pointer;
        }
    }
`;

const FilterStateNav = styled.nav`
    color: #6E6E6E;
    margin-bottom: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ul{
        display: flex;
        list-style-type: none;
        width: 45%;

        li{
            text-align: center;    
            flex: 1 1 15%;                

            a{
                padding: 8px 16px;
                display: block;
                width: 100%;
                border-bottom: 2px solid ${props => props.theme.main_color_1};

                &:hover{
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
                &:active{
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
                &:focus {
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
                &:target {
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
            }
        }
    }

    div{
        width: 40%;
        display: flex;
        justify-content: flex-end;

        select:nth-of-type(1){
            width: 70%;     
            margin-right: 4%;
            font-size: .9em;
            text-align: center;  
        }
    
        select:nth-of-type(2){
            // width: 10%;
            text-align: center;     
        }
    }
`;

export default function Bookings() {
   
    const bookingsState = useSelector(selectBookings);
    const bookings = bookingsState.bookingsList;
    console.log("bookingsState");
    console.log(bookingsState);
    const [cards, setCards] = useState(bookings);

    useEffect(() =>{
        setCards(bookings);    
    }, [bookings]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards]);

    const renderCard = (card:Booking, index:number) => {
        return (
            <BookingCard 
                key={card.id}
                index={index}
                booking={card}
                id={card.id}
                first_name={card.first_name}
                last_name={card.last_name}
                order_date={card.order_date}
                check_in={card.check_in}
                check_out={card.check_out}
                room_type_number={card.room_type_number}
                room_type_type={card.room_type_type}
                special_request={card.special_request}
                moveCard={moveCard}/>
        );
    };

    return (
        <MainContainer>
            <FilterStateNav>
                <ul>
                    <li><Link to="">All&nbsp;Guest</Link></li>
                    <li><Link to="">Pending</Link></li>
                    <li><Link to="">Booked</Link></li>
                    <li><Link to="">Canceled</Link></li>
                    <li><Link to="">Refund</Link></li>
                </ul>

                {/* <ButtonGreen>1 November 2020 - 30 November 2020</ButtonGreen> */}
                <div>
                    <SelectGreen>
                        <option value="0">1 November 2020 - 30 November 2020</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </SelectGreen>
                    <SelectGreenOutlined>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </SelectGreenOutlined>
                </div>
            </FilterStateNav>

            <StyledTable>
                {/* TABLE HEAD */}
                <thead>
                    <tr>
                        <td>Guest</td>
                        <td>Order Date</td>
                        <td>Check In</td>
                        <td>Check out</td>
                        <td>Special Request</td>
                        <td>Room Type</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                    {cards.map((card:Booking, i:number) => renderCard(card, i))}
                </tbody>
            </StyledTable>

            
        </MainContainer>
        
    );
}