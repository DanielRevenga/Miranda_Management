import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { ButtonError, ButtonInfo, ButtonSuccess} from "../../styles/components/Button";
import { MainContainer } from "../../styles/components/MainContainer";
import { bookings_data } from "../../data/bookings_data";
import update from "immutability-helper";
import { BookingCard } from "../BookingCard";

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
            cursor: pointer;
        }
    }
`;

export default function Bookings() {
   
    const [cards, setCards] = useState(bookings_data);
    console.log(bookings_data);

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
            <BookingCard 
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
                    {cards.map((card, i) => renderCard(card, i))}
                </tbody>
            </StyledTable>

            
        </MainContainer>
        
    );
}