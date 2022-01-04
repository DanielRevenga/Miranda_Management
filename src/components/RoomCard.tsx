import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteBooking } from '../features/bookings/bookingsSlice';
import { ButtonSuccess } from '../styles/components/Button';
import { Flex } from '../styles/components/Flex';
import { ItemTypes } from './ItemTypes';

const StyledFlex = styled(Flex)`

    & > div:nth-of-type(1) {
        width: 70%;
        height: 60px;
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

export function RoomCard ({ id, index, number, room_type, amenities, price, offer_price, 
    status, img, moveCard, room }: any) {

    const dispatch = useDispatch();
    const ref = useRef<any>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
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
            // Get pixels to the top
            if (clientOffset !== null) {
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
        dispatch(deleteBooking(room));
    }

    return (
        <tr ref={ref} style={{opacity}} data-handler-id={handlerId}>
			<td>
                <StyledFlex align="center">
                    <div>
                    
                    </div>
                    <div>
                        <div><span>{id}</span></div>
                        <div>{number}</div>                      
                    </div>
                </StyledFlex>
            </td>
            <td>{room_type}</td>
            <td>{amenities}</td>
            <td>{price}</td>
            <td>{offer_price}</td>
            <td><ButtonSuccess>{status}</ButtonSuccess></td>
            <td><i onClick={deleteHandler} className="fas fa-ellipsis-v"></i></td>
		</tr>
        );
};
