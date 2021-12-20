import styled from "styled-components";

export const Icon = styled.div`
    div{   
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 45px;
        padding: 14px;
        font-size: 1em;
        background-color: #686868;
        color: ${props => props.theme.green_std};
        border:0 !important;
        border-radius: 8px;

        i{
           height: 100%;
        }
    }
`;
