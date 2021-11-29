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
        i{
            padding: 5px;
            cursor: pointer;
        }
    }
`;

export default function Rooms() {
   
    const [cards, setCards] = useState(rooms_data);
    console.log(rooms_data);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards]);

    const renderCard = (card, index) => {
        return (
            <RoomCard 
                key={card.id}
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
            <StyledTable>
                {/* TABLE HEAD */}
                <thead>
                    <tr>
                        <td>--</td>
                        <td>--</td>
                        <td>Number</td>
                        <td>Room Type</td>
                        <td>Amenities</td>
                        <td>Price</td>
                        <td>Offer Price</td>
                        <td>Status</td>
                        <td>--</td>
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                    {cards.map((card, i) => renderCard(card, i))}
                </tbody>
            </StyledTable>

            
        </MainContainer>
        
    );
}