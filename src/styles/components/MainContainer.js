import styled from "styled-components";

export const MainContainer = styled.div`
    background-color: ${props => props.theme.main_color_2};
    color: ${props => props.theme.grey_light_stg};
    width: 83%;
    margin-left: 17%;
    margin-top: 11vh;
    padding: 35px;  
    padding-bottom: 150px;
    min-height: 89vh;
`;