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
import axios from "axios";
import { selectRooms } from "../../features/rooms/roomsSlice";
import { selectUsers } from "../../features/users/usersSlice";
import { ButtonGreenWhite, ButtonGreenOutlined } from '../../styles/components/Button';
import ButtonPagList from '../ButtonPagList';

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
        text-align: center;

        td{
            padding-top: 15px;
        }
    }

    tbody{
        tr{
            height: 100px;
        }
        td{          
            border-bottom: 1px solid ${props => props.theme.grey_std};

            &:last-child{
                width: 10%;
                font-size: 1.4rem;

                i{
                    margin-right: 15px;                 

                    &.delete{                      
                        color: #E2342826;
                        margin-right: 0;

                        &:hover{
                            color: ${ props => props.theme.red_std };
                        }
                    }

                    &.edit{
                        color: ${ props => props.theme.green_std };

                        &:hover{
                            color: #5AD07A;
                        }
                    }
                }
            }
        }
    }

    td{
        padding 5px;
        cursor: move;
        text-align: center;

        &:first-child{
            padding-left: 25px;
            width: 80px;
        }
        &:last-child{
            padding-right: 20px;
        }
        i{
            cursor: pointer;
        }
        &.status{
            width: 14.5%;
            button{
                width: 90%;
            }
        }
        &.date{
            letter-spacing: 1px;
        }

        tr{
            
            border-bottom: 1px solid red;
            border: 1px solid red;
            
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

            a.active{
                color: #135846;
                    border-bottom: 2px solid #135846;
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

            option{
                text-align: left; 
                border: 2px solid red;
                margin-bottom: 20px;
            }
        }
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    display: flex;
    margin-top: 10px;
    border-radius: 6px;
    width: 100%;

    .controllers{
        display: flex;
        button{
            color: #fff;  
            background-color: #202020;

            &:hover{
                color: #fff;
                background-color: #135846;
            }
            &.hidden{
                visibility: hidden;
            }
        }
        
        div.pages{
            margin: 0 15px;
            // border: 1px solid red;
            background-color: #202020;
    
            button{
                background-color: #202020;
                border: 1px solid transparent;
                color: #686868;
    
                &:hover{
                    color: #fff;
                    background-color: #135846;
                }               
            }
        }
    }
`;

export default function Bookings() {
   
    const bookingsState = useSelector(selectBookings);
    const roomsState = useSelector(selectRooms);
    const usersState = useSelector(selectUsers);
    const bookings = bookingsState.bookingsList;
    const rooms_ = roomsState.roomsList;
    const users_ = usersState.usersList;

    const [rooms, setRooms] = useState(rooms_);
    const [users, setUsers] = useState(users_);

    const [filterStatus, setFilterStatus] = useState("all");
    const [filterAge, setFilterAge] = useState("newest");

    const maxBookingPerPage = 10;
    const [page, setPage] = useState(1);
    const maxPage_ = Math.ceil( bookings.length / maxBookingPerPage );
    const [maxPage, setMaxPage] = useState(maxPage_);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    
    let firstBookingIndex = maxBookingPerPage * (page - 1);
    let lastBookingIndex = firstBookingIndex + maxBookingPerPage;
    
    const [cards, setCards] = useState<any>(bookings);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards, bookings]);

    useEffect( () => {
        setUsers(usersState.usersList);
        setRooms(roomsState.roomsList);
    }, [usersState, roomsState])

    useEffect( () => {
        if (bookings.length){
            let filteredBookings_ = ([...bookings]);
            if (filterAge === "newest") filteredBookings_.sort((a,b)=>new Date(a.order_date).getTime()-new Date(b.order_date).getTime());
            if (filterAge === "oldest") filteredBookings_.sort((a,b)=>new Date(b.order_date).getTime()-new Date(a.order_date).getTime());

            if (filterStatus === "check_in"){
                // setFilteredBookings(filteredBookings.filter(booking => booking.status === "check in"));
                filteredBookings_ = filteredBookings_.filter(booking => booking.status === "check in");
                setCards(filteredBookings_);
            }else if (filterStatus === "check_out"){
                filteredBookings_ = filteredBookings_.filter(booking => booking.status === "check out");
                setCards(filteredBookings_);
            }else if (filterStatus === "in_progress"){
                filteredBookings_ = filteredBookings_.filter(booking => booking.status === "in progress");
                setCards(filteredBookings_);
            }else{
                setCards(filteredBookings_);
            }
            
            setMaxPage(Math.ceil( filteredBookings_.length / maxBookingPerPage ));
            setFilteredBookings(filteredBookings_);
            
        }

    }, [filterStatus, filterAge, page, bookings]);

    const renderCard = (card:Booking, index:number) => {
        const room=rooms.find( room => room._id === card.room_id );
        const user=users.find( user => user._id === card.user_id );

        return (
            <BookingCard 
                // key={card._id}
                index={index}
                booking={card}
                id={card._id}
                room={room}
                user={user}
                order_date={card.order_date}
                check_in={card.check_in}
                check_out={card.check_out}
                special_request={card.special_request}
                moveCard={moveCard}/>
        );
    };

    const changeAgeSelectHandler = (e:any) => {
        setFilterAge(e.target.value);
    }

    const leftControllerHandler = () => {
        if ( page === 1 ) return;
        setPage( last => last - 1);
    }

    const rightControllerHandler = () => {
        if ( page >= filteredBookings.length / maxBookingPerPage || filteredBookings.length < maxBookingPerPage ) return;
        setPage( last => last + 1);
    }

    return (
        <MainContainer>
            <FilterStateNav>
                <ul>
                    {
                        filterStatus === "all" 
                        ? <li><Link to="" onClick={() => {setFilterStatus("all"); setPage(1);}} className="active">All&nbsp;Guest</Link></li>
                        : <li><Link to="" onClick={() => {setFilterStatus("all"); setPage(1);}}>All&nbsp;Guest</Link></li>
                    }
                    {
                        filterStatus === "check_in"
                        ? <li><Link to=""onClick={() => {setFilterStatus("check_in"); setPage(1);}}  className="active">Check In</Link></li>
                        : <li><Link to=""onClick={() => {setFilterStatus("check_in"); setPage(1);}} >Check In</Link></li>
                    }
                    {
                        (filterStatus === "check_out") 
                        ? <li><Link to=""onClick={() => {setFilterStatus("check_out"); setPage(1);}}  className="active">Check Out</Link></li>
                        : <li><Link to=""onClick={() => {setFilterStatus("check_out"); setPage(1);}} >Check Out</Link></li>
                    }
                    {
                        filterStatus === "in_progress"
                        ? <li><Link to=""onClick={() => {setFilterStatus("in_progress"); setPage(1);}}  className="active">In Progress</Link></li>
                        : <li><Link to=""onClick={() => {setFilterStatus("in_progress"); setPage(1);}} >In Progress</Link></li>
                    }
                </ul>

                {/* <ButtonGreen>1 November 2020 - 30 November 2020</ButtonGreen> */}
                <div>
                    <SelectGreen>
                        <option value="0">1 November 2020 - 30 November 2020</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </SelectGreen>
                    <SelectGreenOutlined onChange={changeAgeSelectHandler} value={filterAge}>
                        <option value="newest">Order By Newest</option>
                        <option value="oldest">Order By Oldest</option>
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
                    {
                        cards
                            .slice( firstBookingIndex, lastBookingIndex )
                            .map((card:Booking, i:number) => renderCard(card, i))
                    }
                </tbody>
            </StyledTable>

            <Pagination>
                <div className="info">
                    {/* 1234 */}
                </div>
                <div className="controllers">
                    {
                        page === 1
                        ?
                            <ButtonGreenOutlined onClick={leftControllerHandler} className="hidden">
                                Prev
                            </ButtonGreenOutlined>
                        :
                            <ButtonGreenOutlined onClick={leftControllerHandler}>
                                Prev
                            </ButtonGreenOutlined>
                    }
                    <div className="pages">

                        <ButtonPagList 
                            setPage={setPage} maxPage={maxPage} />

                        {/* <ButtonGreenWhite>
                            1
                        </ButtonGreenWhite>
                        <ButtonGreenWhite>
                            2
                        </ButtonGreenWhite>
                        <ButtonGreenWhite>
                            3
                        </ButtonGreenWhite> */}
                    </div>
                    {
                        page >= filteredBookings.length / maxBookingPerPage || filteredBookings.length < maxBookingPerPage
                        ?
                            <ButtonGreenOutlined onClick={rightControllerHandler} className="hidden">
                                Next
                            </ButtonGreenOutlined>
                        :
                            <ButtonGreenOutlined onClick={rightControllerHandler}>
                                Next
                            </ButtonGreenOutlined>
                    }
                </div>
            </Pagination>

            
        </MainContainer>
        
    );
}