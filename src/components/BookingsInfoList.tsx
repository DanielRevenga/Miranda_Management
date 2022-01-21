import styled from 'styled-components';

import { Booking } from '../interfaces/interfaces';

const MyBookingsInfoList = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    overflow: auto;
    padding: 10px;
`;

const BookingsInfo = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    width: 45%;
    margin-bottom: 15px;

    .image_room{
        border-radius: 6px;
        background-color: #C5C5C5;
        height: 100%;
        width: 30%;
        margin-right: 10px;
    }

    .body{
        width: 50%;

        .title{
            color: #E8F2EF;
            font-size: 1.2rem;
            text-transform: capitalize;
            margin-bottom: 10px;
        }

        .user{
            font-size: .9rem;
            display: flex;
            align-items: center;

            .image_user{
                border-radius: 50%;
                background-color: #C5C5C5;
                height: 35px;
                width: 35px;
                margin-right: 20px;
            }
        }
    }

    .dates{
        width: 10%;
        color: #E8F2EF;
        text-align: center;
        padding: 10px 20px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        
        &.check_in{
            background-color: ${ props => props.theme.green_std };
            border: 1px solid #5AD07A;
            margin-right: 10px;
        }
        &.check_out{
            border: 1px solid ${ props => props.theme.red_std };
            background-color: 	#361c1a;
        }
    }
`;

interface BookingsInfoListProps {
    bookings: Booking[];
    actualDate: Date;
}

export default function BookingsInfoList( { bookings, actualDate } : BookingsInfoListProps) {

    let check_in = false;
    let check_out = false;
    
    return (
        <MyBookingsInfoList>
            {
                bookings.map( (booking) => {

                    check_in = ( (new Date(booking.check_in).getMonth() + 1) === actualDate.getMonth() ) 
                        && ( new Date(booking.check_in).getFullYear() === actualDate.getFullYear() );
                    check_out = ( (new Date(booking.check_out).getMonth() + 1) === actualDate.getMonth() )
                        && ( new Date(booking.check_out).getFullYear() === actualDate.getFullYear() );

                    if ( check_in || check_out){
                        return (
                            <BookingsInfo>
                                <div className="image_room"></div>
                                <div className='body'>
                                    <div className="title">{booking.room_type_type} - {booking.room_type_number}</div>
                                    <div className='user'>
                                        <div className="image_user"></div>
                                        <div className="name">{booking.first_name} {booking.last_name}</div>
                                    </div>
                                </div>     
                                {
                                    check_in
                                        ?
                                            <div className="dates check_in">
                                                { booking.check_in.split("/")[1] }
                                            </div>  
                                        : ""
                                }

                                {
                                    check_out
                                        ?
                                            <div className="dates check_out">
                                                { booking.check_out.split("/")[1] }
                                            </div>  
                                        : ""
                                }                                                    
                            </BookingsInfo>
                        )
                    }
                })
            }
        </MyBookingsInfoList> 
    );
}
