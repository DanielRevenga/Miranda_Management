import React from "react";
import styled from "styled-components";
import { ButtonError, ButtonInfo, ButtonSuccess} from "../../styles/components/Button";
import { MainContainer } from "../../styles/components/MainContainer";

const StyledDashboard = styled(MainContainer)`
    display: grid;
    height: 1500px;
    grid-template: 0.7fr 2.6fr 0.8fr 1.4fr 1.6fr / repeat(4, 1fr);
    gap: 2%;
`;

const Card = styled.div`
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

    .w100{
        width: 100%;
    }
`;

const Review = styled.div`
    border-radius: 10px;
    border: 1px solid ${props => props.theme.grey_std};
    width: 31%;
    padding: 15px;
    line-height: 1.4;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .review_footer{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .titles{
            width: 60%;
            font-size: .9em;
            margin-left: 15px;

            .subtitle{
                color: #799283;
                font-size: .8em;
            }

            .title{
                width: 100%;
            }
        }

        i{
            color: ${props => props.theme.main_color_1};
            padding: 2px;
            border-radius: 50%;

            &:first-child{
                margin-right: 10px;
                border: 1px solid ${props => props.theme.green_std};
                background-color: ${props => props.theme.green_std};
            }
            &:last-child{
                border: 1px solid ${props => props.theme.red_std};
                background-color: ${props => props.theme.red_std};
            }
        }
    }
`;

const User = styled.div`
    background-color: ${props => props.theme.grey_lighter};
    width: 40px;
    height: 40px;
    border-radius: 4px;
`;

function Dashboard() {
   

    return (
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

            {/* GRAPHS */}
            <Card column="1" columnSpan="2" >
                gfgfg
            </Card>
            <Card column="3" columnSpan="2">
                zzz     
            </Card>
            <Card row="3" rowSpan="2" column="1" columnSpan="4">
                zzz     
            </Card>
            <Card column="1" columnSpan="4" display="flex" justify="space-between">
                <div className="w100">Latest Reviews by Customers</div>
                <Review>
                    Lorem ipsum dolor sit, amet consectetur adipisicing 
                    elit. Delectus asperiores quaerat, eveniet libero 
                    maxime ipsa.

                    <div className="review_footer">
                        <User></User>

                        <div className="titles">
                            <div className="title">Kusnaidi Anderson</div>
                            <div className="subtitle">4m ago</div>
                        </div>

                        <div className="like">
                            <i className="fas fa-check-square"></i>
                            <i className="fas fa-window-close"></i>
                        </div>
                    </div>
                </Review>
                <Review>
                    Lorem ipsum dolor sit, amet consectetur adipisicing 
                    elit. Delectus asperiores quaerat, eveniet libero 
                    maxime ipsa.
                    
                    <div className="review_footer">
                        <User></User>
                        <div className="titles">
                            <div className="title">Bella Spahira</div>
                            <div className="subtitle">4m ago</div>
                        </div>
                        <div className="like">
                            <i className="fas fa-check-square"></i>
                            <i className="fas fa-window-close"></i>
                        </div>
                    </div>
                </Review>
                <Review>
                    Lorem ipsum dolor sit, amet consectetur adipisicing 
                    elit. Delectus asperiores quaerat, eveniet libero 
                    maxime ipsa.

                    <div className="review_footer">
                        <User></User>

                        <div className="titles">
                            <div className="title">Thomas Al-Ghazali</div>
                            <div className="subtitle">4m ago</div>
                        </div>

                        <div className="like">
                            <i className="fas fa-check-square"></i>
                            <i className="fas fa-window-close"></i>
                        </div>
                    </div>
                </Review>
            </Card>
        </StyledDashboard>  
    );
}

export default Dashboard;