import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { ButtonGreen} from "../../styles/components/Button";
import { MainContainer } from "../../styles/components/MainContainer";
// import { rooms_data } from "../../data/rooms_data";
import update from "immutability-helper";
import { RoomCard } from "../RoomCard";
import { useSelector } from "react-redux";
import { selectRooms } from "../../features/rooms/roomsSlice";
import { Link } from "react-router-dom";
import { SelectGreenOutlined } from "../../styles/components/Select";
import { Room } from "../../interfaces/interfaces";

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

        button{
            // width: 70%;
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

export default function Rooms() {
   
    const roomsState = useSelector(selectRooms);
    console.log("roomsState");
    console.log(roomsState);
    const rooms = roomsState.roomsList;
    const [cards, setCards] = useState(rooms);

    useEffect(() =>{
        setCards(rooms);    
    }, [rooms]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards]);

    const renderCard = (card:Room, index:number) => {
        return (
            <RoomCard 
                key={card.id}
                room={card}
                index={index}
                id={card.id}
                number={card.number}
                room_type={card.room_type}
                amenities={card.amenities}
                price={card.price}
                offer_price={card.offer_price}
                status={card.status}
                img={card.img}
                moveCard={moveCard}/>
        );
    };

    return (
        <MainContainer>
            <FilterStateNav>
                <ul>
                    <li><Link to="">All&nbsp;Rooms</Link></li>
                    <li><Link to="">Active&nbsp;Employee</Link></li>
                    <li><Link to="">Inactive&nbsp;Employee</Link></li>
                </ul>

                {/* <ButtonGreen>1 November 2020 - 30 November 2020</ButtonGreen> */}
                <div>
                    <ButtonGreen>
                        + New Room
                    </ButtonGreen>
                    <SelectGreenOutlined>
                        <option value="0">Newest</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </SelectGreenOutlined>
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
                    {cards.map((card:Room, i:number) => renderCard(card, i))}
                </tbody>
            </StyledTable>

            
        </MainContainer>
        
    );
}