import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

// style={{border:"1px solid blue"}}
const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 11vh;
    font-size: 1em;
    padding: 20px 50px 20px 30px;
    background-color: ${props => props.theme.main_color_1};
    width: 83vw;
    position: fixed;
    left: 17vw;
    top: 0;
    // font-family: ${props => props.theme.poppins};

    nav, h1 {
        font-size: 1.4em;
        color: white;
    }

    nav{
        margin-right: 20px;
    }

    h1{
        width: 25%;
        font-weight: bold;
    }

    .user_group_container{
        display: flex;
        align-items: center;
    }

    .toggleSideBard{
        display: flex;
        width: 25%;

        div i{
            cursor: pointer;
            font-size: 1.4em;
            color: white;
            margin-right: 40px;
        }
    }
    
`;

const Search = styled.div`
    background-color: ${props => props.theme.main_color_2};
    padding: 5px;
    width: 25%;
    margin-right: 20px;
    border-radius: 6px;

    input{
        background-color: ${props => props.theme.main_color_2};
        width: 90%;
        height: 40px;
        border: none;   
        outline: none;   
        color: #fff;   
        padding: 15px;
    }

    i{
        color: #6E6E6E;
        margin-top: 2px;
    }
`;

const Icons_list = styled.div`
    display: flex;
    
    div{
        font-size: 1.5em;
        margin-right: 60px;
        color: ${props => props.theme.green_std};

        a{
            color: ${props => props.theme.green_std};
        }

        i{
            cursor: pointer;

            &[data-count]{
                position: relative;  
            }
                    
            &:after{
                position: absolute;
                right: -1.2em;
                top: -.75em;
                content: attr(data-count);
                padding: .5em;
                border-radius: 4px;
                line-height: .9em;
                color: white;
                background: rgba(255,0,0,.75);
                text-align: center;
                min-width:  1em;
                font: bold .4em sans-serif;
            }
        }
    }
`;

const StyledSelect = styled.select`
    background-color: ${props => props.theme.main_color_1};
    color: ${props => props.theme.red_std};
    border: none;
      
`;

const VerticalLineDiv = styled.div`
    background-color: ${props => props.theme.grey_std};
    border-radius: 2px;
    height: 35px;
    width: 1px;
    margin-right: 15px;
    margin-left: 15px;
`;

const User = styled.div`
    background-color: ${props => props.theme.grey_lighter};
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 15px;
`;

function Header() {

    const {setAuth} = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname;
    let title = "";
    if (path=="/") title="Dashboard";
    else if (path.includes("rooms")) title="Rooms";
    else if (path.includes("bookings")) title="Bookings";
    else if (path.includes("contact")) title="Contact";
    else if (path.includes("users")) title="Users";

    function logOutHandler() {
        localStorage.setItem('loggedUser', false);
        setAuth(false);
    }

    return (
        <StyledHeader>
            <div className="toggleSideBard">
                <div><i className="fas fa-exchange-alt"></i></div>
                <h1>{title}</h1>
            </div>         
            
            <Search>
                <input type="text" /><i className="fas fa-search"></i>
            </Search>

            <Icons_list>
                {/* <div><i className="far fa-heart"></i></div> */}
                <div><i className="far fa-envelope" data-count="2"></i></div>
                <div><i className="far fa-bell" data-count="87"></i></div>
                {/* <div><Link to="/login"><i className="fas fa-sign-out-alt"></i></Link></div> */}
                <div><i onClick={logOutHandler} className="fas fa-sign-out-alt"></i></div>
                {/* <div><i className="far fa-comment-dots"></i></div>   */}
            </Icons_list>              

            <div className="user_group_container">
                <User></User>
                <VerticalLineDiv></VerticalLineDiv>
                <div>
                    <StyledSelect name="" id="">
                        <option value="1">EN</option>
                        <option value="2">ESP</option>
                    </StyledSelect>
                </div>
            </div>
        </StyledHeader>
    );
}

export default Header;