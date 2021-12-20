import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

import Header from "./Header";
import SideBarMenu from "./SideBarMenu";

const StyledLayout = styled.div`
        width: 100%;
    `;

function Layout(props) {    

    const {auth} = useContext(AuthContext);
    
    return (
        <StyledLayout>
            { auth ? <SideBarMenu /> : null }
            { auth ? <Header /> : null }         
            { props.children }
        </StyledLayout>       
    );
}

export default Layout;