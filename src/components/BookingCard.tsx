import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deleteBooking } from '../features/bookings/bookingsSlice';
import { ButtonInfo, ButtonSuccess, ButtonError, ButtonWarning } from '../styles/components/Button';
import { Flex } from '../styles/components/Flex';
import { Booking, Room, User } from '../interfaces/interfaces';
import { ItemTypes } from './ItemTypes';
import { toast } from 'react-toastify';
import axios from 'axios';

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
    key?: string;
    id: string;
    index: number;
    user?: User;
    room?: Room;
    order_date: string;
    check_in: string ;
    check_out: string ;
    special_request: string;
    moveCard: any;
    booking: Booking;
}

export function BookingCard ({ key, id, index, user, room, order_date, check_in, 
    check_out, special_request, moveCard, booking }: BookingCardProps) {
        
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

    const deleteHandler = async (booking: Booking) => {
        dispatch(deleteBooking(booking));
        toast.success("Booking DELETED successfully!");
        await axios.delete(`http://localhost:5000/dashboard/bookings/${ booking._id }`);    
    }

    return (
        <tr key={id} ref={ref} style={{opacity}} data-handler-id={handlerId}>
			<td>
                <StyledFlex align="center">
                    <div>
                    
                    </div>
                    {
                        user
                        ?
                        <div>
                            <div>{user.first_name} {user.last_name}</div>
                            <div><span>{id}</span></div>
                        </div>
                        : ""
                    }
                    
                </StyledFlex>
            </td>
            <td className='date'>{new Date(order_date).toLocaleDateString()}</td>
            <td className='date'>{new Date(check_in).toLocaleDateString()}</td>
            <td className='date'>{new Date(check_out).toLocaleDateString()}</td>
            <td><Link to="/addBooking"><ButtonInfo fontSize={1}>View Notes</ButtonInfo></Link></td>
            {
                room
                ? <td>{room.room_type_type} - {room.number}</td>
                : ""
            }
            <td className="status">
            { booking.status==="check in" ? <Link to={""}><ButtonSuccess>Check In</ButtonSuccess></Link> : "" }
            { booking.status==="check out" ? <Link to={""}><ButtonError>Check Out</ButtonError></Link> : "" }
            { booking.status==="in progress" ? <Link to={""}><ButtonWarning>In Progress</ButtonWarning></Link> : "" }
            </td>
            <td>
                <Link to={`/bookings/bookingDetails/${ booking._id }`}><i className="fas fa-info-circle edit"></i></Link>
                <i onClick={() => deleteHandler(booking)} className="fas fa-trash-alt delete"></i>
            </td>
		</tr>
        );
};
