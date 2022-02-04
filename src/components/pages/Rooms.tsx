import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { ButtonGreen, ButtonGreenOutlined } from '../../styles/components/Button';
import { MainContainer } from "../../styles/components/MainContainer";
// import { rooms_data } from "../../data/rooms_data";
import update from "immutability-helper";
import { RoomCard } from "../RoomCard";
import { useSelector } from "react-redux";
import { selectRooms } from "../../features/rooms/roomsSlice";
import { Link } from "react-router-dom";
import { SelectGreenOutlined } from "../../styles/components/Select";
import { Room } from "../../interfaces/interfaces";
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

        td{
            // text-align: center;
            padding-top: 15px;
        }
    }

    tbody{
        td{
            border-bottom: 1px solid ${props => props.theme.grey_std};
            padding-right: 10px;

            &:last-child{
                width: 10%;
                font-size: 1.4rem;
                padding-right: 0 !important;

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

        &:first-child{
            padding-left: 25px;
            width: 25%;
        }
        &:last-child{
            padding-right: 20px;
        }
        i{
            padding: 5px;
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
        width: 40%;

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
        width: 60%;
        display: flex;
        justify-content: flex-end;

        button{
            width: 100%;
            margin-right: 4%;
            font-size: .9em;
            text-align: center; 
            padding: 12px 32px; 
        }
    
        select{
            // width: 10%;
            text-align: center;     
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

export default function Rooms() {
   
    const roomsState = useSelector(selectRooms);
    const rooms_ = roomsState.roomsList;

    const [rooms, setRooms] = useState(rooms_);
    const [cards, setCards] = useState(rooms);

    const [filterStatus, setFilterStatus] = useState("all");
    // const [filterAge, setFilterAge] = useState("newest");

    const maxRoomsPerPage = 10;
    const [page, setPage] = useState(1);
    const maxPage_ = Math.ceil( rooms.length / maxRoomsPerPage );
    const [maxPage, setMaxPage] = useState(maxPage_);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

    let firstRoomIndex = maxRoomsPerPage * (page - 1);
    let lastRoomIndex = firstRoomIndex + maxRoomsPerPage;

    useEffect(() =>{
        setCards(roomsState.roomsList);    
        setRooms(roomsState.roomsList);
    }, [roomsState]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards, rooms]);

    const renderCard = (card:Room, index:number) => {
        return (
            <RoomCard 
                key={card._id}
                room={card}
                index={index}
                id={card._id}
                number={card.number}
                room_type_type={card.room_type_type}
                room_type_number={card.room_type_number}
                amenities={card.amenities}
                price={card.price}
                offer_price={card.offer_price}
                status={card.status}
                img={card.img}
                setFilteredRooms={setFilteredRooms}
                moveCard={moveCard}/>
        );
    };

    useEffect( () => {
        if (rooms.length){
            let filteredRooms_ = ([...rooms]);
            // if (filterAge === "newest") filteredRooms_.sort((a,b)=>new Date(a.order_date).getTime()-new Date(b.order_date).getTime());
            // if (filterAge === "oldest") filteredRooms_.sort((a,b)=>new Date(b.order_date).getTime()-new Date(a.order_date).getTime());
            
            if (filterStatus === "available"){
                filteredRooms_ = filteredRooms_.filter(room => room.status === "available");
                setCards(filteredRooms_);
            }else if (filterStatus === "occupied"){
                filteredRooms_ = filteredRooms_.filter(room => room.status === "occupied");
                setCards(filteredRooms_);
            }else{
                setCards(filteredRooms_);
            }
            
            setMaxPage(Math.ceil( filteredRooms_.length / maxRoomsPerPage ));
            setFilteredRooms(filteredRooms_);
            
        }

    }, [filterStatus, page, rooms]);

    const changeAgeSelectHandler = (e:any) => {
        // setFilterAge(e.target.value);
        console.log(e.target.value);
    }

    const leftControllerHandler = () => {
        if ( page === 1 ) return;
        setPage( last => last - 1);
    }

    const rightControllerHandler = () => {
        if ( page >= filteredRooms.length / maxRoomsPerPage || filteredRooms.length < 10 ) return;
        setPage( last => last + 1);
    }

    return (
        <MainContainer>
            <FilterStateNav>
                <ul>
                    {
                        filterStatus === "all" 
                        ? <li><Link to="" onClick={() => {setFilterStatus("all"); setPage(1);}} className="active">All&nbsp;Rooms</Link></li>
                        : <li><Link to="" onClick={() => {setFilterStatus("all"); setPage(1);}}>All&nbsp;Rooms</Link></li>
                    }
                    {
                        filterStatus === "available"
                        ? <li><Link to=""onClick={() => {setFilterStatus("available"); setPage(1);}}  className="active">Available</Link></li>
                        : <li><Link to=""onClick={() => {setFilterStatus("available"); setPage(1);}} >Available</Link></li>
                    }
                    {
                        (filterStatus === "occupied") 
                        ? <li><Link to=""onClick={() => {setFilterStatus("occupied"); setPage(1);}}  className="active">Occupied</Link></li>
                        : <li><Link to=""onClick={() => {setFilterStatus("occupied"); setPage(1);}} >Occupied</Link></li>
                    }
                </ul>

                <div>
                    <Link to="/rooms/addRoom">
                        <ButtonGreen>
                            + New Room
                        </ButtonGreen>
                    </Link>
                    {/* <SelectGreenOutlined>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </SelectGreenOutlined> */}
                </div>
            </FilterStateNav>

            <StyledTable>
                {/* TABLE HEAD */}
                <thead>
                    <tr>
                        <td>Room Name</td>
                        <td>Room Type</td>
                        <td>Amenities</td>
                        <td>Price</td>
                        <td>Offer Price</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                    {
                        cards
                            .slice( firstRoomIndex, lastRoomIndex )
                            .map((card:Room, i:number) => renderCard(card, i))
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

                    </div>
                    {
                        page >= filteredRooms.length / maxRoomsPerPage || filteredRooms.length < maxRoomsPerPage
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