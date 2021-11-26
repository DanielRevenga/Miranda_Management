import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ButtonGreen } from "../../styles/components/Button";

const StyledSideBarMenu = styled.nav`
    background-color: ${props => props.theme.main_color_1};
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding-bottom: 1000px;
    // border-right: 1px solid #0000006E;
    width: 17vw;
    color: ${props => props.theme.grey_light_stg};  
    box-shadow: 15px -2px 20px 0px rgba(26,25,26.25);
    z-index:2;
`;

const Logo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid ${props => props.theme.grey_dark};
    padding: 15px 20px;
    padding-bottom: 25px;

    .logo{
        width 30%;
        height: 70px;     
    }

    .titles{
        
        width: 60%;

        .subtitle{
            color: #686868;
            font-size: 0.6em;
        }

        .title{
            color: #fff;
            font-size: 1.7em;
            font-weight: bold;
        }
    }
`;

const StyledNav = styled.div`
    ul{
        list-style-type: none;
        font-size: 1.1em;
        font-weight: bold;

        li{
            width: 100%;
            display: flex;
            padding-left: 15px;

            div:first-child{
                width: 25%;
            }

            &:hover{
                background-color: ${props => props.theme.grey_std}
            }

            a{
                display: flex;
                width: 100%;
                padding: 20px 25px;
                color: #686868;
                
            }

            &.red{       
                border-top: 4px solid ${props => props.theme.main_color_1};
                border-bottom: 4px solid ${props => props.theme.main_color_1};
                border-left: 8px solid ${props => props.theme.red_std};

                a{
                    color: ${props => props.theme.red_std};
                }
            }
        }
    }
`;

const ContactUs = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 190px;
    margin-left: auto;
    margin-right: auto;
    background-color: #292828;
    width: 75%;
    border-radius: 12px;
    padding: 10px;
    padding-top: 50px;
    padding-bottom: 20px;
    text-align: center;
    position: relative;

    .title{
        color: #EBEBEB;
        font-size: 1.4em;
    }
    .subtitle{
        font-size: .9em;
    }

    .user{
        height: 60px;
        width: 60px;
        border-radius: 6px;
        background-color: ${props => props.theme.grey_lighter};
        position: absolute;
        top: -25px;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    margin-top: 40px;

    .title{
        color: #EBEBEB;
        margin-bottom: 7.5px;
    }
    .subtitle{
        color: #799283;
        font-size: .8em;
    }
`;


function SideBarMenu() {

    const location = useLocation();
    const path = location.pathname;

    return (
        <StyledSideBarMenu>
            {/* LOGO */}
            <Logo>
                <div className="logo">
                    <img src={"/public/img/hotel_logo.png"} alt="" />
                    <img src="/img/hotel_logo.png" alt="" width="100%" height="100%" />
                </div>
                <div className="titles">
                    <div className="title">travl</div>
                    <div className="subtitle">Hotel Admin Dashboard</div>
                </div>
            </Logo>
            {/* NAV MENU */}
            <StyledNav>
                <ul>
                    {path=="/" ? 
                        <li className="red">
                            <Link to="/">
                                <div><i className="fas fa-chart-pie"></i></div>
                                <div>Dashboard</div>                                                    
                            </Link>
                        </li> : 
                        <li>
                            <Link to="/">
                                <div><i className="fas fa-chart-pie"></i></div>                                   
                                <div>Dashboard</div>                                                    
                            </Link>
                        </li> 
                    }

                    {path.includes("/rooms") ? 
                        <li className="red">
                            <Link to="/rooms">
                                <div><i className="fas fa-key"></i></div>
                                <div>Rooms</div>
                            </Link>
                        </li> : 
                        <li>
                            <Link to="/rooms">
                                <div><i className="fas fa-key"></i></div>
                                <div>Rooms</div>
                            </Link>
                        </li>
                    }
                    
                    {path.includes("/bookings") ? 
                        <li className="red">
                            <Link to="/bookings">
                                <div><i className="fas fa-calendar-day"></i></div>
                                <div>Bookings</div>
                            </Link>
                        </li> : 
                        <li>
                            <Link to="/bookings">
                                <div><i className="fas fa-calendar-day"></i></div>
                                <div>Bookings</div>
                            </Link>
                        </li>
                    }
                    
                    {path.includes("/contact") ? 
                        <li className="red">
                            <Link to="/contact">
                                <div><i className="fas fa-users"></i></div>
                                <div>Contact</div>
                            </Link>
                        </li> : 
                        <li>
                            <Link to="/contact">
                                <div><i className="fas fa-users"></i></div>
                                <div>Contact</div>
                            </Link>
                        </li>
                    }
                    

                    {path.includes("/users") ? 
                        <li className="red">
                            <Link to="/users">
                                <div><i className="fas fa-puzzle-piece"></i></div>
                                <div>Users</div>
                            </Link>
                        </li> : 
                        <li>
                            <Link to="/users">
                                <div><i className="fas fa-puzzle-piece"></i></div>
                                <div>Users</div>
                            </Link>
                        </li>
                    }
                    
                </ul>
            </StyledNav>
            {/* EDIT PROFILE */}
            <ContactUs>
                <div className="user"></div>
                <div className="title">
                    William Johanson
                </div>
                <div className="subtitle">
                    williamjohn@mail.com
                </div>

                <ButtonGreen>Edit</ButtonGreen>
            </ContactUs>
            {/* EXTRA INFO */}
            <Info>
                <div className="title">Travl Hotel Admin Dashboard</div>
                <div className="subtitle">&copy; 2020 All Rights Reserved</div>
            </Info>
        </StyledSideBarMenu>
    );
}

export default SideBarMenu;