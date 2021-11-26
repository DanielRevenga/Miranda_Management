import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { ButtonError, ButtonInfo, ButtonSuccess} from "../../styles/components/Button";
import { MainContainer } from "../../styles/components/MainContainer";
import { rooms_data } from "../../data/rooms_data";
import update from "immutability-helper";
import { RoomCard } from "../RoomCard";

const StyledRooms = styled.div`
        background-color: ${props => props.theme.main_color_2};
        height: 1000px;
        color: ${props => props.theme.grey_light_stg};
        width: 2000px;
        margin-left: 20vw;
        margin-top: 12vh;
        padding: 25px;      
        
    `;

const StyledTable = styled.table`
    width: 100%;
    border-radius: 6px;
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
        }
    }
`;

export default function Bookings() {
   
    const [roomCards, setRoomCards] = useState(rooms_data);
    console.log(rooms_data);

    // setRoomCards(rooms_data);

    const moveRoomCard = useCallback((dragIndex, hoverIndex) => {
        const dragRoomCard = roomCards[dragIndex];
        setRoomCards(update(roomCards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRoomCard],
            ],
        }));
    }, [roomCards]);

    const renderRoomCard = (card, index) => {
        return (
            <RoomCard 
                key={card.id}
                index={index}
                id={card.id}
                first_name={card.first_name}
                last_name={card.last_name}
                order_date={card.order_date}
                check_in={card.check_in}
                check_out={card.check_out}
                room_type_number={card.room_type_number}
                room_type_type={card.room_type_type}
                special_request={card.special_request}
                moveCard={moveRoomCard}/>
        );
    };

    return (
        <MainContainer>Rooms
            <StyledTable>
                {/* TABLE HEAD */}
                <thead>
                    <tr>
                        <td>--</td>
                        <td>Guest</td>
                        <td>Order Date</td>
                        <td>Check In</td>
                        <td>Check out</td>
                        <td>Special Request</td>
                        <td>Room Type</td>
                        <td>Status</td>
                        <td>--</td>
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                    {/* <tr>
                        <td></td>
                        <td>Guest</td>
                        <td>Order Date</td>
                        <td>Check In</td>
                        <td>Check out</td>
                        <td><ButtonInfo>aaa</ButtonInfo></td>
                        <td>Room Type</td>
                        <td><ButtonSuccess>aaa</ButtonSuccess></td>
                        <td></td>
                    </tr> */}
                    {roomCards.map((card, i) => renderRoomCard(card, i))}
                </tbody>
            </StyledTable>

            
        </MainContainer>
        
    );
}