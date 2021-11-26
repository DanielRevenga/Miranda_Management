import React from "react";
import styled from "styled-components";

import Header from "./Header";
import SideBarMenu from "./SideBarMenu";

const StyledLayout = styled.div`
        width: 100%;
    `;

function Layout(props) {    
    
    return (
        <StyledLayout>
            { props.logged ? <SideBarMenu /> : null }
            { props.logged ? <Header /> : null }         
            { props.children }
        </StyledLayout>
    );
}

export default Layout;