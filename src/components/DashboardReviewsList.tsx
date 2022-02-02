import { useState } from 'react';
import styled from 'styled-components';

import { Contact } from '../interfaces/interfaces';


const MyDashboardReviews = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    .controller{
        font-size: 3rem;

        &:hover{
            color: ${ props => props.theme.green_std };
            cursor: pointer;
        }

        &.rightController{
            margin-left: 10px;
        }

        &.leftController{
            margin-right: 10px;
        }

        &.hidden{
            visibility: hidden;
        }
    }
`;

const ReviewsContainer = styled.div`
    display: flex;
    justify-content: space-between;
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
            // color: ${props => props.theme.main_color_1};
            font-size: 1.2em;
            // padding: 2px;
            // border-radius: 50%;
            // background-color: ${props => props.theme.green_std};

            &:first-child{
                margin-right: 10px;
                // border: 1px solid ${props => props.theme.green_std};
                // background-color: ${props => props.theme.green_std};
                color: ${props => props.theme.green_std};
            }
            &:last-child{
                // border: 1px solid ${props => props.theme.red_std};
                // background-color: ${props => props.theme.red_std};
                color: ${props => props.theme.red_std};
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


interface DashboardReviewsProps {
    contacts: Contact[];
}

export default function DashboardReviewsList( {contacts} : DashboardReviewsProps) {

    
    const [reviewsPage, setReviewsPage] = useState(1);

    let firstReviewIndex = 3 * (reviewsPage-1);
    let lastReviewIndex = firstReviewIndex + 3;

    const leftControllerHandler = () => {
        if ( reviewsPage === 1 ) return;
        setReviewsPage( (last) => last - 1 );
    }

    const rightControllerHandler = () => {
        if ( reviewsPage >= contacts.length / 3 ) return;
        setReviewsPage( (last) => last + 1 );
    }

    return (
        <MyDashboardReviews>
            {
                reviewsPage === 1
                    ? 
                        <div className='leftController controller hidden'>
                            <i className="fas fa-chevron-left"></i>
                        </div>
                    :
                        <div onClick={leftControllerHandler} className='leftController controller'>
                            <i className="fas fa-chevron-left"></i>
                        </div>
            }
            
            <ReviewsContainer>
            {
                contacts.slice( firstReviewIndex, lastReviewIndex ).map( (contact, index) => {
                    return (
                        <Review key={index}>
                            {contact.comment}

                            <div className="review_footer">
                                <User></User>
                                
                                <div className="titles">
                                    <div className="title">{contact.first_name} {contact.last_name}</div>
                                    <div className="subtitle">4m ago</div>
                                </div>

                                <div className="like">
                                    <i className="fas fa-check-square"></i>
                                    <i className="fas fa-window-close"></i>
                                </div>
                            </div>
                        </Review>
                    );
                })
            }
            </ReviewsContainer>

            {
                reviewsPage >= contacts.length / 3
                    ? 
                        <div onClick={rightControllerHandler} className='rightController controller hidden'>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    :
                        <div onClick={rightControllerHandler} className='rightController controller'>
                            <i className="fas fa-chevron-right"></i>
                        </div>
            }            
        </MyDashboardReviews>
    );
}
