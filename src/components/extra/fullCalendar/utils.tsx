import { EventInput } from '@fullcalendar/react'
import { Booking } from '../../../interfaces/interfaces';

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: new Date("2022-01-10").toISOString().replace(/T.*$/, '') ,
        color: "#135846",
        borderColor: "#5AD07A"
    },
    {
        id: createEventId(),
        title: 'All-day event 2',
        start: todayStr,
        color: "#361C1A",
        borderColor: "#E23428"
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
        color: "red"
    }
];

export const getActualEvents = (bookings: Booking[]):EventInput[] => {

    const actual_events: EventInput[] = [];

    for (let booking of bookings){

        if ( booking.check_in ) {
            actual_events.push({
                id: createEventId(),
                title: 'All-day event',
                start: new Date(booking.check_in),
                color: "#135846",
                allDay: true,
                borderColor: "#5AD07A"
            });
        }

        if ( booking.check_out ) {
            actual_events.push({
                id: createEventId(),
                title: 'All-day event 2',
                start: new Date(booking.check_out),
                color: "#361C1A",
                allDay: true,
                borderColor: "#E23428"
            });
        }
    }

    return actual_events;
}

export function createEventId() {
    return String(eventGuid++)
};