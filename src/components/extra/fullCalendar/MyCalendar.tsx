import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import styled from 'styled-components';

import { getActualEvents } from './utils';
import { selectBookings } from "../../../features/bookings/bookingsSlice";
// import bookings_data from "../../../data/bookings_data";
import { useSelector } from 'react-redux';
import {useEffect} from 'react';

const FullCalendarContainer = styled.div`

    .fc-daygrid {   
        height: 400px;
        margin: 10px;
         
        .fc-scrollgrid{
            border: none ;

            .fc-scrollgrid-section{
                .fc-scrollgrid-section{
                    & > td{
                        .fc-scroller-harness{
                            .fc-scroller{
                                .fc-daygrid-body{                                   
                                }
                            }
                        }
                    }
                }
            }

            td, tr, th {          
                border: none;
                
                .fc-daygrid-day-frame {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    border-radius: 6px;
                    // border: 2px solid transparent;

                    &:hover{
                        border: none;
                        background-color: ${props => props.theme.grey_light_stg};
                        // border: 2px solid orange;
                        cursor: pointer;
                    }
                }
            }

            .fc-daygrid-day.fc-day-today {
                border-radius: 6px;
                // background-color: #7a1f5c;
                cursor: pointer;
                background: none;

                &:hover{
                    background-color: ${props => props.theme.grey_light_stg};
                }
            }

            .fc-daygrid-day-frame{
                .fc-daygrid-day-events{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                    padding: 1px;

                    .fc-daygrid-day-top{
                        position: relative;
                        z-index: 20;
                    }

                    .fc-daygrid-event-harness{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top: 0;
                        left: 0;
                        visibility: visible !important;
                        border-radius: 6px;
                        // border: 1px solid #5AD07A;
                        // background-color: ${ props => props.theme.green_std };
                        // z-index: 201;

                        .fc-daygrid-event{
                            background: none;
                            // border: none;
                            border-width: 2px;
                            border-radius: 6px;
                            width: 100%;
                            height: 100%;
                            position: relative;
                            z-index: 2;
                        }
                    }

                    .fc-daygrid-day-bottom{
                        position: relative;
                        z-index: 2;
                    }

                    a, i{
                        color: transparent !important;
                    }
                }
                
            }

        }

        .fc-highlight{
            border-radius: 6px;
            color: #fff;
            border: 2px solid  ${props => props.theme.grey_light_stg};
            background-color: rgba(104, 104, 104, 0.2);
        }

        .fc-daygrid-day-events{
            
        }

        .fc-scroller{
            overflow: hidden !important; 
        }
    }
`;

export default function MyCalendar({ setActualDate, bookings, setBookings }: any) {
    
    const bookingsState = useSelector(selectBookings);
    const bookings2 = bookingsState.bookingsList;
    // console.log("bookingsState");
    // console.log(bookings2);
    const [calEvents, setCalEvents] = useState(getActualEvents(bookings2));

    useEffect( () => {
        setCalEvents(getActualEvents(bookings2));
        setBookings(bookings2);
    },[bookings2]);

    const clickEventHandler = () => {
        // console.log("====clickEventHandler====");
    
    }

    const setEventsHanlder = () => {
        // console.log("====setEventsHanlder====");
    
    }
    
    const dateSelectHandler = (e: any) => {
        // console.log("====dateSelectHandler====");
        for (let el in e) {
            // console.log(`${ el }: ${ e[el] }`);
        }
    
    }

    const addEventHandler = (e: any) => {
        // console.log("====addEventHandle====");
    
    }

    const changeEventHandler = (e: any) => {
        // console.log("====changeEventHandler====");
    
    }

    const removeEventHandler = (e: any) => {
        // console.log("====removeEventHandler====");
    
    }

    const datesSetHandler = (e: any) => {
        // console.log("====datesSetHandler====");
        let month = e.end.getMonth();
        if (month === 0) month = 12;
        setActualDate(e.end);
        setBookings(bookings2);
    }

    const renderEventContent = (eventContent: EventContentArg) => {
        return (
          <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
          </>
        )
      }
    
    return (
        <FullCalendarContainer>
            <FullCalendar 
                plugins={[ dayGridPlugin, timeGridPlugin ,interactionPlugin ]} 
                headerToolbar={{
                    left: 'prev today',
                    center: 'title',
                    right: 'next',
                    // 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView = "dayGridMonth" 
                // editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={calEvents}

                datesSet={datesSetHandler}
                select={dateSelectHandler}
                eventContent={renderEventContent}
                eventClick={clickEventHandler}
                eventsSet={setEventsHanlder}
                eventAdd={addEventHandler}
                eventChange={changeEventHandler}
                eventRemove={removeEventHandler}
            />
        </FullCalendarContainer>
    );
}

