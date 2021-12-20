import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

import Header from "./Header";
import SideBarMenu from "./SideBarMenu";

const StyledLayout = styled.div`
        width: 100%;
`;

interface LayoutProps {
    children: JSX.Element | JSX.Element[];
}

const Layout = ({children}: LayoutProps) => {    

    const {authState} = useContext(AuthContext);
    
    return (
        <StyledLayout>
            { authState ? <SideBarMenu /> : null }
            { authState ? <Header /> : null }         
            { children }
        </StyledLayout>       
    );
}

export default Layout;