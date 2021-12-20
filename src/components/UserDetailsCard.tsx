import React from "react";
import styled from "styled-components";
import { ButtonGreen, ButtonSuccess2 } from "../styles/components/Button";
import { Icon } from "../styles/components/Icon";

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

    return (
        <StyledUserDetailsCard>
            {/* LEFT SIDE */}
            <section>
                {/* TOP */}
                <HeaderInfo>
                    <UserProfilephoto></UserProfilephoto>     
                    <HeaderInfoRight>
                        <div>
                            <h3>Roberto Mansini</h3>
                            <h5>ID 1234124512551</h5>
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
                        <h3>October 30th, 2020 | 08:23 AM</h3>
                    </div>
                    <div>
                        <h5>Check Out</h5>
                        <h3>November 2th, 2020</h3>
                    </div>
                </Dates>

                <StyledHr></StyledHr>

                {/* BOTTOM */}
                <RoomInfo>
                    <div>
                        <h5>Room Info</h5>
                        <h3 className="title">Deluxe Z - 002424</h3>
                    </div>
                    <div>
                        <h5>Price</h5>
                        <h3 className="title">$145 <span>&nbsp;&nbsp;/night</span></h3>
                    </div>
                </RoomInfo>

                <p>
                    Lorem ipsum dolor sit amet consectetur, 
                    adipisicing elit. Recusandae, repudiandae 
                    fugiat illum modi harum omnis dolor totam nisi 
                    culpa quibusdam distinctio doloribus impedit rem eveniet,
                    obcaecati nostrum eligendi iste soluta!
                    Lorem ipsum dolor sit amet consectetur, 
                    adipisicing elit. Recusandae, repudiandae 
                    fugiat illum modi harum omnis dolor totam nisi 
                    culpa quibusdam distinctio doloribus impedit rem eveniet,
                    obcaecati nostrum eligendi iste soluta!
                </p>

                <Facilities>
                    <h3>Facilities</h3>
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