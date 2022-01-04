import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deleteBooking } from '../features/bookings/bookingsSlice';
import { ButtonInfo, ButtonSuccess } from '../styles/components/Button';
import { Flex } from '../styles/components/Flex';
import { Booking } from '../interfaces/interfaces';
import { ItemTypes } from './ItemTypes';

const StyledFlex = styled(Flex)`
    & > div:nth-of-type(1) {
        width: 40px;
        height: 35px;
        margin-right: 8%;
        border-radius: 8px;
        background-color: ${props => props.theme.grey_lighter};
    }

    & > div:nth-of-type(2) {
        width: 76%;

        span{
            font-size: .8em;
            color: #799283;
        }
    }
`;

interface BookingCardProps {
    id: number;
    index: number;
    first_name: string ;
    last_name: string;
    order_date: string;
    check_in: string ;
    check_out: string ;
    room_type_number: string;
    room_type_type: string;
    special_request: string;
    moveCard: any;
    booking: Booking;
}

export function BookingCard ({ id, index, first_name, last_name, order_date, check_in, 
    check_out, room_type_number, room_type_type, special_request, moveCard, booking }: BookingCardProps) {

    const dispatch = useDispatch();
    const ref = useRef<any>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: BookingCardProps, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            if (clientOffset !== null) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (hoverClientY !== null) {
                // Get pixels to the top
                    
                    // Only perform the move when the mouse has crossed half of the items height
                    // When dragging downwards, only move when the cursor is below 50%
                    // When dragging upwards, only move when the cursor is above 50%
                    // Dragging downwards
                    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                        return;
                    }
                    // Dragging upwards
                    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                        return;
                    }
                }
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    function deleteHandler() {
        dispatch(deleteBooking(booking));
    }

    return (
        <tr ref={ref} style={{opacity}} data-handler-id={handlerId}>
			<td>
                <StyledFlex align="center">
                    <div>
                    
                    </div>
                    <div>
                        <div>{first_name} {last_name}</div>
                        <div><span>{id}</span></div>
                    </div>
                </StyledFlex>
            </td>
            <td>{order_date}</td>
            <td>{check_in}</td>
            <td>{check_out}</td>
            <td><Link to="/addBooking"><ButtonInfo fontSize={1}>View Notes</ButtonInfo></Link></td>
            <td>{room_type_type} - {room_type_number}</td>
            <td><Link to={"/editBooking/"+id}><ButtonSuccess>Booked</ButtonSuccess></Link></td>
            <td><i onClick={deleteHandler} className="fas fa-ellipsis-v"></i></td>
		</tr>
        );
};
