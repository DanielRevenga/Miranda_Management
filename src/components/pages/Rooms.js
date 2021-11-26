import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { ButtonError, ButtonInfo, ButtonSuccess} from "../../styles/components/Button";
import { MainContainer } from "../../styles/components/MainContainer";
import { rooms_data } from "../../data/rooms_data";
import update from "immutability-helper";
import { RoomCard } from "../../components/RoomCard";

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

function Rooms() {
     
    return (
        <MainContainer>Contact</MainContainer>
    );
}

export default Rooms;