import { Link } from "react-router-dom";
import styled from "styled-components";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BiCheckCircle } from "react-icons/bi";
import { ImCancelCircle} from "react-icons/im"; 
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, selectContacts } from '../../features/contacts/contactsSlice';
import { useEffect, useState } from "react";

import { ButtonError } from "../../styles/components/Button";
import { MainContainer } from "../../styles/components/MainContainer";
import ReservationStatsGraph2 from "../ReservationStatsGraph2";
import MyCalendar from '../extra/fullCalendar/MyCalendar';
import DashboardReviewsList from '../DashboardReviewsList';
import { Booking, Contact, Room, User } from "../../interfaces/interfaces";
import BookingsInfoList from '../BookingsInfoList';
import { getBookings, selectBookings } from "../../features/bookings/bookingsSlice";
import axios from "axios";
import { getRooms, selectRooms } from "../../features/rooms/roomsSlice";
import { getUsers, selectUsers } from "../../features/users/usersSlice";


const StyledDashboard = styled(MainContainer)`

    display: grid;
    height: 1700px;
    grid-template: 0.7fr 2.6fr 0.8fr 1.4fr 1.6fr / repeat(4, 1fr);
    gap: 2%;

    .react-calendar{
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.main_color_1};
        border: none;

        .react-calendar__navigation{
            button{
                color: ${props => props.theme.grey_lighter};
                
                &:hover,
                &:active,
                &:focus{          
                    background: ${props => props.theme.grey_light_stg};
                    border-radius: 6px;
                }
            }
        }

        .react-calendar__viewContainer{
            height: 88%;

            button{
                color: ${props => props.theme.grey_lighter};
            }
    
            .react-calendar__month-view {
                height: 100%;

                & > div{
                    height: 100%;

                    & > div{
                        height: 100%;

                        .react-calendar__month-view__days{
                            width: 100%;
                            height: 70%;
                
                            button{
                                width: 14.2%;
                                padding: 1.5% 0;
                                padding: 0;
                                width: 100%;
                                height: 22%;
                                margin: 0;
                                border-radius: 6px;
                                background-color: ${props => props.theme.main_color_1};
                                     
                                &.react-calendar__tile--now{
                                    background-color: ${props => props.theme.grey_light_stg};
                                }

                                &.react-calendar__tile--active{
                                    background-color: ${props => props.theme.green_std};
                                }

                                abbr{
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 1.3em;
                                    // background-color: ${props => props.theme.main_color_1};

                                    &:hover,
                                    &:active,
                                    &:focus{
                                        color: ${props => props.theme.green_std};
                                        background-color: ${props => props.theme.grey_light_stg};
                                    }
                                }
                            }
                                
                        }
                
                        .react-calendar__month-view__weekdays__weekday{
                            color: #799283;
                            font-weight: bold;
                            font-size: 1.3em;
                
                            *{
                                text-decoration: none;
                            }
                        }
                    }                 
                }            
            }   
        }        
    }
`;

interface CardProps {
    row?: string;
    rowSpan?: string;
    column?: string;
    columnSpan?: string;
    bg?: any;
    display?: any;
    justify?: any;
}

const Card = styled.div< CardProps >`
    border-radius: 16px;
    grid-row: ${props => props.row} / span ${props => props.rowSpan};
    grid-column: ${props => props.column} / span ${props => props.columnSpan};
    background-color: ${props => props.bg ? props.theme.green_std : props.theme.main_color_1 };
    display: ${props => props.display};
    justify-content: ${props => props.justify};
    padding: 27px;
    flex-wrap: wrap;

    button {
        margin-right: 15px;

        i{
            font-size: 1.4em;
        }
    }

    .titles{

        .title{
            font-size: 1.8em;
            color: #FFEDEC;
            margin-bottom: 3px;
        }

        .subtitle{

        }
    }

    h2{
        width: 100%;
        margin-bottom: 30px;
        font-size: 1.4rem;
        margin-left: 40px;
    }
    
    h3{
        font-size: 1.5em;
        color: #FFEDEC;
        font-weight: normal;
        margin-bottom: 30px;
    }
`;

const FilterStateNav = styled.nav`
    color: #6E6E6E;
    margin-bottom: 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ul{
        display: flex;
        list-style-type: none;
        width: 45%;

        li{
            text-align: center;    
            flex: 1 1 15%;                

            a{
                padding: 8px 16px;
                display: block;
                width: 100%;
                font-size: 1em;
                font-weight: bold;
                color: ${props => props.theme.grey_light_stg};
                border-bottom: 2px solid ${props => props.theme.grey_light_stg};

                &:hover{
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
                &:active{
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
                &:focus {
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
                &:target {
                    color: #135846;
                    border-bottom: 2px solid #135846;
                }
            }
        }
    }

    div{
        width: 40%;
        display: flex;
        justify-content: flex-end;

        button{
            // width: 70%;
            margin-right: 4%;
            font-size: .9em;
            text-align: center; 
            padding: 12px 32px; 
        }
    
        select{
            // width: 10%;
            text-align: center;     
        }
    }
`;

const GraphLegend = styled.nav`
    width: 100%;
    display: flex;

    & > div{
        display flex;
        width: 50%;
        color: #FFEDEC;
        margin-bottom: 20px;

        .greenBox{
            background-color: ${props => props.theme.green_std};
            height: 15px;
            width: 15px;
            margin-right: 15px;
        }

        .redBox{
            background-color: ${props => props.theme.red_std};
            height: 15px;
            width: 15px;
            margin-right: 15px;
        }

        .info{
            margin-left: 60px;
        }

    }
    svg{
        width: 100% !important;
    }
`;


function Dashboard() {


    // GET STATES
    const bookingsState = useSelector(selectBookings);
    const roomsState = useSelector(selectRooms);
    const contactsState = useSelector(selectContacts);
    const usersState = useSelector(selectUsers);
 
    const [actualDate, setActualDate] = useState(new Date());

    const [contacts, setContacts] = useState<Contact[]>(contactsState.contactsList);
    const [bookings, setBookings] = useState<Booking[]>(bookingsState.bookingsList);
    const [rooms, setRooms] = useState<Room[]>(roomsState.roomsList);
    const [users, setUsers] = useState<User[]>(usersState.usersList);

    useEffect( () => {
        setContacts(contactsState.contactsList);
        setRooms(roomsState.roomsList);
    }, [contactsState, roomsState])

    return (<>
        <StyledDashboard>
            {/* CARDS */}
            <Card display="flex">
                <ButtonError><i className="fas fa-bed fa-fw"></i></ButtonError>
                <div className="titles">
                    <div className="title">8,461</div>
                    <div className="subtitle">New Booking</div>
                </div>
            </Card>
            <Card display="flex">
                <ButtonError><i className="fas fa-calendar-day fa-fw"></i></ButtonError>
                <div className="titles">
                    <div className="title">963</div>
                    <div className="subtitle">Scheduled Room</div>
                </div>
            </Card>
            <Card display="flex">
                <ButtonError><i className="fas fa-check-circle fa-fw"></i></ButtonError>
                <div className="titles">
                    <div className="title">753</div>
                    <div className="subtitle">Check In</div>
                </div>
            </Card>
            <Card display="flex">
                <ButtonError><i className="fas fa-times-circle fa-fw"></i></ButtonError>
                <div className="titles">
                    <div className="title">516</div>
                    <div className="subtitle">Check Out</div>
                </div>
            </Card>

            {/* CALENDARS */}
            <Card column="1" columnSpan="2" >
                {/* <Calendar /> */}
                <MyCalendar 
                    setActualDate={setActualDate} 
                    bookings={bookings}
                    setBookings={setBookings} />
            </Card>
            {/* GRAPHS */}
            <Card column="3" columnSpan="2" display="flex" justify="space-between">
                <h3>Reservation Stats</h3>  
                <FilterStateNav>
                    <ul>
                        <li><Link to="">Daily</Link></li>
                        <li><Link to="">Weekly</Link></li>
                        <li><Link to="">Monthly</Link></li>
                    </ul>
                </FilterStateNav>
                <GraphLegend>
                    <div>
                        <div className="greenBox"></div>
                        Check In
                        <div className="info">23,451</div>
                    </div>
                        
                    <div>
                        <div className="redBox"></div>
                        Check Out&nbsp;
                        <div className="info">20,441</div>
                    </div>      
                </GraphLegend>
                <ReservationStatsGraph2 /> 
            </Card>
            {/* BOOKINGS INFO */}
            <Card row="3" rowSpan="12" column="1" columnSpan="4">
                <BookingsInfoList 
                    bookings={ bookings }
                    actualDate={actualDate}
                    rooms={ rooms }
                    users={ users } />
            </Card>
            <Card column="1" columnSpan="4" display="flex" justify="space-between">
                <h2 className="w100 p30">Latest Reviews by Customers</h2>

                <DashboardReviewsList contacts={ contacts } />
            </Card>
        </StyledDashboard>  
        </>);
}

export default Dashboard;