import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectBookings } from "../features/bookings/bookingsSlice";
import { ButtonGreen, ButtonSuccess2 } from "../styles/components/Button";
import { Icon } from "../styles/components/Icon";
import { useParams } from 'react-router-dom';
import { selectUsers } from "../features/users/usersSlice";
import { selectRooms } from "../features/rooms/roomsSlice";

const StyledUserDetailsCard = styled.div`
    background-color: ${props => props.theme.main_color_1};
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 8px;
    display: flex;
    
    & > section{
        width: 50%;
    }

    p{
        color: #E8F2EF;
        text-align: justify;
        line-height: 1.4;
    }
`;

interface UserPorfilePhotoProps  {
    bg_img?: any;
}

const UserProfilephoto = styled.div<UserPorfilePhotoProps>`
    background-color: ${props => props.theme.grey_lighter};
    background-image: url(${props => props.bg_img});
    background-size: cover;
    height: 120px;
    width: 120px;
    border-radius: 12px;
    border: 3px solid #fff;
`;

const UserProfilePhoto = styled.div`
    height: 120px;
    width: 120px;
    border-radius: 12px;
    border: 3px solid #fff;

    img{
        width: 110px;
        height: 110px;
        object-fit: cover;
    }
`;

const HeaderInfo = styled.div`
    display:flex;
    padding-top: 40px;
`;

const HeaderInfoRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;

    h3{
        color: #fff;
        font-size: 1.2em;
        margin-bottom: 20px;
    }

    h5{
        font-size: 0.7em;     
    }
`;

const Contact = styled.div`
    display: flex;

    button{
        margin-left: 15px;
    }
`;

const Dates = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;

    div{
        width: 50%;

        h5{
            margin-bottom: 10px;
        }

        h3{
            color: #fff;
            font-size: .9em;
            letter-spacing: 1px;
        }
    }
`;

const StyledHr = styled.div`
    background-color: ${props => props.theme.grey_std};
    height: 1.5px;
    width: 100%;
    margin: 20px 0;
`;

const RoomInfo = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 30px;

    div{
        width: 50%;
    
        h5{
            margin-bottom: 10px;
        }

        .title{
            color: #fff;
            font-size: 1.2em;
            letter-spacing: 1px;

            span{
                font-size: 0.7em;   
                color: ${props => props.theme.grey_light_stg};
            }
        }
    } 
`;

const Facilities = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 40px;

    h3{
        width: 100%;
        margin-bottom: 5px;
    }

    button{
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: .9em;

        i{
            font-size: 1.1em;
            margin-right: 7.5px;
        }
    }
`;

const SlideSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    // background-image: url("/img/placeholder.svg");
    background-image: linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.3)) , url("/img/placeholder.svg");
    // background-size: cover;
    padding: 40px;

    h2{
        color: #fff;
    }

    p{
        color: #FFFFFF70;
    }
`;

const SlideArrows = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    div{
        color: #fff;
        background-color: #FFFFFF1A;
        padding: 12px;
        border-radius: 8px;

        &:hover{
            background-color: ${props => props.theme.main_color_1};
            cursor: pointer;
        }
    }
`;

export default function UserDetailsCard() {

    const params = useParams();

    const bookings = useSelector(selectBookings);
    const users = useSelector(selectUsers);
    const rooms = useSelector(selectRooms);
    const booking:any = bookings.bookingsList.find( booking => booking._id === params.id);
    const user:any = users.usersList.find( user => user._id === booking.user_id); 
    const room:any = rooms.roomsList.find( room => room._id === booking.room_id); 


    return (
        <StyledUserDetailsCard>
            {/* LEFT SIDE */}
            <section>
                {/* TOP */}
                <HeaderInfo>
                    <UserProfilePhoto>
                        <img src={user.image} alt="" />
                    </UserProfilePhoto>     
                    <HeaderInfoRight>
                        <div>
                            <h3>{ user.first_name } { user.last_name }</h3>
                            <h5>ID {user._id}</h5>
                        </div>
                        <Contact>
                            <Icon><div><i className="fas fa-phone-alt"></i></div></Icon>
                            <ButtonGreen><i className="fas fa-comment-dots"></i> Send Message</ButtonGreen>
                        </Contact>
                    </HeaderInfoRight>
                </HeaderInfo>

                <Dates>
                    <div>
                        <h5>Check In</h5>
                        <h3>{ new Date(booking.check_in).toLocaleDateString }</h3>
                    </div>
                    <div>
                        <h5>Check Out</h5>
                        <h3>{ new Date(booking.check_out).toLocaleDateString }</h3>
                    </div>
                </Dates>

                <StyledHr></StyledHr>

                {/* BOTTOM */}
                <RoomInfo>
                    <div>
                        <h5>Room Info</h5>
                        <h3 className="title">{room.room_type_type} - {room.room_type_number}</h3>
                    </div>
                    <div>
                        <h5>Price</h5>
                        <h3 className="title">$ {room.price} <span>&nbsp;&nbsp;/night</span></h3>
                    </div>
                </RoomInfo>

                <p>
                    {booking.special_request}
                </p>

                <Facilities>
                    <h3>Amenities</h3>
                    <ButtonSuccess2><i className="fas fa-bed"></i> 3 bed Space</ButtonSuccess2>
                    <ButtonSuccess2><i className="fas fa-shield-alt"></i> 24 Hours Guard</ButtonSuccess2>
                    <ButtonSuccess2><i className="fas fa-wifi"></i> free Wifi</ButtonSuccess2>
                    <ButtonSuccess2><i className="fas fa-shower"></i> 2 Bathroom</ButtonSuccess2>
                    <ButtonSuccess2><i className="fas fa-fan"></i> Air Conditioner</ButtonSuccess2>
                    <ButtonSuccess2><i className="fas fa-tv"></i> Television</ButtonSuccess2>
                </Facilities>
            </section>

            {/* RIGHT SIDE */}
            <SlideSection>
                <SlideArrows>
                    <div><i className="fas fa-arrow-left"></i></div>
                    <div><i className="fas fa-arrow-right"></i></div>
                </SlideArrows>

                <div>
                    <h2>Bed Room</h2>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Quaerat accusantium repudiandae ipsam perferendis totam
                        quis.</p>
                </div>
            </SlideSection>
        </StyledUserDetailsCard>
    );
}