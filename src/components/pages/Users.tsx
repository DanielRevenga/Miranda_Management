import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { MainContainer } from "../../styles/components/MainContainer";
// import { bookings_data } from "../../data/bookings_data";
import update from "immutability-helper";
import { BookingCard } from "../BookingCard";
import { useSelector } from "react-redux";
import { selectBookings } from "../../features/bookings/bookingsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SelectGreen, SelectGreenOutlined } from "../../styles/components/Select";
import { Booking, User } from "../../interfaces/interfaces";
import axios from "axios";
import { selectRooms } from "../../features/rooms/roomsSlice";
import { selectUsers } from "../../features/users/usersSlice";
import { ButtonGreenWhite, ButtonGreenOutlined, ButtonGreen } from '../../styles/components/Button';
import ButtonPagList from '../ButtonPagList';
import UsersList from "../UsersList";

const StyledTable = styled.table`
    width: 100%;
    border-radius: 8px;
    border-collapse: collapse;
    background-color: ${props => props.theme.main_color_1};
    border-spacing: 0px;
    color: #E8F2EF;

    thead{
        font-weight: bold;
        border-bottom: 2px solid ${props => props.theme.grey_std};
        text-align: center;

        td{
            padding-top: 15px;
        }
    }

    tbody{
        tr{
            height: 100px;
        }
        td{         
            border-bottom: 1px solid ${props => props.theme.grey_std};

            &:last-child{
                width: 10%;
                font-size: 1.4rem;

                i{
                    margin-right: 15px;                 

                    &.delete{                      
                        color: #E2342826;
                        margin-right: 0;

                        &:hover{
                            color: ${ props => props.theme.red_std };
                        }
                    }

                    &.edit{
                        color: ${ props => props.theme.green_std };

                        &:hover{
                            color: #5AD07A;
                        }
                    }
                }
            }

            &.avatar{
                width: 60px;
                height: 60px;

                img{
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }

    td{
        padding 5px;
        text-align: center;

        &:first-child{
            padding-left: 25px;
            width: 80px;
        }
        &:last-child{
            padding-right: 20px;
        }
        i{
            cursor: pointer;
        }
        &.status{
            width: 14.5%;
            button{
                width: 90%;
            }
        }
        &.date{
            letter-spacing: 1px;
        }

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
                border-bottom: 2px solid ${props => props.theme.main_color_1};

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

            a.active{
                color: #135846;
                    border-bottom: 2px solid #135846;
            }
        }
    }

    div{
        width: 40%;
        display: flex;
        justify-content: flex-end;

        select:nth-of-type(1){
            width: 70%;     
            margin-right: 4%;
            font-size: .9em;
            text-align: center;  
        }
    
        select:nth-of-type(2){
            // width: 10%;
            text-align: center;     

            option{
                text-align: left; 
                border: 2px solid red;
                margin-bottom: 20px;
            }
        }
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    display: flex;
    margin-top: 10px;
    border-radius: 6px;
    width: 100%;

    .controllers{
        display: flex;
        button{
            color: #fff;  
            background-color: #202020;

            &:hover{
                color: #fff;
                background-color: #135846;
            }
            &.hidden{
                visibility: hidden;
            }
        }
        
        div.pages{
            margin: 0 15px;
            // border: 1px solid red;
            background-color: #202020;
    
            button{
                background-color: #202020;
                border: 1px solid transparent;
                color: #686868;
    
                &:hover{
                    color: #fff;
                    background-color: #135846;
                }               
            }
        }
    }
`;

export default function Users() {
   
    const usersState = useSelector(selectUsers);
    const users_ = usersState.usersList;

    const [users, setUsers] = useState(users_);

    const [filterStatus, setFilterStatus] = useState("all");
    const [filterAge, setFilterAge] = useState("newest");

    const maxUsersPerPage = 10;
    const [page, setPage] = useState(1);
    const maxPage_ = Math.ceil( users.length / maxUsersPerPage );
    const [maxPage, setMaxPage] = useState(maxPage_);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    
    let firstUserIndex = maxUsersPerPage * (page - 1);
    let lastUserIndex = firstUserIndex + maxUsersPerPage;
    
    const [cards, setCards] = useState<any>(users);

    useEffect( () => {
        setUsers(usersState.usersList);
    }, [usersState]);

    useEffect( () => {
        if (users.length){
            let filteredUsers_ = ([...users]);
            if (filterAge === "newest") filteredUsers_.sort((a,b)=>new Date(a.start_date).getTime()-new Date(b.start_date).getTime());
            if (filterAge === "oldest") filteredUsers_.sort((a,b)=>new Date(b.start_date).getTime()-new Date(a.start_date).getTime());

            if (filterStatus === "active"){
                filteredUsers_ = filteredUsers_.filter(booking => booking.status === "active");
                setCards(filteredUsers_);
            }else if (filterStatus === "inactive"){
                filteredUsers_ = filteredUsers_.filter(booking => booking.status === "inactive");
                setCards(filteredUsers_);
            }else{
                setCards(filteredUsers_);
            }
            
            setMaxPage(Math.ceil( filteredUsers_.length / maxUsersPerPage ));
            setFilteredUsers(filteredUsers_);
            
        }

    }, [filterStatus, filterAge, page, users]);


    const changeAgeSelectHandler = (e:any) => {
        setFilterAge(e.target.value);
    }

    const leftControllerHandler = () => {
        if ( page === 1 ) return;
        setPage( last => last - 1);
    }

    const rightControllerHandler = () => {
        if ( page >= filteredUsers.length / maxUsersPerPage || filteredUsers.length < maxUsersPerPage ) return;
        setPage( last => last + 1);
    }

    return (
        <MainContainer>
            <FilterStateNav>
                <ul>
                    {
                        filterStatus === "all" 
                        ? <li><Link to="" onClick={() => {setFilterStatus("all"); setPage(1);}} className="active">All&nbsp;Users</Link></li>
                        : <li><Link to="" onClick={() => {setFilterStatus("all"); setPage(1);}}>All&nbsp;Users</Link></li>
                    }
                    {
                        filterStatus === "active"
                        ? <li><Link to=""onClick={() => {setFilterStatus("active"); setPage(1);}}  className="active">Active</Link></li>
                        : <li><Link to=""onClick={() => {setFilterStatus("active"); setPage(1);}} >Active</Link></li>
                    }
                    {
                        (filterStatus === "inactive") 
                        ? <li><Link to=""onClick={() => {setFilterStatus("inactive"); setPage(1);}}  className="active">Inactive</Link></li>
                        : <li><Link to=""onClick={() => {setFilterStatus("inactive"); setPage(1);}} >Inactive</Link></li>
                    }
                </ul>

                {/* <ButtonGreen>1 November 2020 - 30 November 2020</ButtonGreen> */}
                <div>
                    <Link to="/users/addUser">
                        <ButtonGreen>
                            + New User
                        </ButtonGreen>
                    </Link>
                </div>
            </FilterStateNav>

            <StyledTable>
                {/* TABLE HEAD */}
                <thead>
                    <tr>
                        <td></td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Start Date</td>
                        <td>Phone</td>
                        <td>Job</td>
                        <td>Description</td>
                        <td>End Date</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                    <UsersList 
                        filteredUsers={filteredUsers} 
                        firstUserIndex={firstUserIndex}
                        lastUserIndex={lastUserIndex}
                        setFilteredUsers={setFilteredUsers}
                    />
                </tbody>
            </StyledTable>

            <Pagination>
                <div className="info">
                    {/* 1234 */}
                </div>
                <div className="controllers">
                    {
                        page === 1
                        ?
                            <ButtonGreenOutlined onClick={leftControllerHandler} className="hidden">
                                Prev
                            </ButtonGreenOutlined>
                        :
                            <ButtonGreenOutlined onClick={leftControllerHandler}>
                                Prev
                            </ButtonGreenOutlined>
                    }
                    <div className="pages">

                        <ButtonPagList 
                            setPage={setPage} maxPage={maxPage} />
                    </div>
                    {
                        page >= filteredUsers.length / maxUsersPerPage || filteredUsers.length < maxUsersPerPage
                        ?
                            <ButtonGreenOutlined onClick={rightControllerHandler} className="hidden">
                                Next
                            </ButtonGreenOutlined>
                        :
                            <ButtonGreenOutlined onClick={rightControllerHandler}>
                                Next
                            </ButtonGreenOutlined>
                    }
                </div>
            </Pagination>

            
        </MainContainer>
        
    );
}